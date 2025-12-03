// erp/routes/techlead.routes.js
import express from "express";
import {
  getAssigned,
  updateStatus,
  sendMessage
} from "../controllers/techlead.controller.js";

import { verifyErpToken } from "../middleware/erpAuth.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

router.use(verifyErpToken, verifyRoles("techlead"));

router.get("/assigned", getAssigned);
router.post("/project/:projectId/status", updateStatus);
router.post("/project/:projectId/message", sendMessage);

export default router;
