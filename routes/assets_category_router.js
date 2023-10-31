const express = require("express");
const router = express.Router();
const CategoryModel = require("../models/assets_category_model");

// GET all asset categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific asset category by CategoryID
router.get("/categories/:CategoryID", async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ CategoryID: req.params.CategoryID });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new asset category
router.post("/categories", async (req, res) => {
  try {
    const newCategory = new CategoryModel(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) an existing asset category by CategoryID
router.put("/categories/:CategoryID", async (req, res) => {
  try {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { CategoryID: req.params.CategoryID },
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
router.delete("/categories/:CategoryID", async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findOneAndRemove({
      CategoryID: req.params.CategoryID,
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
