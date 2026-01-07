// import express from "express";
// import {
//   startSession,
//   getTodaySession,
//   updateSession,
//   endSession,
// } from "../controllers/workSession.controller.js";

// import authMiddleware from "../middlewares/authMiddleware.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | Work Session Routes (NEW SYSTEM)
// |--------------------------------------------------------------------------
// | Purpose:
// | - Track actual working time (ACTIVE / IDLE)
// | - Apply 7h rule
// | - Calculate overtime
// | - Old attendance system remains untouched
// |--------------------------------------------------------------------------
// */

// // ▶️ Start work session (Punch In)
// router.post("/start", authMiddleware, startSession);

// // 🔄 Resume / get today session
// router.get("/today", authMiddleware, getTodaySession);

// // 🔁 Update session (ACTIVE / IDLE)
// router.post("/update", authMiddleware, updateSession);

// // ⏹ End work session (Punch Out)
// router.post("/end", authMiddleware, endSession);

// export default router;




import express from "express";
import {
  startSession,
  getTodaySession,
  updateSession,
  endSession,
} from "../controllers/workSession.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import verifyGitCommit from "../middlewares/verifyGitCommit.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Work Session Routes (NEW SYSTEM)
|--------------------------------------------------------------------------
| Purpose:
| - Track actual working time (ACTIVE / IDLE)
| - Apply 7h rule
| - Calculate overtime
| - Enforce daily GitHub code commit
| - Allow exception token if approved
|--------------------------------------------------------------------------
*/

// ▶️ Start work session (Punch In)
router.post("/start", authMiddleware, startSession);

// 🔄 Resume / get today session
router.get("/today", authMiddleware, getTodaySession);

// 🔁 Update session (ACTIVE / IDLE)
router.post("/update", authMiddleware, updateSession);

// ⏹ End work session (Punch Out) 🔒 PROTECTED
router.post(
  "/end",
  authMiddleware,
  verifyGitCommit,
  endSession
);

export default router;
