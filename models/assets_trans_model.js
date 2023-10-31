const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetTransactionSchema = new Schema({
  AssetID: Number,
  Type: String,
  Amount: Number, 
  Date: Date, 
}, { timestamps: true });

module.exports = mongoose.model("asset_transactions", AssetTransactionSchema);
