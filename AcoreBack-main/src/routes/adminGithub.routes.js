import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  getDailyCommitReport,
  getEmployeeCommitHistory,
  getExceptionRequests,
  getDateRangeReport
} from "../controllers/adminGithub.controller.js";

const router = express.Router();

// Apply both middlewares to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// GitHub commit reports for admin
router.get("/commit-report", getDailyCommitReport);
router.get("/employee-commit-history", getEmployeeCommitHistory);
router.get("/exception-requests", getExceptionRequests);
// Add this route
router.get("/date-range-report", getDateRangeReport);

export default router;