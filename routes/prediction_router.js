const express = require("express");
const router = express.Router();
const PredictionModel = require("../models/prediction_model");

// Getting all
router.get("/get", async (req, res) => {
  try {
    const predictions = await PredictionModel.find();
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Creating one
router.post("/create", async (req, res) => {
  const prediction = new PredictionModel(req.body);
  try {
    const newPrediction = await prediction.save();
    res.status(201).json(newPrediction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
