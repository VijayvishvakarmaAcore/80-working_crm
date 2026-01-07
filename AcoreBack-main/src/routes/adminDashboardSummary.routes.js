import express from "express";
import { getAdminDashboardSummary } from "../controllers/adminDashboardSummary.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/admin/dashboard-summary
router.get(
  "/dashboard-summary",
  authMiddleware,
  (req, res, next) => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next();
  },
  getAdminDashboardSummary
);

export default router;
