const materialModel = require("../models/materialModel");

// Create a new material
const createMaterial = async (req, res) => {
  try {
    const { courseId, name, type, file } = req.body;
    const material = new materialModel({
      courseId: courseId,
      name: name,
      type: type,
      file: file,
    });

    await materialModel.save();
    res
      .status(201)
      .json({ message: "Material created successfully.", material });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating material." });
  }
};

// Get all materials
const getAllMaterials = async (req, res) => {
  try {
    const materials = await materialModel.find();
    res
      .status(200)
      .json({ message: "All materials found successfully.", materials });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while getting all materials." });
  }
};

// Get all materials for a course
const getAllMaterialsForCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const materials = await materialModel.find({ courseId: courseId });
    res.status(200).json({
      message: "All materials for course found successfully.",
      materials,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while getting all materials for course.",
    });
  }
};

// Get a material by id
const getMaterialById = async (req, res) => {
  try {
    const materialId = req.params.id;
    const material = await materialModel.findById(materialId);
    res.status(200).json({ message: "Material found successfully.", material });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while getting material." });
  }
};

// Update a material by id
const updateMaterialById = async (req, res) => {
  try {
    const materialId = req.params.id;
    const { courseId, name, type, file } = req.body;
    const material = await materialModel.findByIdAndUpdate(materialId, {
      courseId: courseId,
      name: name,
      type: type,
      file: file,
    });
    res
      .status(200)
      .json({ message: "Material updated successfully.", material });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating material." });
  }
};

// Delete a material by id
const deleteMaterialById = async (req, res) => {
  try {
    const materialId = req.params.id;
    const material = await materialModel.findByIdAndDelete(materialId);
    res
      .status(200)
      .json({ message: "Material deleted successfully.", material });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting material." });
  }
};

module.exports = {
  createMaterial,
  getAllMaterials,
  getAllMaterialsForCourse,
  getMaterialById,
  updateMaterialById,
  deleteMaterialById,
};
