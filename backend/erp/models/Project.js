// erp/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectId: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  projectDetails: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "ERPClient" },
  clientName: String,
  clientEmail: String,
  managerEmail: String,
  techLeadEmail: String,
  expectedDelivery: Date,
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now }
});

// ⬇⬇ FIX for OverwriteModelError ⬇⬇
export default mongoose.models.ERPProject ||
  mongoose.model("ERPProject", projectSchema);
