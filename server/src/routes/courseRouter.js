const express = require("express");
const router = express.Router();

const courses = require("../controllers/courseController");

router.get("/", (req, res) => {
  res.send("The course router is working.");
});

// Get all available courses
router.get("/all", courses.getAllCourses);

// Create a new course
router.post("/", courses.createCourse);

// Get a course by id
router.get("/:id", courses.getCourseById);

// Update a course by id
router.put("/:id", courses.updateCourseById);

// Delete a course by id
router.delete("/:id", courses.deleteCourseById);

module.exports = router;
