const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
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

const Assessment = mongoose.model("Assessment", assessmentSchema);
