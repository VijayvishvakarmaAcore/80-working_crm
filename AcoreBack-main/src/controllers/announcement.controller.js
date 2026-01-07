import Announcement from "../models/announcement.model.js";

export const createAnnouncement = async (req, res) => {
  try {
    const {
      title,
      description,
      createdBy,
      department,
      expiryDate,
      attachments,
    } = req.body;

    if (!title || !description || !createdBy || !expiryDate) {
      return res.status(400).json({
        status: false,
        message: "Please provide all required fields.",
      });
    }

    const announcement = await Announcement.create({
      title,
      description,
      createdBy,
      department: department || "all",
      expiryDate,
      attachments: attachments || [],
    });

    res.status(201).json({
      status: true,
      message: "Announcement created successfully.",
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    if (!announcements) {
      return res
        .status(404)
        .json({ status: false, message: "There is no Announcement." });
    }
    res
      .status(200)
      .json({ status: true, count: announcements.length, data: announcements });
  } catch {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const updatedFields = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!announcement) {
      return res
        .status(404)
        .json({ status: false, message: "Announcement not found." });
    }

    res.status(201).json({
      status: true,
      message: "Announcement updated successfully.",
      data: announcement,
    });
  } catch (erroe) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const id = req.params.id;

    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res
        .status(404)
        .json({ status: false, message: "Announcement not found." });
    }

    res
      .status(200)
      .json({ status: true, message: "Announcement deleted successfully." });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getActiveAnnouncements = async (req, res) => {
  try {
    const today = new Date();
    const announcements = await Announcement.find({
      expiryDate: { $gte: today },
    }).sort({ createdAt: -1 });

    res
      .status(200)
      .json({ status: true, count: announcements.length, data: announcements });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
