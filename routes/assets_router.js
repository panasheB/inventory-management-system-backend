const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AssetsModel = require("../models/assets_model");
const ObjectId = mongoose.Types.ObjectId;

// GET all assets
router.get("/assets", async (req, res) => {
  try {
    const assets = await AssetsModel.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) an existing asset record by assetID
router.put("/assets/:assetID", async (req, res) => {
  try {
    const assetID = req.params.assetID;

    // Check if the provided asset ID is a valid ObjectId
    if (!ObjectId.isValid(assetID)) {
      return res.status(400).json({ error: "Invalid Asset ID" });
    }

    const updatedAssetRecord = await AssetsModel.findOneAndUpdate(
      { _id: new ObjectId(assetID) },
      req.body,
      { new: true }
    );

    if (!updatedAssetRecord) {
      return res.status(404).json({ error: "Asset record not found" });
    }

    res.json(updatedAssetRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific asset by AssetID
router.get("/assets/:AssetID", async (req, res) => {
  try {
    const assetId = req.params.AssetID;

    // Check if the provided asset ID is a valid ObjectId
    if (!ObjectId.isValid(assetId)) {
      return res.status(400).json({ error: "Invalid Asset ID" });
    }

    const asset = await AssetsModel.findOne({ _id: new ObjectId(assetId) });

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




// DELETE an asset by AssetID
router.delete("/assets/:AssetID", async (req, res) => {
  try {
    const assetId = req.params.AssetID;

    // Check if the provided asset ID is a valid ObjectId
    if (!ObjectId.isValid(assetId)) {
      return res.status(400).json({ error: "Invalid Asset ID" });
    }

    const deletedAsset = await AssetsModel.findOneAndRemove({
      _id: new ObjectId(assetId),
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
