// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract OffLink is AccessControl {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");
    bytes32 public constant BUYER_ROLE = keccak256("BUYER_ROLE");

    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    address _feeCollectorAddress;
    uint256 _feeDecimal = 10000;
    uint256 _fee;
    // PENDING, OPENED, ACCEPTED, COMPLETED, RELEASE, CANCELLED, REFUNDED

    enum _TransactionState {
        PENDING,
        OPEN,
        ACCEPTED,
        COMPLETED,
        RELEASE,
        CANCELLED,
        REFUNDED
    }

    struct TokenConfig {
        bool status;
        uint256 fee;
        uint256 minOrder;
        uint256 maxOrder;
    }

    struct CurrencyConfig {
        bool status;
        uint256 fee;
        uint256 minOrder;
        uint256 maxOrder;
    }

    mapping(address => TokenConfig) private _allowedTokens;
    mapping(bytes32 => CurrencyConfig) private _allowedCurrencies;

    struct Order {
        _TransactionState txStatus;
        uint256 nonce;
        address seller;
        address buyer;
        address token;
        bytes32 currency;
        uint256 amountInToken;
        uint256 amountInCurrency;
    }

    mapping(uint256 => Order) public _orders;
    mapping(bytes => bool) public _ordersSignatures;
    uint256 public _ordersCount;

    event SellOrderPlaced(
        uint256 nonce,
        uint256 indexed orderId,
        address seller,
        address token,
        bytes32 currency,
        uint256 amountInToken,
        uint256 amountInCurrency,
        bytes signature
    );

    event OrderAccepted(uint256 indexed orderId, address buyer);

    event FundsReleased(
        uint256 indexed orderId,
        address receiver,
        uint256 amount
    );

    event OrderCancelled(
        uint256 indexed orderId,
        address seller,
        uint256 amount
    );

    constructor(address feeCollectorAddress, uint256 fee) {
        _setRoleAdmin(BUYER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _feeCollectorAddress = feeCollectorAddress;
        changeFee(fee);
    }

    modifier onlyManager() {
        require(
            hasRole(MANAGER_ROLE, msg.sender),
            "Only manager can call this function"
        );
        _;
    }

    modifier onlyBuyer() {
        require(
            hasRole(BUYER_ROLE, msg.sender),
            "Only buyer can call this function"
        );
        _;
    }

    modifier onlyAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only admin can call this function"
        );
        _;
    }

    modifier onlySeller(uint256 orderID) {
        require(
            _orders[orderID].seller == msg.sender,
            "Only order seller can call this function"
        );
        _;
    }

    function placeSellOrder(
        uint256 nonce,
        uint256 amountInToken,
        uint256 amountInCurrency,
        bytes32 currency,
        address token,
        bytes memory signature
    ) external {
        require(!_ordersSignatures[signature], "Duplicate order");
        require(_allowedTokens[token].status, "Invalid token");
        require(
            amountInToken > _allowedTokens[token].minOrder &&
                amountInToken < _allowedTokens[token].maxOrder,
            "Invalid token amount"
        );

        require(_allowedCurrencies[currency].status, "Invalid currency");
        require(
            amountInCurrency > _allowedCurrencies[currency].minOrder &&
                amountInCurrency < _allowedCurrencies[currency].maxOrder,
            "Invalid currency amount"
        );

        require(
            verifySignerSignature(
                nonce,
                amountInToken,
                amountInCurrency,
                currency,
                token,
                signature
            ),
            "Invalid signature"
        );
        require(
            IERC20(token).transferFrom(
                msg.sender,
                address(this),
                amountInToken
            ),
            "Token transfer failed"
        );

        _ordersSignatures[signature] = true;

        Order storage order = _orders[_ordersCount];
        order.seller = msg.sender;
        order.token = token;
        order.currency = currency;
        order.amountInToken = amountInToken;
        order.amountInCurrency = amountInCurrency;
        order.txStatus = _TransactionState.OPEN;

        emit SellOrderPlaced(
            nonce,
            _ordersCount,
            msg.sender,
            token,
            currency,
            amountInToken,
            amountInCurrency,
            signature
        );

        _ordersCount++;
    }

    function acceptOrder(uint256 orderId) external onlyRole(BUYER_ROLE) {
        Order storage order = _orders[orderId];
        require(
            order.txStatus == _TransactionState.OPEN,
            "order is not open"
        );
        order.buyer = msg.sender;
        order.txStatus = _TransactionState.ACCEPTED;

        emit OrderAccepted(orderId, msg.sender);
    }

    function _calculateFee(uint256 amount) internal view returns (uint256) {
        return (amount * _fee) / _feeDecimal;
    }

    function releaseFunds(uint256 orderId) external onlySeller(orderId) {
        Order storage order = _orders[orderId];
        require(
            order.txStatus == _TransactionState.ACCEPTED,
            "Order is not accepted"
        );
                uint256 adminFee = _calculateFee(order.amountInCurrency);

        require(
            IERC20(order.token).transfer(order.buyer, order.amountInToken - adminFee),
            "Token transfer to buyer failed"
        );

        require(
            IERC20(order.token).transfer(
                _feeCollectorAddress,
                order.amountInCurrency - adminFee
            ),
            "Fee transfer failed"
        );
        order.txStatus = _TransactionState.RELEASE;

        emit FundsReleased(orderId, order.seller, order.amountInToken);
    }

    function completeOrder(uint256 orderId) external onlyBuyer() returns (uint256) {
        Order storage order = _orders[orderId];
         require(
            order.txStatus == _TransactionState.ACCEPTED,
            "Order is not accepted"
        );
        order.txStatus = _TransactionState.COMPLETED;
        return uint256(order.txStatus);
    }

    function adminReleaseFunds(uint256 orderId) external onlyManager {
        Order storage order = _orders[orderId];
        require(
            order.txStatus == _TransactionState.ACCEPTED,
            "Order must be accepted"
        );
          uint256 adminFee = (order.amountInToken *
            _allowedTokens[order.token].fee) / _feeDecimal;
        require(
            IERC20(order.token).transfer(order.buyer, order.amountInToken -adminFee),
            "Token refund to buyer failed"
        );

      
        require(
            IERC20(order.token).transfer(_feeCollectorAddress, adminFee),
            "Fee transfer failed"
        );

        emit FundsReleased(orderId, order.buyer, order.amountInToken);

        order.txStatus = _TransactionState.COMPLETED;
    }

    function adminRefundFunds(uint256 orderId) external onlyManager {
        Order storage order = _orders[orderId];
        require(
            order.txStatus == _TransactionState.ACCEPTED,
            "order is not accepted"
        );
        emit FundsReleased(orderId, order.seller, order.amountInToken); // Refund without transferring tokens
        order.txStatus = _TransactionState.REFUNDED;
    }

    function transactionState(uint256 orderId) external view returns(uint256){
        Order storage order = _orders[orderId];
        return uint256(order.txStatus);
    }

    function cancelOrder(uint256 orderId) external onlySeller(orderId) {
        Order storage order = _orders[orderId];
        require(
            order.txStatus == _TransactionState.ACCEPTED,
            "order is not accepted"
        );
        require(
            IERC20(order.token).transfer(order.seller, order.amountInToken),
            "Token refund to buyer failed"
        );
        order.txStatus = _TransactionState.CANCELLED;

        delete _orders[orderId];

        emit OrderCancelled(orderId, order.seller, order.amountInToken); // Refund without transferring tokens
    }

    function cancelOrderAdmin(uint256 orderId) external onlyManager {
        Order storage order = _orders[orderId];
        require(
            order.txStatus == _TransactionState.ACCEPTED,
            "order is not accepted"
        );
        require(
            IERC20(order.token).transfer(order.seller, order.amountInToken),
            "Token refund to buyer failed"
        );
        order.txStatus = _TransactionState.CANCELLED;
        delete _orders[orderId];
        emit OrderCancelled(orderId, order.seller, order.amountInToken); // Refund without transferring tokens
    }

    function verifySignerSignature(
        uint256 nonce,
        uint256 amountInToken,
        uint256 amountInCurrency,
        bytes32 currency,
        address token,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 messageHash = keccak256(
            abi.encodePacked(
                nonce,
                amountInToken,
                amountInCurrency,
                currency,
                token,
                address(this),
                block.chainid
            )
        );

        address signer = messageHash.toEthSignedMessageHash().recover(
            signature
        );

        return hasRole(MANAGER_ROLE, signer);
    }

    function generateHash(
        uint256 nonce,
        uint256 amountInToken,
        uint256 amountInCurrency,
        bytes32 currency,
        address token
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    nonce,
                    amountInToken,
                    amountInCurrency,
                    currency,
                    token,
                    address(this),
                    block.chainid
                )
            );
    }

    function addToken(
        address token,
        uint256 fee,
        uint256 minOrder,
        uint256 maxOrder
    ) external onlyManager {
        require(!_allowedTokens[token].status, "Token already exists");
        _allowedTokens[token] = TokenConfig(true, fee, minOrder, maxOrder);
    }

    function editToken(
        address token,
        uint256 fee,
        uint256 minOrder,
        uint256 maxOrder
    ) external onlyAdmin {
        require(_allowedTokens[token].status, "Token does not exist");
        _allowedTokens[token] = TokenConfig(true, fee, minOrder, maxOrder);
    }

    function removeToken(address token) external onlyAdmin {
        require(_allowedTokens[token].status, "Token does not exist");
        delete _allowedTokens[token];
    }

    function addCurrency(
        bytes32 currency,
        uint256 fee,
        uint256 minOrder,
        uint256 maxOrder
    ) external onlyAdmin {
        require(
            !_allowedCurrencies[currency].status,
            "Currency already exists"
        );
        _allowedCurrencies[currency] = CurrencyConfig(
            true,
            fee,
            minOrder,
            maxOrder
        );
    }

    function editCurrency(
        bytes32 currency,
        uint256 fee,
        uint256 minOrder,
        uint256 maxOrder
    ) external onlyAdmin {
        require(_allowedCurrencies[currency].status, "Currency does not exist");
        _allowedCurrencies[currency] = CurrencyConfig(
            true,
            fee,
            minOrder,
            maxOrder
        );
    }

    function removeCurrency(bytes32 currency) external onlyAdmin {
        require(_allowedCurrencies[currency].status, "Currency does not exist");
        delete _allowedCurrencies[currency];
    }

    function changeFee(uint256 fee) public onlyAdmin {
        _fee = fee;
    }
}