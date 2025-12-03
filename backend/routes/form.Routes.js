


import express from "express";
import { submitRequestDemo, getAllDemoRequests } from "../controllers/requestDemo.Controller.js";

import { verifyErpToken } from "../erp/middleware/erpAuth.js";
import verifyRoles from "../erp/middleware/verifyRoles.js";

const router = express.Router();

// Public → Normal users submit demo request
router.post("/demo", submitRequestDemo);

// Admin → Read all demo requests
router.get("/demo", verifyErpToken, verifyRoles("admin"), getAllDemoRequests);

export default router;
