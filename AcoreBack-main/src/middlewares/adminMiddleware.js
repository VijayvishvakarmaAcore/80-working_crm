import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    // Check if user exists from authMiddleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check if user is admin
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Allow admin and super-admin roles
    const allowedRoles = ["admin", "super-admin", "hr", "manager"];
    
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    // Add admin info to request
    req.admin = {
      id: user._id,
      employeeId: user.employeeId,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in admin verification",
    });
  }
};

export default adminMiddleware;