


import express from "express";

import {
    deleteUser,
    employeeSelfRegister,
    getAllUsers,
    getUserByEmpId,
    loginUser,
    logoutUser,
    refreshToken,
    registerUser,
    updateUserByEmpId,
} from "../controllers/user.controller.js";
import { updateProfilePicture } from "../controllers/user.controller.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";
import { validateUser } from "../middlewares/validateUser.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// --- AUTHENTICATION & CORE USER CRUD ---
router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.get("/getall", protect, getAllUsers);
router.get("/emp/:employeeId", protect, getUserByEmpId);
router.put("/update/:employeeId", protect, updateUserByEmpId);
router.delete("/delete/:employeeId", protect, authorize("admin"), deleteUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);
router.post("/self-register", employeeSelfRegister);

// --- PROFILE PICTURE MANAGEMENT ---
router.put(
    "/profile/picture/:employeeId",
    protect,
    uploadMiddleware.single('avatar'),
    updateProfilePicture
);


export default router;