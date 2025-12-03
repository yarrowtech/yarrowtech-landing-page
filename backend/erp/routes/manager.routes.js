// erp/routes/manager.routes.js
import express from "express";
import {
  createClientAndProject,
  getProjects,
  updateProject
} from "../controllers/manager.controller.js";

import { verifyErpToken } from "../middleware/erpAuth.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

router.use(verifyErpToken, verifyRoles("manager"));

router.post("/create-client-project", createClientAndProject);
router.get("/projects", getProjects);
router.put("/project/:id", updateProject);

export default router;
