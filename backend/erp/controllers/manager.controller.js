// erp/controllers/manager.controller.js
import ERPClient from "../models/Client.js";
import ERPProject from "../models/Project.js";
import { generatePassword } from "../utils/generatePassword.js";
import sendEmail from "../utils/sendEmail.js";

/* ============================================================
   MANAGER → Create Client (if not exists) + Create Project
============================================================ */
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

    // 1️⃣ Check if client already exists
    let client = await ERPClient.findOne({ email: clientEmail });
    let password = null;

    if (!client) {
      // Generate password for new client
      password = generatePassword();

      // Create new client
      client = await ERPClient.create({
        name: clientName,
        email: clientEmail,
        password,
      });

      // Send login credentials to client
      await sendEmail(
        clientEmail,
        "Your ERP Login",
        `
        Welcome to YarrowTech ERP!
        
        Your client account has been created.
        
        Login Credentials:
        Email: ${clientEmail}
        Password: ${password}
        `
      );
    }

    // 2️⃣ Create Project
    const project = await ERPProject.create({
      projectId,
      name: projectName,
      projectDetails,
      client: client._id,
      clientName,
      clientEmail,
      managerEmail: req.erpUser.email,  // manager email from token
      techLeadEmail,
      expectedDelivery,
      status: "pending",
      progress: 0,
    });

    res.json({
      success: true,
      message: "Client & Project created successfully",
      project,
    });

  } catch (err) {
    console.error("❌ MANAGER CREATE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ============================================================
   MANAGER → Get All Projects he manages
============================================================ */
export const getProjects = async (req, res) => {
  try {
    const projects = await ERPProject.find({
      managerEmail: req.erpUser.email,
    }).populate("client");

    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (err) {
    console.error("❌ MANAGER GET PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   MANAGER → Update Project (inline editing)
============================================================ */
export const updateProject = async (req, res) => {
  try {
    const updated = await ERPProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Project not found" });

    res.json({
      success: true,
      message: "Project updated successfully",
      project: updated,
    });

  } catch (err) {
    console.error("❌ MANAGER UPDATE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
