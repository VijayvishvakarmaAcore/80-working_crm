import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAttendanceByDate,
  getAttendanceByEmpId,
  markAttendance,
  markOutTime,
  requestPartialDayLeave,
} from "../controllers/attendance.controller.js";
import { verifyGitCommit } from "../middlewares/gitHubMiddleware.js";

const router = express.Router();

router.post("/mark-in", protect, markAttendance);
router.put("/mark-out", protect, markOutTime);

router.post('/partial-leave', protect, requestPartialDayLeave);
router.get("/employee/:employeeId", protect, getAttendanceByEmpId);
router.get("/date/:date", protect, getAttendanceByDate);


export default router;




// ---------------------------------------------------------------------------------------------++---------------------------


// import express from "express";
// import { protect } from "../middlewares/authMiddleware.js";
// import {
//   getAttendanceByDate,
//   getAttendanceByEmpId,
//   markAttendance,
//   markOutTime,
//   requestPartialDayLeave,
//   updateAttendanceTracking, // Import new function if needed
// } from "../controllers/attendance.controller.js";
// import { verifyGitCommit } from "../middlewares/gitHubMiddleware.js";

// const router = express.Router();

// // Existing routes - unchanged
// router.post("/mark-in", protect, markAttendance);
// router.put("/mark-out", protect, markOutTime);
// router.post('/partial-leave', protect, requestPartialDayLeave);
// router.get("/employee/:employeeId", protect, getAttendanceByEmpId);
// router.get("/date/:date", protect, getAttendanceByDate);

// // OPTIONAL new route for manual activity update (testing/admin purposes)
// // This is safe to add as it doesn't affect existing functionality
// router.put("/update-tracking", protect, updateAttendanceTracking);

// export default router;


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





// // AcoreBack-main/src/routes/attendance.routes.js
// import express from "express";
// import { protect } from "../middlewares/authMiddleware.js";
// import {
//   getAttendanceByDate,
//   getAttendanceByEmpId,
//   markAttendance,
//   markOutTime,
//   requestPartialDayLeave,
//   updateAttendanceTracking,
//   checkPunchStatus
// } from "../controllers/attendance.controller.js";

// const router = express.Router();

// // ============================================
// // ✅ CORE ATTENDANCE ENDPOINTS (Electron/Frontend)
// // ============================================

// // 🟢 PUNCH IN
// router.post("/mark-in", protect, markAttendance);

// // 🔴 PUNCH OUT
// router.put("/mark-out", protect, markOutTime);

// // 🔍 CHECK PUNCH STATUS
// router.get("/check/:employeeId", protect, checkPunchStatus);

// // ============================================
// // ✅ TRACKING RELATED ENDPOINTS (Electron)
// // ============================================

// // 📊 UPDATE TRACKING DATA (Active/Idle seconds)
// router.put("/update-tracking", protect, updateAttendanceTracking);

// // ============================================
// // ✅ EXISTING FEATURES (MUST REMAIN WORKING)
// // ============================================

// // 📋 GET ATTENDANCE BY EMPLOYEE ID (History)
// router.get("/employee/:employeeId", protect, getAttendanceByEmpId);

// // 📅 GET ATTENDANCE BY DATE
// router.get("/date/:date", protect, getAttendanceByDate);

// // 🏖️ REQUEST PARTIAL DAY LEAVE
// router.post("/partial-leave", protect, requestPartialDayLeave);

// export default router;