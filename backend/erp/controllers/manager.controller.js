
// import ERPClient from "../models/Client.js";
// import ERPProject from "../models/Project.js";
// import ERPUser from "../models/User.js";

// import { generatePassword } from "../utils/generatePassword.js";
// import sendEmail from "../utils/sendEmail.js";

// /* ============================================================
//    MANAGER → GET TECH LEADS
// ============================================================ */
// export const getTechLeads = async (req, res) => {
//   try {
//     const techLeads = await ERPUser.find(
//       { role: "techlead", status: "active" },
//       { name: 1, email: 1 }
//     );

//     res.json({ success: true, techLeads });
//   } catch (err) {
//     console.error("❌ GET TECH LEADS ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    MANAGER → CREATE CLIENT + PROJECT
// ============================================================ */
// export const createClientAndProject = async (req, res) => {
//   try {
//     const {
//       projectId,
//       name,               // project name
//       clientName,
//       clientEmail,
//       expectedDelivery,
//       techLeadEmail,
//     } = req.body;

//     /* ================= VALIDATE TECH LEAD ================= */
//     const techLead = await ERPUser.findOne({
//       email: techLeadEmail.toLowerCase(),
//       role: "techlead",
//       status: "active",
//     });

//     if (!techLead) {
//       return res.status(400).json({
//         message: "Invalid or inactive Tech Lead selected",
//       });
//     }

//     /* ================= FIND / CREATE CLIENT ================= */
//     let client = await ERPClient.findOne({
//       email: clientEmail.toLowerCase(),
//     });

//     let generatedPassword;

//     if (!client) {
//       generatedPassword = generatePassword();

//       client = await ERPClient.create({
//         name: clientName,
//         email: clientEmail.toLowerCase(),
//         password: generatedPassword, // 🔐 hashed automatically
//         status: "active",
//         role: "client",
//       });

//       await sendEmail(
//         clientEmail,
//         "Your YarrowTech ERP Login",
//         `Welcome to YarrowTech ERP!

// Login URL: https://yourdomain.com/login

// Email: ${clientEmail}
// Password: ${generatedPassword}

// Please change your password after login.`
//       );
//     }

//     /* ================= CREATE PROJECT ================= */
//     const project = await ERPProject.create({
//       projectId,
//       name,
//       client: client._id,
//       clientName,
//       clientEmail: clientEmail.toLowerCase(),
//       managerEmail: req.erpUser.email,
//       techLeadEmail: techLead.email,
//       expectedDelivery,
//       status: "pending",
//       progress: 0,
//     });

//     res.json({
//       success: true,
//       message: "Client & Project created successfully",
//       project,
//     });
//   } catch (err) {
//     console.error("❌ CREATE PROJECT ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    MANAGER → GET PROJECTS
// ============================================================ */
// export const getProjects = async (req, res) => {
//   try {
//     const projects = await ERPProject.find({
//       managerEmail: req.erpUser.email,
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, projects });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    MANAGER → UPDATE PROJECT
// ============================================================ */
// export const updateProject = async (req, res) => {
//   try {
//     const allowed = ["name", "techLeadEmail", "expectedDelivery", "status"];
//     const updateData = {};

//     allowed.forEach((key) => {
//       if (req.body[key] !== undefined) updateData[key] = req.body[key];
//     });

//     const updated = await ERPProject.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     res.json({
//       success: true,
//       message: "Project updated",
//       project: updated,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };






import ERPClient from "../models/Client.js";
import ERPProject from "../models/Project.js";
import ERPUser from "../models/User.js";

import { generatePassword } from "../utils/generatePassword.js";
import sendEmail from "../utils/sendEmail.js";

/* ============================================================
   MANAGER → GET TECH LEADS
============================================================ */
export const getTechLeads = async (req, res) => {
  try {
    const techLeads = await ERPUser.find(
      { role: "techlead", status: "active" },
      { name: 1, email: 1 }
    );

    res.json({ success: true, techLeads });
  } catch (err) {
    console.error("❌ GET TECH LEADS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   MANAGER → CREATE CLIENT + PROJECT  ✅ FIXED
============================================================ */
export const createClientAndProject = async (req, res) => {
  try {
    const {
      projectId,
      name, // project name
      clientName,
      clientEmail,
      expectedDelivery,
      techLeadEmail,
    } = req.body;

    /* 🔐 MANAGER FROM TOKEN */
    const managerId = req.erpUser?.id || req.erpUser?._id;

    if (!managerId) {
      return res.status(401).json({
        message: "Invalid manager token",
      });
    }

    /* ================= VALIDATE TECH LEAD ================= */
    const techLead = await ERPUser.findOne({
      email: techLeadEmail.toLowerCase(),
      role: "techlead",
      status: "active",
    });

    if (!techLead) {
      return res.status(400).json({
        message: "Invalid or inactive Tech Lead selected",
      });
    }

    /* ================= FIND / CREATE CLIENT ================= */
    let client = await ERPClient.findOne({
      email: clientEmail.toLowerCase(),
    });

    let generatedPassword;

    if (!client) {
      generatedPassword = generatePassword();

      client = await ERPClient.create({
        name: clientName,
        email: clientEmail.toLowerCase(),
        password: generatedPassword, // hashed via model
        status: "active",
        role: "client",
      });

      await sendEmail(
        clientEmail,
        "Your YarrowTech ERP Login",
        `Welcome to YarrowTech ERP!

Login URL: https://yourdomain.com/erp

Email: ${clientEmail}
Password: ${generatedPassword}

Please change your password after login.`
      );
    }

    /* ================= CREATE PROJECT ================= */
    const project = await ERPProject.create({
      projectId,
      name,
      client: client._id,
      clientName,
      clientEmail: client.email,

      /* ✅ REAL RELATION */
      manager: managerId,

      /* DISPLAY / EMAIL */
      managerEmail: req.erpUser.email,
      techLeadEmail: techLead.email,

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
    console.error("❌ CREATE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   MANAGER → GET PROJECTS  ✅ FIXED
============================================================ */
export const getProjects = async (req, res) => {
  try {
    const managerId = req.erpUser?.id || req.erpUser?._id;

    if (!managerId) {
      return res.status(401).json({
        message: "Invalid manager token",
      });
    }

    const projects = await ERPProject.find({
      manager: managerId,
    })
      .populate("client", "name email status")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      projects,
    });
  } catch (err) {
    console.error("❌ GET MANAGER PROJECTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   MANAGER → UPDATE PROJECT
============================================================ */
export const updateProject = async (req, res) => {
  try {
    const allowed = [
      "name",
      "techLeadEmail",
      "expectedDelivery",
      "status",
      "progress",
      "projectDetails",
    ];

    const updateData = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    });

    const updated = await ERPProject.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      project: updated,
    });
  } catch (err) {
    console.error("❌ UPDATE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
