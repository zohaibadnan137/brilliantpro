const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String },
  image: { type: String },
  deadline: {
    start: { type: Date },
    end: { type: Date },
  },
  enrollmentLink: { type: String },
  materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
  assessments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
    },
  ],
  learners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Learner",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);
