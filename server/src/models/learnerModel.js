const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    default: "https://bulma.io/images/placeholders/128x128.png",
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: "learner",
});

const learner = mongoose.model("learner", learnerSchema);
