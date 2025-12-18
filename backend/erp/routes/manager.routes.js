// erp/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectId: { type: String, unique: true },
  name: { type: String, required: true },  // ✔ FIXED
  description: { type: String },
  projectDetails: { type: String },        // optional – you used this field
  client: { type: mongoose.Schema.Types.ObjectId, ref: "ERPClient" },
  clientName: { type: String },
  clientEmail: { type: String },
  managerEmail: { type: String },
  techLeadEmail: { type: String },
  expectedDelivery: { type: Date },
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ERPProject", projectSchema);
