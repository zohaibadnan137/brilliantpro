const express = require("express");
const router = express.Router();

const auditController = require("../controllers/auditController");

router.get("/", (req, res) => {
  res.send("The audit router is working.");
});

// Get all audits
router.get("/all", auditController.getAllAudits);

// Create a new audit
router.post("/", auditController.createAudit);

// Get an audit by id
router.get("/:id", auditController.getAuditById);

// Update an audit by id
router.put("/:id", auditController.updateAuditById);

// Delete an audit by id
router.delete("/:id", auditController.deleteAuditById);

module.exports = router;
