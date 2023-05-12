const auditModel = require("../models/auditModel");

// Get all audits
const getAllAudits = async (req, res) => {
  try {
    const audits = await auditModel.find();
    res.status(200).json({
      message: "All audits found successfully.",
      data: audits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while getting all audits." });
  }
};

// Create a new audit
const createAudit = async (req, res) => {
  try {
    const {
      userId,
      changeDate,
      entityName,
      objectId,
      fieldName,
      oldValue,
      newValue,
      operationType,
    } = req.body;
    const audit = new auditModel({
      userId: userId,
      changeDate: changeDate,
      entityName: entityName,
      objectId: objectId,
      fieldName: fieldName,
      oldValue: oldValue,
      newValue: newValue,
      operationType: operationType,
    });

    await audit.save();
    res
      .status(201)
      .json({ message: "Audit created successfully.", data: audit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating audit." });
  }
};

// Get an audit by id
const getAuditById = async (req, res) => {
  try {
    const auditId = req.params.id;
    const audit = await auditModel.findById(auditId);
    res.status(200).json({ message: "Audit found successfully.", data: audit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while getting audit." });
  }
};

// Update an audit by id
const updateAuditById = async (req, res) => {
  try {
    const auditId = req.params.id;
    const {
      userId,
      changeDate,
      entityName,
      objectId,
      fieldName,
      oldValue,
      newValue,
      operationType,
    } = req.body;
    const audit = await auditModel.findById(auditId);
    if (audit) {
      audit.userId = userId;
      audit.changeDate = changeDate;
      audit.entityName = entityName;
      audit.objectId = objectId;
      audit.fieldName = fieldName;
      audit.oldValue = oldValue;
      audit.newValue = newValue;
      audit.operationType = operationType;

      await audit.save();
      res.status(200).json({ message: "Audit updated successfully." });
    } else {
      res.status(404).json({ message: "Audit not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating audit." });
  }
};

// Delete an audit by id
const deleteAuditById = async (req, res) => {
  try {
    const auditId = req.params.id;
    const audit = await auditModel.findById(auditId);
    if (audit) {
      await audit.remove();
      res.status(200).json({ message: "Audit deleted successfully." });
    } else {
      res.status(404).json({ message: "Audit not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting audit." });
  }
};

module.exports = {
  getAllAudits,
  createAudit,
  getAuditById,
  updateAuditById,
  deleteAuditById,
};
