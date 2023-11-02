const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MaintenanceModel = require("../models/assets_maintanance_model");
const ObjectId = mongoose.Types.ObjectId;

// GET all maintenance records
router.get("/assetMaintenance", async (req, res) => {
  try {
    const maintenanceRecords = await MaintenanceModel.find();
    res.json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific maintenance record by MaintenanceID
router.get("/assetMaintenance/:MaintenanceID", async (req, res) => {
  try {
    const maintenanceID = req.params.MaintenanceID;

    // Check if the provided maintenance ID is a valid ObjectId
    if (!ObjectId.isValid(maintenanceID)) {
      return res.status(400).json({ error: "Invalid Maintenance ID" });
    }

    const maintenanceRecord = await MaintenanceModel.findOne({ _id: new ObjectId(maintenanceID) });

    if (!maintenanceRecord) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }

    res.json(maintenanceRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// POST a new maintenance record
router.post("/assetMaintenance", async (req, res) => {
  try {
    const newMaintenanceRecord = new MaintenanceModel(req.body);
    const savedMaintenanceRecord = await newMaintenanceRecord.save();
    res.status(201).json(savedMaintenanceRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) an existing maintenance record by MaintenanceID
router.put("/assetMaintenance/:MaintenanceID", async (req, res) => {
  try {
    const maintenanceID = req.params.MaintenanceID;

    // Check if the provided maintenance ID is a valid ObjectId
    if (!ObjectId.isValid(maintenanceID)) {
      return res.status(400).json({ error: "Invalid Maintenance ID" });
    }

    const updatedMaintenanceRecord = await MaintenanceModel.findOneAndUpdate(
      { _id: new ObjectId(maintenanceID) },
      req.body,
      { new: true }
    );

    if (!updatedMaintenanceRecord) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }

    res.json(updatedMaintenanceRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a maintenance record by MaintenanceID
router.delete("/assetMaintenance/:MaintenanceID", async (req, res) => {
  try {
    const maintenanceID = req.params.MaintenanceID;

    // Check if the provided maintenance ID is a valid ObjectId
    if (!ObjectId.isValid(maintenanceID)) {
      return res.status(400).json({ error: "Invalid Maintenance ID" });
    }

    const deletedMaintenanceRecord = await MaintenanceModel.findOneAndRemove({
      _id: new ObjectId(maintenanceID),
    });

    if (!deletedMaintenanceRecord) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }

    res.json({ message: "Maintenance record deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
