import express from "express";
import {
  createClientAndProject,
  getProjects,
  updateProject,
  getTechLeads,
} from "../controllers/manager.controller.js";

import { verifyErpToken } from "../middleware/erpAuth.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

/* 🔥 TECH LEAD DROPDOWN */
router.get(
  "/techleads",
  verifyErpToken,
  verifyRoles("manager"),
  getTechLeads
);

router.post(
  "/create-project",
  verifyErpToken,
  verifyRoles("manager"),
  createClientAndProject
);

router.get(
  "/projects",
  verifyErpToken,
  verifyRoles("manager"),
  getProjects
);

router.put(
  "/projects/:id",
  verifyErpToken,
  verifyRoles("manager"),
  updateProject
);

export default router;
