// erp/routes/erpAuth.routes.js
import express from "express";
import { erpLogin } from "../controllers/erpAuth.controller.js";

const router = express.Router();

router.post("/login", erpLogin);

export default router;
