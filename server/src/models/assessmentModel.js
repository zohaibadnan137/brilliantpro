const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
  name: { type: String, required: true },
  timeLimit: { type: Number },
  passingScore: { type: Number },
  questions: [
    {
      statement: { type: String, required: true },
      options: [{ type: String }],
      correctOption: { type: String, required: true },
    },
  ],
});

const assessment = mongoose.model("assessments", assessmentSchema);
module.exports = assessment;
