const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "material" }],
});

const folder = mongoose.model("folders", folderSchema);
module.exports = folder;
