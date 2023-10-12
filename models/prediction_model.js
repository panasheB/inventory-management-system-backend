const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PredictionSchema = new Schema({
  data: String,

},
  { timestamps: true });
// Export model
module.exports = mongoose.model("predictions", PredictionSchema);
