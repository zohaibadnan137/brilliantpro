const express = require("express");
const router = express.Router();

const assessmentController = require("../controllers/assessmentController");

router.get("/", (req, res) => {
  res.send("The assessment router is working.");
});

// Get all assessments
router.get("/all", assessmentController.getAllAssessments);

// Create a new assessment
router.post("/", assessmentController.createAssessment);

// Get an assessment by id
router.get("/:id", assessmentController.getAssessmentById);

// Update an assessment by id
router.put("/:id", assessmentController.updateAssessmentById);

// Delete an assessment by id
router.delete("/:id", assessmentController.deleteAssessmentById);

// Get all assessments for a course
router.get("/for-course/:id", assessmentController.getAllAssessmentsForCourse);

module.exports = router;
