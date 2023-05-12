const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ChangeDate: { type: Date, required: true },
  EntityName: {
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
  ObjectId: { type: mongoose.Schema.Types.ObjectId, required: true },
  FieldName: { type: String, required: true },
  OldValue: { type: String, required: true },
  NewValue: { type: String, required: true },
  OperationType: {
    type: String,
    enum: ["create", "retrieve", "update", "delete"],
    required: true,
  },
});

const audit = mongoose.model("audits", auditSchema);
module.exports = audit;
