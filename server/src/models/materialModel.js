const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["pdf", "pptx", "mp4"] },
  file: { type: String },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
});

const Material = mongoose.model("Material", materialSchema);
