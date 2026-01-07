import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getUpcomingCelebrations } from "../controllers/celebration.controller.js";

const router = express.Router();

router.get("/upcoming", protect, getUpcomingCelebrations);

export default router;
