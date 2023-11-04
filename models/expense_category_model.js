const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseCategorySchema = new Schema({
  CategoryName: String,
  Description: String
}, { timestamps: true });

module.exports = mongoose.model("expense_category", ExpenseCategorySchema);
