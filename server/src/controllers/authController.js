const learnerModel = require("../models/learnerModel");

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const learner = await learnerModel.findOne({ email: email });
    if (learner) {
      if (password === learner.password) {
        res.status(200).json({
          message: "Logged in successfully.",
          data: learner,
        });
      } else {
        res.status(401).json({ message: "Incorrect password." });
      }
    } else {
      res.status(404).json({ message: "Incorrect email." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while logging in." });
  }
};

// Sign up
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const learnerExists = await learnerModel.findOne({ email: email });
    if (learnerExists) {
      return res
        .status(409)
        .json({ message: "A learner with that email already exists." });
    } else {
      let learner = await learnerModel.create({
        name: name,
        email: email,
        password: password,
      });
      await learner.save();
      learner = await learnerModel.findOne({ email: email });
      res.status(201).json({
        message: "Signed up successfully.",
        data: learner,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while signing up." });
  }
};

module.exports = { login, signup };
