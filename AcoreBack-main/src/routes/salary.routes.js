import express from "express";
import {
  createManualSalary,
  generateSalary,
  generateSalarySlip,
  getSalaryByEmpId,
  getSalaryByMonth,
  markSalaryPaid,
} from "../controllers/salary.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/generate", protect,authorize("admin"), generateSalary);
router.get("/employee/:employeeId", protect, getSalaryByEmpId);

router.get("/:employeeId/:month/:year", protect, getSalaryByMonth);
router.put("/paid/:salaryId", protect,authorize("admin"), markSalaryPaid);

router.post("/manual", protect, authorize("admin"),createManualSalary);

router.get("/slip/:salaryId", protect, generateSalarySlip);

export default router;
