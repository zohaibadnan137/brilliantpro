const express = require("express");
const router = express.Router();

const material = require("../controllers/materialController");

router.get("/", (req, res) => {
  res.send("The material router is working.");
});

// Get all available materials
router.get("/all", material.getAllMaterials);

// Create a new material
router.post("/", material.createMaterial);

// Get a material by id
router.get("/:id", material.getMaterialById);

// Update a material by id
router.put("/:id", material.updateMaterialById);

// Delete a material by id
router.delete("/:id", material.deleteMaterialById);

// Get all materials for a course
router.get("/for-course/:id", material.getAllMaterialsForCourse);

module.exports = router;
