// erp/controllers/manager.controller.js
import ERPClient from "../models/Client.js";
import ERPProject from "../models/Project.js";
import { generatePassword } from "../utils/generatePassword.js";
import sendEmail from "../utils/sendEmail.js";

export const createClientAndProject = async (req, res) => {
  try {
    const {
      projectId,
      projectName,
      projectDetails,
      clientName,
      clientEmail,
      expectedDelivery,
      techLeadEmail,
    } = req.body;

    let client = await ERPClient.findOne({ email: clientEmail });
    let password;

    if (!client) {
      password = generatePassword();
      client = await ERPClient.create({
        name: clientName,
        email: clientEmail,
        password,
      });

      await sendEmail(
        clientEmail,
        "Your ERP Login",
        `Email: ${clientEmail}\nPassword: ${password}`
      );
    }

    const project = await ERPProject.create({
      projectId,
      name: projectName,
      description: projectDetails,
      client: client._id,
      clientName,
      clientEmail,
      managerEmail: req.erpUser.email,
      techLeadEmail,
      expectedDelivery,
    });

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  const projects = await ERPProject.find({ managerEmail: req.erpUser.email }).populate("client");
  res.json({ success: true, projects });
};

export const updateProject = async (req, res) => {
  const project = await ERPProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, project });
};
