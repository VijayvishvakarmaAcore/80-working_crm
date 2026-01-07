import express from "express";
import { getAdminLiveTracking } from "../controllers/adminLiveTracking.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin Live Tracking Grid (initial load)
router.get("/live-tracking", authMiddleware, getAdminLiveTracking);

export default router;
