const express = require("express");
const router = express.Router();

const learnerCourse = require("../controllers/learnerCourseController");

router.get("/", (req, res) => {
  res.send("The learnerCourse router is working.");
});

// Get all courses that a learner is enrolled in
router.get("/enrolled/:id", learnerCourse.getLearnerEnrolledCourses);

// Get all courses that a learner is not enrolled in
router.get("/not-enrolled/:id", learnerCourse.getLearnerNotEnrolledCourses);

module.exports = router;
