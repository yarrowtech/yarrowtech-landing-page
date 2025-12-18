// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// // ====== OLD WEBSITE ROUTES ======
// import contactRoutes from "./routes/contact.Routes.js";
// import formRoutes from "./routes/form.Routes.js";
// import authRoutes from "./routes/auth.Routes.js";
// import careerRoutes from "./routes/career.Routes.js";

// // ====== ERP ROUTES (NEW) ======
// import erpAuthRoutes from "./erp/routes/erpAuth.routes.js";
// import erpManagerRoutes from "./erp/routes/manager.routes.js";
// import erpTechLeadRoutes from "./erp/routes/techlead.routes.js";
// import erpClientRoutes from "./erp/routes/client.routes.js";
// import erpProjectRoutes from "./erp/routes/project.routes.js";
// import erpPaymentRoutes from "./erp/routes/payment.routes.js";
// import erpMessageRoutes from "./erp/routes/message.routes.js";
// import erpAdminRoutes from "./erp/routes/admin.routes.js";

// // Express App
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));

// // ====== DB Connection ======
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ DB Error:", err));

// // ====== OLD WEBSITE ROUTES ======
// app.use("/api/contact", contactRoutes);
// app.use("/api/forms", formRoutes);
// app.use("/api/auth", authRoutes);        // login + google login
// app.use("/api/register", authRoutes);    // register
// app.use("/api/career", careerRoutes);

// // ====== ERP ROUTES (Admin / Manager / TechLead / Client) ======
// app.use("/api/erp/auth", erpAuthRoutes);         // login for admin/manager/techlead/client
// app.use("/api/erp/manager", erpManagerRoutes);   // manager operations
// app.use("/api/erp/techlead", erpTechLeadRoutes); // tech lead operations
// app.use("/api/erp/client", erpClientRoutes);     // client dashboard routes
// app.use("/api/erp/projects", erpProjectRoutes);  // common project routes
// app.use("/api/erp/payment", erpPaymentRoutes);   // payment routes
// app.use("/api/erp/message", erpMessageRoutes);   // messaging routes
// app.use("/api/erp/admin", erpAdminRoutes);

// // Test API
// app.get("/", (req, res) => res.send("🔥 YarrowTech API with ERP is running..."));

// // Start Server
// app.listen(process.env.PORT, () =>
//   console.log(`🚀 Server running on port ${process.env.PORT}`)
// );






import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// ====== OLD WEBSITE ROUTES ======
import contactRoutes from "./routes/contact.Routes.js";
import formRoutes from "./routes/form.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import careerRoutes from "./routes/career.Routes.js";
import blogRoutes from "./routes/blog.routes.js";
// ====== ERP ROUTES (NEW) ======
import erpAuthRoutes from "./erp/routes/erpAuth.routes.js";
import erpManagerRoutes from "./erp/routes/manager.routes.js";
import erpTechLeadRoutes from "./erp/routes/techlead.routes.js";
import erpClientRoutes from "./erp/routes/client.routes.js";
import erpProjectRoutes from "./erp/routes/project.routes.js";
import erpPaymentRoutes from "./erp/routes/payment.routes.js";
import erpMessageRoutes from "./erp/routes/message.routes.js";
import erpAdminRoutes from "./erp/routes/admin.routes.js";
import managerTechleadRoutes from "./erp/routes/managerTechlead.routes.js";

// EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ====== DB CONNECTION ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ====== OLD WEBSITE ROUTES ======
app.use("/api/contact", contactRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", authRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/blogs", blogRoutes);

// ====== ERP ROUTES ======
app.use("/api/erp/auth", erpAuthRoutes);
app.use("/api/erp/manager", erpManagerRoutes);
app.use("/api/erp/techlead", erpTechLeadRoutes);
app.use("/api/erp/client", erpClientRoutes);
app.use("/api/erp/projects", erpProjectRoutes);
app.use("/api/erp/payment", erpPaymentRoutes);
app.use("/api/erp/message", erpMessageRoutes);
app.use("/api/erp/admin", erpAdminRoutes);

// ✅ FIXED ROUTE — MATCHES FRONTEND
app.use("/api/erp/manager/techleads", managerTechleadRoutes);

app.get("/", (req, res) => res.send("🔥 YarrowTech API with ERP is running..."));

// =============================================================
// SOCKET.IO SETUP
// =============================================================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Online users map
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("register", (email) => {
    onlineUsers.set(email, socket.id);
    console.log("📌 Registered online:", email);
  });

  socket.on("send-message", (msg) => {
    const receiverSocket = onlineUsers.get(msg.toEmail);
    if (receiverSocket) {
      io.to(receiverSocket).emit("new-message", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);

    for (const [email, id] of onlineUsers.entries()) {
      if (id === socket.id) onlineUsers.delete(email);
    }
  });
});

// START SERVER
server.listen(process.env.PORT, () =>
  console.log(`🚀 Server + WebSocket running on port ${process.env.PORT}`)
);
