const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  learnerId: { type: mongoose.Schema.Types.ObjectId, ref: "learner" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
  completed: { type: Boolean, default: false },
});

const enrollment = mongoose.model("enrollment", enrollmentSchema);
