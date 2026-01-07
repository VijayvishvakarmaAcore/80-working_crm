// AcoreBack-main/src/routes/adminAttendanceRoutes.js - COMPLETE VERSION
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getLiveAttendance,
  getTodaySummary,
  getCompletedSessions,
  getAttendanceAnalytics
} from "../controllers/adminAttendanceController.js";

const router = express.Router();

// ✅ ADMIN ATTENDANCE ROUTES
router.get("/live", protect, getLiveAttendance);
router.get("/today-summary", protect, getTodaySummary);
router.get("/completed", protect, getCompletedSessions);
router.get("/analytics", protect, getAttendanceAnalytics);

export default router;