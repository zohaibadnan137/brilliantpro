const express = require("express");
const router = express.Router();

const enrollment = require("../controllers/enrollmentController");

router.get("/", (req, res) => {
  res.send("The enrollment router is working.");
});

// Get all available enrollments
router.get("/all", enrollment.getAllEnrollments);

// Create a new enrollment
router.post("/", enrollment.createEnrollment);

// Get an enrollment by id
router.get("/:id", enrollment.getEnrollmentById);

// Update an enrollment by id
router.put("/:id", enrollment.updateEnrollmentById);

// Delete an enrollment by id
router.delete("/:id", enrollment.deleteEnrollmentById);

// Get all enrollments for a learner
router.get("/for-learner/:id", enrollment.getAllEnrollmentsForLearner);

// Get all enrollments for a course
router.get("/for-course/:id", enrollment.getAllEnrollmentsForCourse);

module.exports = router;
