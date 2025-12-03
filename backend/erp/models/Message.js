// erp/models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "ERPProject" },
  fromEmail: String,
  toEmail: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

export default mongoose.model("ERPMessage", messageSchema);
