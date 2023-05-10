const enrollmentModel = require("../models/enrollmentModel");

// Create a new enrollment
const createEnrollment = async (req, res) => {
  try {
    const { learnerId, courseId } = req.body;
    const enrollment = new enrollmentModel({
      learnerId: learnerId,
      courseId: courseId,
      completed: false,
    });

    await enrollmentModel.save();
    res
      .status(201)
      .json({ message: "Enrollment created successfully.", enrollment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while creating enrollment." });
  }
};

// Get all enrollments
const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentModel.find();
    res
      .status(200)
      .json({ message: "All enrollments found successfully.", enrollments });

    return enrollments;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting all enrollments." });
  }
};

// Get all enrollments for a learner
const getAllEnrollmentsForLearner = async (req, res) => {
  try {
    const learnerId = req.params.id;
    const enrollments = await enrollmentModel.find({ learnerId: learnerId });
    res.status(200).json({
      message: "All enrollments for learner found successfully.",
      enrollments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while getting all enrollments for learner.",
    });
  }
};

// Get all enrollments for a course
const getAllEnrollmentsForCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const enrollments = await enrollmentModel.find({ courseId: courseId });
    res.status(200).json({
      message: "All enrollments for course found successfully.",
      enrollments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while getting all enrollments for course.",
    });
  }
};

// Get an enrollment by id
const getEnrollmentById = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await enrollmentModel.findById(enrollmentId);
    if (enrollment) {
      res
        .status(200)
        .json({ message: "Enrollment found successfully.", enrollment });
    } else {
      res.status(404).json({ message: "Enrollment not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting enrollment by id." });
  }
};

// Update an enrollment by id
const updateEnrollmentById = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const { completed } = req.body;
    const enrollment = await enrollmentModel.findById(enrollmentId);
    if (enrollment) {
      enrollment.completed = completed;
      await enrollment.save();
      res.status(200).json({
        message: "Enrollment updated successfully.",
        enrollment,
      });
    } else {
      res.status(404).json({ message: "Enrollment not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while updating enrollment by id." });
  }
};

// Delete an enrollment by id
const deleteEnrollmentById = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await enrollmentModel.findById(enrollmentId);
    if (enrollment) {
      await enrollment.remove();
      res.status(200).json({
        message: "Enrollment deleted successfully.",
        enrollment,
      });
    } else {
      res.status(404).json({ message: "Enrollment not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while deleting enrollment by id." });
  }
};

module.exports = {
  createEnrollment,
  getAllEnrollments,
  getAllEnrollmentsForLearner,
  getAllEnrollmentsForCourse,
  getEnrollmentById,
  updateEnrollmentById,
  deleteEnrollmentById,
};
