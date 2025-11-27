// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import contactRoutes from "./routes/contact.Routes.js";

// dotenv.config();
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Routes
// app.use("/api/contact", contactRoutes);

// // Root test route
// app.get("/", (req, res) => res.send("YarrowTech API running..."));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));















import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import cors from "cors";

import contactRoutes from "./routes/contact.Routes.js";
import formRoutes from "./routes/form.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import careerRoutes from "./routes/career.Routes.js";

// dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", authRoutes);
app.use("/api/career", careerRoutes);

app.get("/", (req, res) => res.send("🔥 YarrowTech API is running..."));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);



