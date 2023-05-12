const express = require("express");
const router = express.Router();

const learners = require("../controllers/learnerController");

router.get("/", (req, res) => {
  res.send("The learner router is working.");
});

// Get all available learners
router.get("/all", learners.getAllLearners);

// Create a new learner
router.post("/", learners.createLearner);

// Get a learner by id
router.get("/:id", learners.getLearnerById);

// Update a learner by id
router.put("/:id", learners.updateLearnerById);

// Delete a learner by id
router.delete("/:id", learners.deleteLearnerById);

module.exports = router;
