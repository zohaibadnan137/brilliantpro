const courseModel = require("../models/courseModel");
const enrollmentModel = require("../models/enrollmentModel");

// Get all courses that a learner is enrolled in
const getLearnerEnrolledCourses = async (req, res) => {
  try {
    const learnerId = req.params.id;
    const learnerEnrollments = await enrollmentModel.find({
      learnerId: learnerId,
    });
    const learnerEnrolledCourses = [];
    for (let i = 0; i < learnerEnrollments.length; i++) {
      const course = await courseModel.findById(learnerEnrollments[i].courseId);
      learnerEnrolledCourses.push(course);
    }
    res.status(200).json({
      message: "Courses that learner is enrolled in found successfully.",
      learnerEnrolledCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Server error while getting courses that learner is enrolled in.",
    });
  }
};

// Get all courses that a learner is not enrolled in
const getLearnerNotEnrolledCourses = async (req, res) => {
  try {
    const learnerId = req.params.id;
    const learnerEnrollments = await enrollmentModel.find({
      learnerId: learnerId,
    });
    const learnerEnrolledCourses = [];
    for (let i = 0; i < learnerEnrollments.length; i++) {
      const course = await courseModel.findById(learnerEnrollments[i].courseId);
      learnerEnrolledCourses.push(course);
    }
    const allCourses = await courseModel.find();
    const learnerNotEnrolledCourses = allCourses.filter(
      (course) => !learnerEnrolledCourses.includes(course)
    );
    res.status(200).json({
      message: "Courses that learner is not enrolled in found successfully.",
      learnerNotEnrolledCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Server error while getting courses that learner is not enrolled in.",
    });
  }
};

module.exports = {
  getLearnerEnrolledCourses,
  getLearnerNotEnrolledCourses,
};
