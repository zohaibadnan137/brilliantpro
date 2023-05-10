const courseModel = require("../models/courseModel");

// Create a new course
const createCourse = async (req, res) => {
  try {
    const {
      title,
      overview,
      description,
      image,
      syllabus,
      deadline,
      enrollmentLink,
    } = req.body;
    const course = new courseModel({
      title: title,
      overview: overview,
      description: description,
      image: image,
      syllabus: syllabus,
      deadline: deadline,
      enrollmentLink: enrollmentLink,
    });

    await courseModel.save();
    res.status(201).json({ message: "Course created successfully.", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating course." });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res
      .status(200)
      .json({ message: "All courses found successfully.", courses });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting all courses." });
  }
};

// Get a course by id
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courseModel.findById(courseId);
    if (course) {
      res.status(200).json({ message: "Course found successfully.", course });
    } else {
      res.status(404).json({ message: "Course not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting course by id." });
  }
};

// Update a course by id
const updateCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const {
      title,
      overview,
      description,
      image,
      syllabus,
      deadline,
      enrollmentLink,
    } = req.body;
    const course = await courseModel.findByIdAndUpdate(courseId, {
      title: title,
      overview: overview,
      description: description,
      image: image,
      syllabus: syllabus,
      deadline: deadline,
      enrollmentLink: enrollmentLink,
    });
    res.status(200).json({ message: "Course updated successfully.", course });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while updating course by id." });
  }
};

// Delete a course by id
const deleteCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courseModel.findByIdAndDelete(courseId);
    res.status(200).json({ message: "Course deleted successfully.", course });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while deleting course by id." });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
