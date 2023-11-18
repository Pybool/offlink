import connectors from "./web3connector.js";
import socketMessangers  from "./wssender.js";
import sendMail from "../helpers/mail_service.js";
import Transaction from "../Models/Transactions.model.js";
import User from '../Models/User.model.js';
import ejs from "ejs";

const handlers = {
  SellerOrderPlaced: async (signature, orderId, sellerAddress) => {
    try {
      console.log(
        "New Order Placed Webhook fired for signature ==> ",
        signature,
        orderId
      );
      if (signature.length > 0) {
        const query = { signature: signature };
        const transaction = await Transaction.findOne(query);
        console.log("Seller mail ", transaction.seller.email, transaction.seller)
        if (transaction) {
          transaction.orderId = orderId;
          transaction.sellerAddress = sellerAddress;
          await transaction.save();
          const txMessageHash = await transaction.message_hash;
          const signerAddress = connectors.web3.eth.accounts.recover(
            txMessageHash,
            signature
          );
          if (signerAddress == process.env.SIGNER_ADDRESS) {
            
            socketMessangers.sendWebscoketMessage(
              transaction.fiat_currency,
              "SellerOrderPlaced",
              transaction
            );
          }
        } else {
          console.log("Transaction was not found");
        }

        return {};
      }
    } catch (error) {
      console.log("Seller order placed error ", error);
    }
  },

  OrderAccepted: async (orderId, buyerAddress) => {
    try {
      console.log(
        "Order Accepted Webhook fired for orderId ==> ",
        orderId,
        buyerAddress
      );
      const query = { orderId };
      const transaction = await Transaction.findOne(query)
        .populate("seller", "-password -_id -reset_password_token")
        .populate("buyer", "-password -_id -reset_password_token");
      transaction.buyer = await User.findOne({ wallet_address: buyerAddress });
      transaction.status = "ACCEPTED";
      transaction.buyerAddress = buyerAddress;
      const saved = await transaction.save();
      socketMessangers.sendPersonalWebscoketMessage(
        "OrderAccepted",
        transaction.seller._id,
        transaction
      );

      const template = await ejs.renderFile(
        "emailtemplates/sellerOrderAccepted.html",
        { usermail: transaction.seller.email, orderRef: orderId, buyerAddress: transaction.buyer.email }
      );

      const mailOptions = {
        from: "info.bih@gmail.com",
        to: [transaction.buyer?.email, transaction.seller.email],
        subject: "Order Accepted",
        text: `Order has been accepted`,
        html: template,
      };
      try {
        await sendMail(mailOptions);
      } catch (err) {}
    } catch (err) {console.log(err)}
  },

  OrderCompleted: async (orderId) => {
    try {
      const query = { orderId };
      const transaction = await Transaction.findOne(query)
        .populate("seller", "-password -_id -reset_password_token")
        .populate("buyer", "-password -_id -reset_password_token");
      transaction.status = "COMPLETED";
      await transaction.save();
      let sellertemplate = await ejs.renderFile(
        "emailtemplates/orderCompleted.html",
        { usermail: transaction.seller?.email, orderRef: orderId, buyerAddress: transaction.buyer.email }
      );

      const mailOptions = {
          from: "info.bih@gmail.com",
          to: transaction.seller.email,
          subject: "Completed",
          text: `Transaction Completed`,
          html: sellertemplate,
        };
        try {
          await sendMail(mailOptions);
        } catch (err) {}
    } catch (err) {console.log(err)}
  },

  FundsReleased: async (orderId, amountInToken) => {
    try {
      const query = { orderId };
      const transaction = await Transaction.findOne(query)
        .populate("seller", "-password -_id -reset_password_token")
        .populate("buyer", "-password -_id -reset_password_token");
      transaction.status = "RELEASED";
      transaction.funds_released = true;
      transaction.amount_released = amountInToken;
      await transaction.save();
      
      let buyertemplate = await ejs.renderFile(
        "emailtemplates/fundsReleased.html",
        { usermail: transaction.buyer?.email, orderRef: orderId, amountReleased: amountInToken, sellerAddress: transaction.seller.email}
      );

      const mailOptions = {
          from: "info.bih@gmail.com",
          to: transaction.buyer?.email,
          subject: "Funds Released",
          text: `Transaction Funds Released`,
          html: buyertemplate,
        };
        try {
          await sendMail(mailOptions);
        } catch (err) {}
    } catch (err) {console.log(err)}
  },

  OrderCancelled: async (orderId) => {
    try {
      const query = { orderId };
      const transaction = await Transaction.findOne(query)
        .populate("seller", "-password -_id -reset_password_token")
        .populate("buyer", "-password -_id -reset_password_token");
      transaction.status = "CANCELLED";
      await transaction.save();
      sendWebscoketMessage(
        transaction.fiat_currency,
        "OrderCancelled",
        transaction
      );
      let sellertemplate = await ejs.renderFile(
        "emailtemplates/fundsReleased.html",
        { usermail: transaction.seller?.email , orderRef: orderId}
      );

      mailOptions = {
        from: "info.bih@gmail.com",
        to: transaction.seller?.email,
        subject: "Funds Released",
        text: `Transaction Funds Released`,
        html: sellertemplate,
      };
      try {
        await sendMail(mailOptions);
      } catch (err) {}
    } catch (err) {}
  },
};

export default handlers;
