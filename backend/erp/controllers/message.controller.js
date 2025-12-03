// erp/controllers/message.controller.js
import ERPMessage from "../models/Message.js";

export const byProject = async (req, res) => {
  const messages = await ERPMessage.find({
    project: req.params.projectId
  }).sort("createdAt");

  res.json({ success: true, messages });
};
