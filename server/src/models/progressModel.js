const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  learnerId: { type: mongoose.Schema.Types.ObjectId, ref: "learner" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
  viewedMaterials: [{ type: mongoose.Schema.Types.ObjectId, ref: "material" }],
  completedAssessments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "assessment" },
  ],
  percentComplete: { type: Number, default: 0 },
});

const progress = mongoose.model("progress", progressSchema);
