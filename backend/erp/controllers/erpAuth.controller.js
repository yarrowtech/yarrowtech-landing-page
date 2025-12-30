// erp/controllers/erpAuth.controller.js
// import ERPClient from "../models/Client.js";
// import { signErpToken } from "../middleware/erpAuth.js";

// /* ---------------------------------------------------------
//    Convert "email:password,email2:password2" → Array
// --------------------------------------------------------- */
// function parseList(str) {
//   if (!str) return [];
//   return str.split(",").map((pair, index) => {
//     const [email, password] = pair.split(":");
//     return {
//       email,
//       password,
//       name: `User ${index + 1}`, // temporary, will override later
//     };
//   });
// }

// /* ---------------------------------------------------------
//    Load Admin, Managers, TechLeads From ENV
// --------------------------------------------------------- */
// const admin = {
//   email: process.env.ADMIN_EMAIL,
//   password: process.env.ADMIN_PASSWORD,
//   name: "Admin",
// };

// // Parse environment variables
// const managersRaw = parseList(process.env.MANAGERS);
// const techleadsRaw = parseList(process.env.TECHLEADS);

// // Add readable names automatically
// const managers = managersRaw.map((m, i) => ({
//   ...m,
//   name: `Manager ${i + 1}`,
// }));

// const techleads = techleadsRaw.map((t, i) => ({
//   ...t,
//   name: `Tech Lead ${i + 1}`,
// }));

// /* ---------------------------------------------------------
//    Login Controller
// --------------------------------------------------------- */
// export const erpLogin = async (req, res) => {
//   const { email, password } = req.body;

//   // --------------------- ADMIN ---------------------
//   if (email === admin.email && password === admin.password) {
//     return res.json({
//       token: signErpToken({ email, role: "admin", name: admin.name }),
//       role: "admin",
//       name: admin.name,
//     });
//   }

//   // --------------------- MANAGER ---------------------
//   const m = managers.find(x => x.email === email && x.password === password);
//   if (m) {
//     return res.json({
//       token: signErpToken({ email, role: "manager", name: m.name }),
//       role: "manager",
//       name: m.name,
//     });
//   }

//   // --------------------- TECH LEAD ---------------------
//   const t = techleads.find(x => x.email === email && x.password === password);
//   if (t) {
//     return res.json({
//       token: signErpToken({ email, role: "techlead", name: t.name }),
//       role: "techlead",
//       name: t.name,
//     });
//   }

//   // --------------------- CLIENT LOGIN ---------------------
//   const client = await ERPClient.findOne({ email });
//   if (!client) return res.status(404).json({ message: "Client not found" });

//   const match = await client.matchPassword(password);
//   if (!match)
//     return res.status(400).json({ message: "Wrong password" });

//   return res.json({
//     token: signErpToken({
//       id: client._id,
//       email,
//       role: "client",
//       name: client.name,
//     }),
//     role: "client",
//     name: client.name,
//   });
// };


import ERPUser from "../models/User.js";
import ERPClient from "../models/Client.js";
import { signErpToken } from "../middleware/erpAuth.js";

/* ============================================================
   ERP LOGIN
   Supports:
   - Admin
   - Manager
   - Tech Lead
   - Client
============================================================ */
export const erpLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    /* ======================================================
       ERP USERS LOGIN (Admin / Manager / TechLead)
    ====================================================== */
    const user = await ERPUser.findOne({ email: email.toLowerCase() });

    if (user) {
      if (user.status !== "active") {
        return res.status(403).json({
          message: "Account is disabled. Contact administrator.",
        });
      }

      const match = await user.matchPassword(password);
      if (!match) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      return res.json({
        token: signErpToken({
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name || user.email.split("@")[0],
        }),
        role: user.role,
        name: user.name || user.email.split("@")[0],
      });
    }

    /* ======================================================
       CLIENT LOGIN
    ====================================================== */
    const client = await ERPClient.findOne({
      email: email.toLowerCase(),
    });

    if (!client) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await client.matchPassword(password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.json({
      token: signErpToken({
        id: client._id,
        email: client.email,
        role: "client",
        name: client.name,
      }),
      role: "client",
      name: client.name,
    });

  } catch (err) {
    console.error("❌ ERP LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
