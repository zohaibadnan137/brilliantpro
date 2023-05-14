const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  changeDate: { type: Date, required: true },
  entityName: {
    type: String,
    enum: [
      "admin",
      "assessment",
      "course",
      "enrollment",
      "folder",
      "learner",
      "material",
      "progress",
    ],
    required: true,
  },
  objectId: { type: mongoose.Schema.Types.ObjectId, required: true },
  fieldName: { type: String, required: true },
  oldValue: { type: String, required: true },
  newValue: { type: String, required: true },
  operationType: {
    type: String,
    enum: ["create", "update", "delete"],
    required: true,
  },
});

const audit = mongoose.model("audits", auditSchema);
module.exports = audit;
