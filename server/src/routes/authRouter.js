const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("The authentication router is working.");
});

// Login
router.post("/login", auth.login);

// Sign up
router.post("/signup", auth.signup);

module.exports = router;
