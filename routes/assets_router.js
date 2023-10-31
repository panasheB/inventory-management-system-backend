const express = require("express");
const router = express.Router();
const AssetsModel = require("../models/assets_model");

// GET all assets
router.get("/assets", async (req, res) => {
  try {
    const assets = await AssetsModel.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific asset by AssetID
router.get("/assets/:AssetID", async (req, res) => {
  try {
    const asset = await AssetsModel.findOne({ AssetID: req.params.AssetID });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new asset
router.post("/assets", async (req, res) => {
  try {
    const newAsset = new AssetsModel(req.body);
    const savedAsset = await newAsset.save();
    res.status(201).json(savedAsset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) an existing asset by AssetID
router.put("/assets/:AssetID", async (req, res) => {
  try {
    const updatedAsset = await AssetsModel.findOneAndUpdate(
      { AssetID: req.params.AssetID },
      req.body,
      { new: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.json(updatedAsset);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE an asset by AssetID
router.delete("/assets/:AssetID", async (req, res) => {
  try {
    const deletedAsset = await AssetsModel.findOneAndRemove({
      AssetID: req.params.AssetID,
    });
    if (!deletedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.json({ message: "Asset deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
