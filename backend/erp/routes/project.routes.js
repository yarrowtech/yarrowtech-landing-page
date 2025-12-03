// erp/routes/project.routes.js
import express from "express";
import {
  getAll,
  getById
} from "../controllers/project.controller.js";

import { verifyErpToken } from "../middleware/erpAuth.js";

const router = express.Router();

router.get("/", verifyErpToken, getAll);
router.get("/:id", verifyErpToken, getById);

export default router;
