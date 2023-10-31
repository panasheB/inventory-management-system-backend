const express = require("express");
const router = express.Router();
const MaintenanceModel = require("../models/assets_maintanance_model");

// GET all maintenance records
router.get("/maintenance", async (req, res) => {
  try {
    const maintenanceRecords = await MaintenanceModel.find();
    res.json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific maintenance record by MaintenanceID
router.get("/maintenance/:MaintenanceID", async (req, res) => {
  try {
    const maintenanceRecord = await MaintenanceModel.findOne({ MaintenanceID: req.params.MaintenanceID });
    if (!maintenanceRecord) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }
    res.json(maintenanceRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new maintenance record
router.post("/maintenance", async (req, res) => {
  try {
    const newMaintenanceRecord = new MaintenanceModel(req.body);
    const savedMaintenanceRecord = await newMaintenanceRecord.save();
    res.status(201).json(savedMaintenanceRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) an existing maintenance record by MaintenanceID
router.put("/maintenance/:MaintenanceID", async (req, res) => {
  try {
    const updatedMaintenanceRecord = await MaintenanceModel.findOneAndUpdate(
      { MaintenanceID: req.params.MaintenanceID },
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
router.delete("/maintenance/:MaintenanceID", async (req, res) => {
  try {
    const deletedMaintenanceRecord = await MaintenanceModel.findOneAndRemove({
      MaintenanceID: req.params.MaintenanceID,
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
