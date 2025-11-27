// import express from "express";
// import { authMiddleware } from "../middleware/auth.js";
// import uploadResume from "../middleware/uploadResume.js";

// import { submitCareer } from "../controllers/career.Controller.js";
// import { submitRequestDemo } from "../controllers/requestDemo.Controller.js";

// const router = express.Router();

// // Career (with resume upload)
// router.post(
//   "/career",
//   authMiddleware,
//   uploadResume.single("resume"),
//   submitCareer
// );

// // Request Demo
// router.post("/request-demo", authMiddleware, submitRequestDemo);

// export default router;
















// import express from "express";
// import { authMiddleware } from "../middleware/auth.js";
// import uploadResume from "../middleware/uploadResume.js";
// import { submitCareer } from "../controllers/career.Controller.js";
// import { submitRequestDemo } from "../controllers/requestDemo.Controller.js";

// const router = express.Router();

// router.post(
//   "/career",
//   uploadResume.single("resume"),
//   submitCareer
// );

// router.post("/request-demo", authMiddleware, submitRequestDemo);

// export default router;




import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { submitRequestDemo } from "../controllers/requestDemo.Controller.js";

const router = express.Router();

// PROTECTED → Request Demo (requires login)
router.post(
  "/request-demo",
  authMiddleware,
  submitRequestDemo
);

export default router;
