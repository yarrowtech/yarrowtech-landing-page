import express from "express";
import { addPayment } from "../controllers/payment.controller.js";
import { verifyErpToken } from "../middleware/erpAuth.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

router.post(
  "/",
  verifyErpToken,
  verifyRoles("manager"),
  addPayment
);

export default router;
