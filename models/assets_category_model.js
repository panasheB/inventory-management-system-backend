const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetsCategorySchema = new Schema({
  CategoryName: String,
  Description: String
}, { timestamps: true });

module.exports = mongoose.model("asset_category", AssetsCategorySchema);
