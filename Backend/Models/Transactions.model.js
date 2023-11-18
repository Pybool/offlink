import mongoose from 'mongoose';
import mailActions from '../helpers/mail_actions.js'
import socketMessangers from '../helpers/wssender.js'
const Schema = mongoose.Schema
const STATUS = ['OPEN','ACCEPTED','COMPLETED','RELEASED','CANCELLED','REFUNDED']

const TransactionSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId, 
    ref: 'user',
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId, 
    ref: 'user',
    required: false,
  },
  orderId:{
    type: String,
    required: false,
    default:0
  },
  buyerAddress:{
    type: String,
    required: false,
    default:'',
  },
  sellerAddress:{
    type: String,
    required: false,
    default:'',
  },
  nonce: {
    type: Number,
    required: false,
  },
  fiat_currency: {
    type: String,
    required: false,
  },
  fiat_amount: {
    type: String,
    required: false,
  },
  message_hash: {
    type: String,
    required: false,
  },
  token_amount: {
    type: Number,
    required: false,
  },
  cryptocurrency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum:STATUS,
    default:'OPEN',
  },
  signature:{
    type: String,
    required: false,
    default:'',
  },
  funds_released: {
    type: Boolean,
    required: true,
    default:false
  },
  amount_released:{
    type: String,
    required: false,
    default:'',
  },
  date_initiated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  date_closed: {
    type: Date,
    required: false,
  },
})

TransactionSchema.post('save', async function (doc) {
    try {
      const newRecord = doc.toObject(); 
      const payload = newRecord
      delete payload.password
      delete payload._id

      // if(this.status=='OPEN'){
      //   socketMessangers.sendWebscoketMessage(payload.seller.preferredCurrency,'offerpoolUpdate',payload)
      //   await mailActions.transactions.sendTransactionPlacedMail(payload)
      // }
      // else{
      //   socketMessangers.sendWebscoketMessage(payload.seller.preferredCurrency,'offerpoolItemUpdate',payload)
      //   await mailActions.transactions.sendTransactionMutationMail(payload)
      // }
      
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
    }
});

const Transaction = mongoose.model('transaction', TransactionSchema);
export default Transaction
