// erp/controllers/project.controller.js
import ERPProject from "../models/Project.js";

export const getAll = async (req, res) => {
  const projects = await ERPProject.find().populate("client");
  res.json({ success: true, projects });
};

export const getById = async (req, res) => {
  const project = await ERPProject.findById(req.params.id).populate("client");
  res.json({ success: true, project });
};
