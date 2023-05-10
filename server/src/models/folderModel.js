const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
});

const Folder = mongoose.model("Folder", folderSchema);