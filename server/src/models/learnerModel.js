const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      progress: { type: Number, default: 0 },
    },
  ],
});

const Learner = mongoose.model("Learner", learnerSchema);
