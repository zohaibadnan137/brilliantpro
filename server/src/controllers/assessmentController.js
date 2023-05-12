const assessmentModel = require("../models/assessmentModel");

// Create a new assessment
const createAssessment = async (req, res) => {
  try {
    const { courseId, name, timeLimit, passingScore, questions } = req.body;
    const assessment = new assessmentModel({
      courseId: courseId,
      name: name,
      timeLimit: timeLimit,
      passingScore: passingScore,
      questions: questions,
    });

    await assessment.save();
    res
      .status(201)
      .json({ message: "Assessment created successfully.", data: assessment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while creating assessment." });
  }
};

// Get all assessments
const getAllAssessments = async (req, res) => {
  try {
    const assessments = await assessmentModel.find();
    res.status(200).json({
      message: "All assessments found successfully.",
      data: assessments,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting all assessments." });
  }
};

// Get all assessments for a course
const getAllAssessmentsForCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const assessments = await assessmentModel.find({ courseId: courseId });
    res.status(200).json({
      message: "All assessments for course found successfully.",
      data: assessments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while getting all assessments for course.",
    });
  }
};

// Get an assessment by id
const getAssessmentById = async (req, res) => {
  try {
    const assessmentId = req.params.id;
    const assessment = await assessmentModel.findById(assessmentId);
    res
      .status(200)
      .json({ message: "Assessment found successfully.", data: assessment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting assessment by id." });
  }
};

// Update an assessment by id
const updateAssessmentById = async (req, res) => {
  try {
    const assessmentId = req.params.id;
    const { courseId, name, timeLimit, passingScore, questions } = req.body;
    const assessment = await assessmentModel.findByIdAndUpdate(
      assessmentId,
      {
        courseId: courseId,
        name: name,
        timeLimit: timeLimit,
        passingScore: passingScore,
        questions: questions,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Assessment updated successfully.", data: assessment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while updating assessment by id." });
  }
};

// Delete an assessment by id
const deleteAssessmentById = async (req, res) => {
  try {
    const assessmentId = req.params.id;
    await assessmentModel.findByIdAndDelete(assessmentId);
    res
      .status(200)
      .json({ message: "Assessment deleted successfully.", data: null });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while deleting assessment by id." });
  }
};

module.exports = {
  createAssessment,
  getAllAssessments,
  getAllAssessmentsForCourse,
  getAssessmentById,
  updateAssessmentById,
  deleteAssessmentById,
};
