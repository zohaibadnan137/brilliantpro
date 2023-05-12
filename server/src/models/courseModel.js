const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String },
  description: { type: String },
  image: { type: String },
  syllabus: [
    {
      type: String,
    },
  ],
  deadline: {
    start: { type: Date },
    end: { type: Date },
  },
  enrollmentLink: { type: String },
});

const course = mongoose.model("courses", courseSchema);
module.exports = course;
