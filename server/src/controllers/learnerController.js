const learnerModel = require("../models/learnerModel");

// Create a new learner
const createLearner = async (req, res) => {
  try {
    const { name, image, email, password } = req.body;
    const learner = new learnerModel({
      name: name,
      image: image,
      email: email,
      password: password,
      role: "learner",
    });
    await learnerModel.save();
    res
      .status(201)
      .json({ message: "Learner created successfully.", data: learner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating learner." });
  }
};

// Get all learners
const getAllLearners = async (req, res) => {
  try {
    const learners = await learnerModel.find();
    res
      .status(200)
      .json({ message: "All learners found successfully .", data: learners });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting all learners." });
  }
};

// Get a learner by id
const getLearnerById = async (req, res) => {
  try {
    const learnerId = req.params.id;
    const learner = await learnerModel.findById(learnerId);
    if (learner) {
      res
        .status(200)
        .json({ message: "Learner found successfully.", data: learner });
    } else {
      res.status(404).json({ message: "Learner not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting learner by id." });
  }
};

// Update a learner by id
const updateLearnerById = async (req, res) => {
  try {
    const learnerId = req.params.id;
    const { name, image, email, password } = req.body;
    let learner = await learnerModel.findByIdAndUpdate(learnerId, {
      name,
      image,
      email,
      password,
    });
    if (learner) {
      learner = await learnerModel.findById(learnerId);
      res
        .status(200)
        .json({ message: "Learner updated successfully.", data: learner });
    } else {
      res.status(404).json({ message: "Learner not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while updating learner by id." });
  }
};

// Delete a learner by id
const deleteLearnerById = async (req, res) => {
  try {
    const learnerId = req.params.id;
    const learner = await learnerModel.findByIdAndDelete(learnerId);
    if (learner) {
      res
        .status(200)
        .json({ message: "Learner deleted successfully.", data: learner });
    } else {
      res.status(404).json({ message: "Learner not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while deleting learner by id." });
  }
};

module.exports = {
  createLearner,
  getAllLearners,
  getLearnerById,
  updateLearnerById,
  deleteLearnerById,
};
