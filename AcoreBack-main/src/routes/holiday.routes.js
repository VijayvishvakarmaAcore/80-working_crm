import express from "express";
import {
  createHoliday,
  getAllHolidays,
  getUpcomingHolidays,
  deleteHoliday,
  updateHoliday,
} from "../controllers/holiday.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createHoliday);

router.get("/", protect, getAllHolidays);

router.get("/upcoming", protect, getUpcomingHolidays);

router.put("/holiday/:id", updateHoliday);

router.delete("/:id", protect, deleteHoliday);

export default router;
