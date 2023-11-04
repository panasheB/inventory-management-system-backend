const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  Name: String,
  Category: String,
  Amount: Number,
  Description: String,
}, { timestamps: true });

module.exports = mongoose.model("expenses", ExpenseSchema);
