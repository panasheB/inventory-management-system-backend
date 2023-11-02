const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetTransactionSchema = new Schema({
  AssetID: String,
  Type: String,
  Amount: Number, 
}, { timestamps: true });

module.exports = mongoose.model("asset_transactions", AssetTransactionSchema);
