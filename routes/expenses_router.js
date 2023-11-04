const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ExpenseModel = require("../models/expense_model");
const ObjectId = mongoose.Types.ObjectId;

// GET all expenses
router.get("/expenses", async (req, res) => {
    try {
      const expenses = await ExpenseModel.find();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// GET a specific expense by ExpenseID
router.get("/expenses/:expenseID", async (req, res) => {
    try {
      const expenseId = req.params.expenseID;
  
      // Check if the provided expense ID is a valid ObjectId
      if (!ObjectId.isValid(expenseId)) {
        return res.status(400).json({ error: "Invalid Expense ID" });
      }
  
      const expense = await ExpenseModel.findOne({ _id: new ObjectId(expenseId) });
  
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
  
      res.json(expense);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// POST a new expense
router.post("/expenses", async (req, res) => {
    try {
      const newExpense = new ExpenseModel(req.body);
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// PUT (update) an existing expense record by expenseID
router.put("/expenses/:expenseID", async (req, res) => {
    try {
      const expenseId = req.params.expenseID;
  
      // Check if the provided expense ID is a valid ObjectId
      if (!ObjectId.isValid(expenseId)) {
        return res.status(400).json({ error: "Invalid Asset ID" });
      }
  
      const updatedExpenseRecord = await ExpenseModel.findOneAndUpdate(
        { _id: new ObjectId(expenseId) },
        req.body,
        { new: true }
      );
  
      if (!updatedExpenseRecord) {
        return res.status(404).json({ error: "Expense record not found" });
      }
  
      res.json(updatedExpenseRecord);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// DELETE an expense by expenseID
router.delete("/expenses/:ExpenseID", async (req, res) => {
    try {
      const expenseId = req.params.ExpenseID;
  
      // Check if the provided expense ID is a valid ObjectId
      if (!ObjectId.isValid(expenseId)) {
        return res.status(400).json({ error: "Invalid Expense ID" });
      }
  
      const deletedExpense = await ExpenseModel.findOneAndRemove({
        _id: new ObjectId(expenseId),
      });
  
      if (!deletedExpense) {
        return res.status(404).json({ error: "Expense not found" });
      }
  
      res.json({ message: "Expense deleted" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;