import createError from 'http-errors';
import connectors from '../helpers/web3connector.js'
import User from '../Models/User.model.js';
import fns from '../helpers/web3helper.js'
import Transaction from '../Models/Transactions.model.js';
import validations from '../helpers/validation_schema.js';
const transactionListingsUrl = '/api/v1/transaction-listing'

const stringToBytes32 = (text) => {
  let result = '0x';
  for (let i = 0; i < 32; i++) {
    if (i < text.length) {
      result += text.charCodeAt(i).toString(16).padStart(2, '0');
    } else {
      result += '00';
    }
  }
  return result;
}

const transactionRoutes = {
  newTransaction: async (req, res) => {
    try {
        const result = await validations.newTransaction.validateAsync(req.body);
        const transaction = new Transaction(result)
        transaction.seller = await User.findOne({_id: req.userId})

        const orderedTransaction = {
          nonce:transaction.nonce,
          amountInToken: transaction.token_amount,
          amountInCurrency:parseInt(transaction.fiat_amount),
          currency: stringToBytes32(transaction.fiat_currency.toLowerCase()) || String(connectors.web3.utils.sha3(transaction.fiat_currency.toLowerCase())),
          token:transaction.cryptocurrency,
          contractAddress: process.env.SMART_CONTRACT_ADDRESS,
          chainId: process.env.CELO_CHAINID
        }
        const savedTransaction = await transaction.save()
        const { signedTransactionObject, messageHash } = await fns.signTransaction(orderedTransaction)
        transaction.signature = signedTransactionObject.signature
        transaction.message_hash = messageHash
        await transaction.save()
        
        if(savedTransaction._id){
          let contractArgs =  [ signedTransactionObject.nonce, signedTransactionObject.amountInToken, parseInt(signedTransactionObject.amountInCurrency),
                                signedTransactionObject.currency,signedTransactionObject.token,signedTransactionObject.signature.toString('hex')
                              ]; 
          return res.status(200).json({ status: true, transactionId:savedTransaction._id, signedTransaction:contractArgs });
        }
        else{
          throw createError.InternalServerError('Failed to create a new transaction')
        }
        
    } catch (error) {
      return res.status(400).json({ status: false, error: error })
    }
  },

  pickTransaction: async (req, res) => {
    try {
        const result = await validations.pickTransaction.validateAsync(req.body);
        const transaction = await Transaction.findOne(result)
                                .populate('seller', '-password -_id -reset_password_token')
                                .populate('buyer', '-password -_id -reset_password_token')
        transaction.buyer = await User.findOne({_id: req.userId})
        if (transaction.buyer.email == transaction.seller.email){
            throw createError.Unauthorized('You are not allowed to pick a transaction you created')
        }
        transaction.status = 'ACCEPTED'
        const savedTransaction = await transaction.save()
        if(savedTransaction._id)
            return res.status(200).json({ status: true, orderId:savedTransaction.orderId, transactionId:savedTransaction._id});
        else
        throw createError.InternalServerError('Failed to create a new transaction')
    } catch (error) {
      return res.status(500).json({ status: false, error: error }) 
    }

  },

  patchTransaction: async (req, res) => {
    try {
        const transaction = await Transaction.findOne({_id:req.body._id})
        if(transaction){
          transaction.orderId = req.body.orderId
          transaction.sellerAddress = req.body.sellerAddress
          const savedTransaction = await transaction.save()
          if(savedTransaction._id)
              return res.status(200).json({ status: true, orderId:savedTransaction.orderId, transactionId:savedTransaction._id});
          else
          throw createError.InternalServerError('Failed to patch transaction')
        }
        else{
          return res.status(404).json({ status: false, message: 'This transaction does not exist' }) 
        }
    } catch (error) {
      return res.status(500).json({ status: false, error: error }) 
    }

  },

  singleTransaction: async (req, res) =>{
    try{
      let txId = req.query.txid
      const filter = {_id:txId}
      const transaction = await Transaction.findOne(filter)
      if (transaction){
        return res.status(200).json(transaction);
      }
      else{
        return res.status(404).json({ status: false, "message":"Transaction not found"});
      }
    }
    catch(err){}
  },

  recentTransactions: async (req, res) => {
    try {
      let limit = parseInt(req.query.limit) || 10;
  
      Transaction.countDocuments().exec((countError, totalCount) => {
        if (countError) {
          return res.status(500).json({ status: false, error: countError.message });
        }
  
        Transaction.find()
          .sort({ date_initiated: -1 })
          .limit(limit)
          .populate('seller', '-password -_id -reset_password_token')
          .populate('buyer', '-password -_id -reset_password_token')
          .exec((err, transactions) => {
            if (err) {
              return res.status(500).json({ status: false, error: err.message });
            }
            if (transactions) {
              return res.status(200).json({ status: true, data: transactions });
            } else {
              return res.status(404).json({ status: false, message: 'No transactions found' });
            }
          });
      });
    } catch (error) {
      return res.status(500).json({ status: false, error: error });
    }
  },

  transactionListing: async (req, res) =>{
    try {
        
        let page = parseInt(req.query.page) || 1; 
        let perPage = parseInt(req.query.perPage) || 50;
        let party = parseInt(req.query.party)
        let statusMapping = {'open':'OPEN','accepted':'ACCEPTED','fundreleased':'RELEASED','completed':'COMPLETED','refunded':'REFUNDED'}
        let filter = {status:statusMapping[req.query.status || 'accepted']}
        Transaction.countDocuments().exec((countError, totalCount) => {
            if (countError) {
              return res.status(500).json({ status: false, error: countError.message });
            }
            if (party==1){
              filter = {
                $or: [
                  { 'buyer._id': req.userId },
                  { 'seller._id': req.userId },
                ],
              }
            }
            Transaction.find(filter).sort({ date_initiated: -1 })
              .skip((page - 1) * perPage) 
              .limit(perPage) 
              .populate('seller', '-password -_id -reset_password_token')
              .populate('buyer', '-password -_id -reset_password_token')
              .exec((err, transactions) => {
                if (err) {
                  return res.status(500).json({ status: false, error: err.message });
                }
                if (transactions) {
                  const totalPages = Math.ceil(totalCount / perPage);
                  const hasNextPage = page < totalPages;
                  const hasPreviousPage = page > 1;
          
                  const paginationInfo = {
                    page,
                    perPage,
                    totalTransactions: totalCount,
                    totalPages,
                    hasNextPage,
                    hasPreviousPage,
                  };
          
                  const links = {
                    self: `${transactionListingsUrl}?page=${page}&perPage=${perPage}`,
                  };
          
                  if (hasNextPage) {
                    links.next = `${transactionListingsUrl}?page=${page + 1}&perPage=${perPage}`;
                    links.last = `${transactionListingsUrl}?page=${totalPages}&perPage=${perPage}`;
                  }
          
                  if (hasPreviousPage) {
                    links.prev = `${transactionListingsUrl}?page=${page - 1}&perPage=${perPage}`;
                  }
          
                  return res.status(200).json({ status: true, data: transactions, paginationInfo, links });
                } else {
                  return res.status(404).json({ status: false, message: 'No transactions found' });
                }
              });
        })

    } catch (error) {
      return res.status(500).json({ status: false, error: error })
    }
  },
 
}

export default transactionRoutes