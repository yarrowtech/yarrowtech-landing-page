// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import mongoose from "mongoose";
// // import dotenv from "dotenv";
// import cors from "cors";

// import contactRoutes from "./routes/contact.Routes.js";
// import formRoutes from "./routes/form.Routes.js";
// import authRoutes from "./routes/auth.Routes.js";
// import careerRoutes from "./routes/career.Routes.js";

// // dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));

// // DB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ DB Error:", err));

// // Routes
// app.use("/api/contact", contactRoutes);
// app.use("/api/forms", formRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/register", authRoutes);
// app.use("/api/career", careerRoutes);

// app.get("/", (req, res) => res.send("🔥 YarrowTech API is running..."));

// app.listen(process.env.PORT, () =>
//   console.log(`🚀 Server running on port ${process.env.PORT}`)
// );





import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ====== OLD WEBSITE ROUTES ======
import contactRoutes from "./routes/contact.Routes.js";
import formRoutes from "./routes/form.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import careerRoutes from "./routes/career.Routes.js";

// ====== ERP ROUTES (NEW) ======
import erpAuthRoutes from "./erp/routes/erpAuth.routes.js";
import erpManagerRoutes from "./erp/routes/manager.routes.js";
import erpTechLeadRoutes from "./erp/routes/techlead.routes.js";
import erpClientRoutes from "./erp/routes/client.routes.js";
import erpProjectRoutes from "./erp/routes/project.routes.js";
import erpPaymentRoutes from "./erp/routes/payment.routes.js";
import erpMessageRoutes from "./erp/routes/message.routes.js";
import erpAdminRoutes from "./erp/routes/admin.routes.js";

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ====== DB Connection ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ====== OLD WEBSITE ROUTES ======
app.use("/api/contact", contactRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/auth", authRoutes);        // login + google login
app.use("/api/register", authRoutes);    // register
app.use("/api/career", careerRoutes);

// ====== ERP ROUTES (Admin / Manager / TechLead / Client) ======
app.use("/api/erp/auth", erpAuthRoutes);         // login for admin/manager/techlead/client
app.use("/api/erp/manager", erpManagerRoutes);   // manager operations
app.use("/api/erp/techlead", erpTechLeadRoutes); // tech lead operations
app.use("/api/erp/client", erpClientRoutes);     // client dashboard routes
app.use("/api/erp/projects", erpProjectRoutes);  // common project routes
app.use("/api/erp/payment", erpPaymentRoutes);   // payment routes
app.use("/api/erp/message", erpMessageRoutes);   // messaging routes
app.use("/api/erp/admin", erpAdminRoutes);

// Test API
app.get("/", (req, res) => res.send("🔥 YarrowTech API with ERP is running..."));

// Start Server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
