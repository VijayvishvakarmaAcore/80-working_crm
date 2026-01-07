import express from "express";
import {
  punchIn,
  punchOut,
  getTodayAttendance,
  liveUpdate,
} from "../controllers/attendanceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * =========================
 * ATTENDANCE ROUTES
 * =========================
 * All routes are PROTECTED
 * Employee must be logged in
 */

// 🔹 Punch In
router.post("/punch-in", authMiddleware, punchIn);

// 🔹 Get today's attendance (resume after login / crash)
router.get("/today", authMiddleware, getTodayAttendance);

// 🔹 Live active / idle update from Electron
router.post("/live-update", authMiddleware, liveUpdate);

// 🔹 Punch Out
router.post("/punch-out", authMiddleware, punchOut);

export default router;
