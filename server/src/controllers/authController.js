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
          learner,
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

module.exports = { login };
