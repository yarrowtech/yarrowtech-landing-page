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



















// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";

// // ====== OLD WEBSITE ROUTES ======
// import contactRoutes from "./routes/contact.Routes.js";
// import formRoutes from "./routes/form.Routes.js";
// import authRoutes from "./routes/auth.Routes.js";
// import careerRoutes from "./routes/career.Routes.js";
// import blogRoutes from "./routes/blog.routes.js";
// // ====== ERP ROUTES (NEW) ======
// import erpAuthRoutes from "./erp/routes/erpAuth.routes.js";
// import erpManagerRoutes from "./erp/routes/manager.routes.js";
// import erpTechLeadRoutes from "./erp/routes/techlead.routes.js";
// import erpClientRoutes from "./erp/routes/client.routes.js";
// import erpProjectRoutes from "./erp/routes/project.routes.js";
// import erpPaymentRoutes from "./erp/routes/payment.routes.js";
// import erpMessageRoutes from "./erp/routes/message.routes.js";
// import erpAdminRoutes from "./erp/routes/admin.routes.js";
// // import managerTechleadRoutes from "./erp/routes/managerTechlead.routes.js";

// // EXPRESS APP
// const app = express();

// // MIDDLEWARE
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));

// // ====== DB CONNECTION ======
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ DB Error:", err));

// // ====== OLD WEBSITE ROUTES ======
// app.use("/api/contact", contactRoutes);
// app.use("/api/forms", formRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/register", authRoutes);
// app.use("/api/career", careerRoutes);
// app.use("/api/blogs", blogRoutes);

// // ====== ERP ROUTES ======
// app.use("/api/erp/auth", erpAuthRoutes);
// app.use("/api/erp/manager", erpManagerRoutes);
// app.use("/api/erp/techlead", erpTechLeadRoutes);
// app.use("/api/erp/client", erpClientRoutes);
// app.use("/api/erp/projects", erpProjectRoutes);
// app.use("/api/erp/payments", erpPaymentRoutes);
// app.use("/api/erp/message", erpMessageRoutes);
// app.use("/api/erp/admin", erpAdminRoutes);

// // ✅ FIXED ROUTE — MATCHES FRONTEND
// // app.use("/api/erp/manager/techleads", managerTechleadRoutes);

// app.get("/", (req, res) => res.send("🔥 YarrowTech API with ERP is running..."));

// // =============================================================
// // SOCKET.IO SETUP
// // =============================================================
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// // Online users map
// const onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);

//   socket.on("register", (email) => {
//     onlineUsers.set(email, socket.id);
//     console.log("📌 Registered online:", email);
//   });

//   socket.on("send-message", (msg) => {
//     const receiverSocket = onlineUsers.get(msg.toEmail);
//     if (receiverSocket) {
//       io.to(receiverSocket).emit("new-message", msg);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected:", socket.id);

//     for (const [email, id] of onlineUsers.entries()) {
//       if (id === socket.id) onlineUsers.delete(email);
//     }
//   });
// });

// // START SERVER
// server.listen(process.env.PORT, () =>
//   console.log(`🚀 Server + WebSocket running on port ${process.env.PORT}`)
// );























// server.js
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

const app = express();

// If deploying behind a proxy (Render/Railway/Nginx/Cloudflare)
app.set("trust proxy", 1);

// -------------------- CORS (API) --------------------
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5173,http://localhost:3000","https://yarrowtech.vercel.app"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow non-browser clients (like curl/postman) with no origin
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// -------------------- ROUTES --------------------
app.use("/api/contact", contactRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", authRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/erp/auth", erpAuthRoutes);
app.use("/api/erp/manager", erpManagerRoutes);
app.use("/api/erp/techlead", erpTechLeadRoutes);
app.use("/api/erp/client", erpClientRoutes);
app.use("/api/erp/projects", erpProjectRoutes);
app.use("/api/erp/payments", erpPaymentRoutes);
app.use("/api/erp/message", erpMessageRoutes);
app.use("/api/erp/admin", erpAdminRoutes);

// Health check (useful for deployment monitoring)
app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "YarrowTech API + ERP",
    time: new Date().toISOString(),
  });
});

app.get("/", (req, res) => res.send("🔥 YarrowTech API with ERP is running..."));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler (including CORS errors)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err?.message || err);
  res.status(500).json({
    message: err?.message || "Internal Server Error",
  });
});

// -------------------- SOCKET.IO --------------------
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Socket CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// Online users map: email -> socketId
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("register", (email) => {
    if (!email) return;
    onlineUsers.set(String(email).toLowerCase(), socket.id);
    console.log("📌 Registered online:", email);
  });

  socket.on("send-message", (msg) => {
    try {
      const toEmail = msg?.toEmail ? String(msg.toEmail).toLowerCase() : null;
      if (!toEmail) return;

      const receiverSocket = onlineUsers.get(toEmail);
      if (receiverSocket) {
        io.to(receiverSocket).emit("new-message", msg);
      }
    } catch (e) {
      console.error("❌ send-message error:", e);
    }
  });

  socket.on("disconnect", () => {
    // Remove this socket from the map
    for (const [email, id] of onlineUsers.entries()) {
      if (id === socket.id) onlineUsers.delete(email);
    }
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// -------------------- START --------------------
const PORT = Number(process.env.PORT) || 5000;

async function start() {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI missing in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // These are safe defaults; optional
      serverSelectionTimeoutMS: 15000,
    });

    console.log("✅ MongoDB Connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server + WebSocket running on port ${PORT}`);
      console.log("✅ Allowed CORS origins:", allowedOrigins);
    });
  } catch (err) {
    console.error("❌ DB Error:", err);
    process.exit(1);
  }
}

start();
