import express from "express";
import { getEmployeePerformance } from "../controllers/adminPerformance.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Admin Employee Performance Routes
|--------------------------------------------------------------------------
| GET /api/admin/employee-performance
|
| Query Params:
|   employeeId (required)
|   range = day | week | month | year (required)
|
| Example:
|   /api/admin/employee-performance?employeeId=XXX&range=week
|--------------------------------------------------------------------------
*/

// 🔒 Admin-only route
router.get(
  "/employee-performance",
  authMiddleware,
  (req, res, next) => {
    // Extra safety: allow only admin
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next();
  },
  getEmployeePerformance
);

export default router;
