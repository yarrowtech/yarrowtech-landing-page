// erp/controllers/techlead.controller.js
import ERPProject from "../models/Project.js";
import ERPProjectStatus from "../models/ProjectStatus.js";
import ERPMessage from "../models/Message.js";

export const getAssigned = async (req, res) => {
  const projects = await ERPProject.find({
    techLeadEmail: req.erpUser.email
  }).populate("client");

  res.json({ success: true, projects });
};

export const updateStatus = async (req, res) => {
  const { status, note } = req.body;

  const project = await ERPProject.findByIdAndUpdate(
    req.params.projectId,
    { status },
    { new: true }
  );

  await ERPProjectStatus.create({
    project: project._id,
    status,
    note,
    updatedByEmail: req.erpUser.email,
  });

  res.json({ success: true, project });
};

export const sendMessage = async (req, res) => {
  const { toEmail, text } = req.body;

  const msg = await ERPMessage.create({
    project: req.params.projectId,
    fromEmail: req.erpUser.email,
    toEmail,
    text,
  });

  res.json({ success: true, message: msg });
};
