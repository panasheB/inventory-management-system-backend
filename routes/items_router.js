const express = require("express");
const router = express.Router();
const ItemsModel = require("../models/items_model");

// Getting all
router.get("/get", async (req, res) => {
  try {
    const items = await ItemsModel.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/deleteItem", async (req, res) => {
  const { code } = req.body; 

  try {
    const deleteItel = await ItemsModel.findOneAndDelete({ code: code });

    if (!deleteItel) {
      // return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});


router.put("/updateItemQuantity", async (req, res) => {
  const { code, quantity } = req.body; // Assuming you are sending the code and quantity from the frontend.
  try {
    // Find the item by its code.
    const item = await ItemsModel.findOne({ code });
    if (!item) {
    }
    const newQuantityAvailable = item.availableQuantity + quantity;
    await ItemsMOdel.updateOne({ code }, { availableQuantity: newQuantityAvailable });
    res.status(200).json({ message: "Item quantity updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Creating one
router.post("/create", async (req, res) => {
  const item = new ItemsModel(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Check if item code exists
router.get("/check/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const item = await ItemsModel.findOne({ code });

    if (item) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});


module.exports = router;
