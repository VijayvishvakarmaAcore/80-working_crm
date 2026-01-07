// import express from "express";
// import authMiddleware from "../middlewares/authMiddleware.js";
// import { pushToGithub } from "../controllers/github.controller.js";

// const router = express.Router();

// router.post("/push", authMiddleware, pushToGithub);

// export default router;




// import express from "express";
// import authMiddleware from "../middlewares/authMiddleware.js";
// import {
//   validateGithubUser,
//   checkCommitStatus,
//   pushToGithub
// } from "../controllers/github.controller.js";

// const router = express.Router();

// router.post("/validate", validateGithubUser);
// router.post("/commit-status", checkCommitStatus);
// router.post("/push", authMiddleware, pushToGithub);

// export default router;


// deepseek 


import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  validateGithubUser,
  checkCommitStatus,
  pushToGithub,
  getAllEmployeeCommits
} from "../controllers/github.controller.js";

const router = express.Router();

// Employee routes
router.post("/validate", authMiddleware, validateGithubUser);
router.post("/commit-status", authMiddleware, checkCommitStatus);
router.post("/push", authMiddleware, pushToGithub);

// Admin routes
router.get("/admin/all-commits", authMiddleware, adminMiddleware, getAllEmployeeCommits);

export default router;