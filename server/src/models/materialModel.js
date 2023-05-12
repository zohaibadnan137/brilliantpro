const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
  name: { type: String, required: true },
  type: { type: String, enum: ["pdf", "pptx", "mp4"] },
  file: { type: String },
});

const material = mongoose.model("materials", materialSchema);
module.exports = material;
