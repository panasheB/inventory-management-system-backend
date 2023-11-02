const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TransactionModel = require("../models/assets_trans_model");
const ObjectId = mongoose.Types.ObjectId;


// GET all transactions
router.get("/assetTransactions", async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// GET a specific transaction by TransactionID
router.get("/assetTransactions/:TransactionID", async (req, res) => {
  try {
    const transactionID = req.params.TransactionID;

    // Check if the provided transaction ID is a valid ObjectId
    if (!ObjectId.isValid(transactionID)) {
      return res.status(400).json({ error: "Invalid Transaction ID" });
    }

    const transaction = await TransactionModel.findOne({ _id: new ObjectId(transactionID) });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new transaction
router.post("/assetTransactions", async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) an existing transaction by TransactionID
router.put("/assetTransactions/:TransactionID", async (req, res) => {
  try {
    const transactionID = req.params.TransactionID;

    // Check if the provided transaction ID is a valid ObjectId
    if (!ObjectId.isValid(transactionID)) {
      return res.status(400).json({ error: "Invalid Transaction ID" });
    }

    const updatedTransaction = await TransactionModel.findOneAndUpdate(
      { _id: new ObjectId(transactionID) },
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
router.delete("/assetTransactions/:TransactionID", async (req, res) => {
  try {
    const transactionID = req.params.TransactionID;

    // Check if the provided transaction ID is a valid ObjectId
    if (!ObjectId.isValid(transactionID)) {
      return res.status(400).json({ error: "Invalid Transaction ID" });
    }

    const deletedTransaction = await TransactionModel.findOneAndRemove({
      _id: new ObjectId(transactionID),
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
