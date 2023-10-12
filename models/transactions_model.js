const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TranscactionsSchema = new Schema({

  //define our schema
  data: String,
  products: Array,
  price: String,
  subtotal: String,
  total: String,
  currency: String,
  customerEmail: String,
  customerName: String,
  customerPhone: String,
  amountTendered: String,
  availableQuantity: String,
  paymentMode: String,
  change: String,
  cumulativeAmount: String,
  casenumber:String,
  transactionid:String,



},
  { timestamps: true });
// Export model
module.exports = mongoose.model("transactions", TranscactionsSchema);
