const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemsSchema = new Schema({

  //define our schema
  code: String,
  name: String,
  availableQuantity: Number,
  priceUSD: String,
  description:String,
  cost:Number,
},
  { timestamps: true });
// Export model
module.exports = mongoose.model("items", ItemsSchema);
