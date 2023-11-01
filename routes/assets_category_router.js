const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CategoryModel = require("../models/assets_category_model");
const ObjectId = mongoose.Types.ObjectId;

// GET all asset categories
router.get("/assetCategories", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific asset category by CategoryID
router.get("/assetCategories/:CategoryID", async (req, res) => {
  try {
    const categoryID = req.params.CategoryID;

    // Check if the provided category ID is a valid ObjectId
    if (!ObjectId.isValid(categoryID)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    }

    const category = await CategoryModel.findOne({ _id: new ObjectId(categoryID) });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new asset category
router.post("/assetCategories", async (req, res) => {
  try {
    const newCategory = new CategoryModel(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// PUT (update) an existing asset category by CategoryID
router.put("/assetCategories/:CategoryID", async (req, res) => {
  try {
    const categoryID = req.params.CategoryID;

    // Check if the provided category ID is a valid ObjectId
    if (!ObjectId.isValid(categoryID)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    }

    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { _id: new ObjectId(categoryID) },
      req.body,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE an asset category by CategoryID
router.delete("/assetCategories/:CategoryID", async (req, res) => {
  try {
    const categoryID = req.params.CategoryID;

    // Check if the provided category ID is a valid ObjectId
    if (!ObjectId.isValid(categoryID)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    }

    const deletedCategory = await CategoryModel.findOneAndRemove({
      _id: new ObjectId(categoryID),
    });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
