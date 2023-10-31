const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaintenanceSchema = new Schema({
  AssetID: String, 
  Description: String, 
  Date: Date,
}, { timestamps: true });

module.exports = mongoose.model("asset_maintenance", MaintenanceSchema);
