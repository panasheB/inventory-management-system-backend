const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetsSchema = new Schema({
  Name: String,
  Category: String,
  Value: Number,
  PurchaseDate: Date,
  SerialNumber: String,
  Description: String
}, { timestamps: true });

module.exports = mongoose.model("assets", AssetsSchema);
