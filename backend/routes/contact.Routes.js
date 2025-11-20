import express from "express";
import { submitContact } from "../controllers/contact.Controller.js";

const router = express.Router();

router.post("/", submitContact);

export default router;
