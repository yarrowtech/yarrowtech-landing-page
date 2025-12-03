// erp/routes/payment.routes.js
import express from "express";
import {
  create,
  listByProject
} from "../controllers/payment.controller.js";

import { verifyErpToken } from "../middleware/erpAuth.js";

const router = express.Router();

router.post("/", verifyErpToken, create);
router.get("/project/:projectId", verifyErpToken, listByProject);

export default router;
