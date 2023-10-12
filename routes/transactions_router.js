const express = require("express");
const router = express.Router();
const TransactionsModel = require("../models/transactions_model");

// Getting all
router.get("/get", async (req, res) => {
  try {
    const transactions = await TransactionsModel.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Creating one
router.post("/create", async (req, res) => {
  const transaction = new TransactionsModel(req.body);
  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
