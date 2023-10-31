const express = require("express");
const router = express.Router();
const TransactionModel = require("../models/assets_trans_model");

// GET all transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific transaction by TransactionID
router.get("/transactions/:TransactionID", async (req, res) => {
  try {
    const transaction = await TransactionModel.findOne({ TransactionID: req.params.TransactionID });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new transaction
router.post("/transactions", async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) an existing transaction by TransactionID
router.put("/transactions/:TransactionID", async (req, res) => {
  try {
    const updatedTransaction = await TransactionModel.findOneAndUpdate(
      { TransactionID: req.params.TransactionID },
      req.body,
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a transaction by TransactionID
router.delete("/transactions/:TransactionID", async (req, res) => {
  try {
    const deletedTransaction = await TransactionModel.findOneAndRemove({
      TransactionID: req.params.TransactionID,
    });
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
