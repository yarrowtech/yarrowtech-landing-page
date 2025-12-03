// erp/controllers/payment.controller.js
import ERPPayment from "../models/Payment.js";

export const create = async (req, res) => {
  const payment = await ERPPayment.create(req.body);
  res.json({ success: true, payment });
};

export const listByProject = async (req, res) => {
  const payments = await ERPPayment.find({ project: req.params.projectId });
  res.json({ success: true, payments });
};
