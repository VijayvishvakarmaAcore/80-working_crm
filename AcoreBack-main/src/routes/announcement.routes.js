import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  getActiveAnnouncements,
} from "../controllers/announcement.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new announcement (protected)
router.post("/", protect, createAnnouncement);

// Get all announcements (protected)
router.get("/", protect, getAllAnnouncements);

// Update an announcement by ID (protected)
router.put("/:id", protect, updateAnnouncement);

// Delete an announcement by ID (protected)
router.delete("/:id", protect, deleteAnnouncement);

// Get active announcements (not expired) - public or protected as needed
router.get("/active", getActiveAnnouncements);

export default router;
