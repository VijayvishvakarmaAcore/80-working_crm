// import WorkSession from "../models/WorkSession.model.js";

// const REQUIRED_WORK_SECONDS = 7 * 3600;

// /* =========================
//    HELPERS
// ========================= */

// // YYYY-MM-DD (timezone safe)
// const getTodayDate = () => {
//   return new Date().toISOString().slice(0, 10);
// };

// // Validate seconds input
// const safeSeconds = (value) => {
//   const num = Number(value);
//   if (!num || num < 0) return 0;
//   return Math.floor(num);
// };

// /* =========================
//    1️⃣ START SESSION (PUNCH IN)
// ========================= */
// export const startSession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const today = getTodayDate();

//     // 🛑 BUG FIX: Same-day double punch-in
//     const existing = await WorkSession.findOne({ employeeId, date: today });

//     if (existing) {
//       return res.json({
//         success: true,
//         message: "Session already started",
//         data: existing,
//       });
//     }

//     const session = await WorkSession.create({
//       employeeId,
//       date: today,
//       startAt: new Date(),
//       status: "WORKING",
//     });

//     return res.json({
//       success: true,
//       message: "Work session started",
//       data: session,
//     });
//   } catch (err) {
//     console.error("startSession error:", err);
//     res.status(500).json({ success: false, message: "Start session failed" });
//   }
// };

// /* =========================
//    2️⃣ GET TODAY SESSION (RESUME)
// ========================= */
// export const getTodaySession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const today = getTodayDate();

//     const session = await WorkSession.findOne({ employeeId, date: today });

//     if (!session) {
//       return res.json({ success: true, started: false });
//     }

//     return res.json({
//       success: true,
//       started: session.status === "WORKING",
//       data: session,
//     });
//   } catch (err) {
//     console.error("getTodaySession error:", err);
//     res.status(500).json({ success: false, message: "Fetch failed" });
//   }
// };

// /* =========================
//    3️⃣ UPDATE SESSION (ACTIVE / IDLE)
// ========================= */
// export const updateSession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const { state, seconds } = req.body;
//     const today = getTodayDate();

//     const session = await WorkSession.findOne({
//       employeeId,
//       date: today,
//       status: "WORKING",
//     });

//     // 🛑 BUG FIX: Update without active session
//     if (!session) {
//       return res.status(400).json({
//         success: false,
//         message: "No active work session",
//       });
//     }

//     const sec = safeSeconds(seconds);

//     // 🛑 BUG FIX: Spam / negative seconds
//     if (sec === 0) {
//       return res.json({ success: true });
//     }

//     if (state === "ACTIVE") {
//       session.workSeconds += sec;
//       session.lastActiveAt = new Date();
//     } else if (state === "IDLE") {
//       session.idleSeconds += sec;
//       session.lastIdleAt = new Date();
//     }

//     await session.save();

//     return res.json({
//       success: true,
//       data: {
//         workSeconds: session.workSeconds,
//         idleSeconds: session.idleSeconds,
//       },
//     });
//   } catch (err) {
//     console.error("updateSession error:", err);
//     res.status(500).json({ success: false, message: "Update failed" });
//   }
// };

// /* =========================
//    4️⃣ END SESSION (PUNCH OUT)
// ========================= */
// export const endSession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const today = getTodayDate();

//     const session = await WorkSession.findOne({
//       employeeId,
//       date: today,
//       status: "WORKING",
//     });

//     // 🛑 BUG FIX: Punch-out without punch-in
//     if (!session) {
//       return res.status(400).json({
//         success: false,
//         message: "No active session to end",
//       });
//     }

//     // 🛑 BUG FIX: 7h rule
//     if (session.workSeconds < REQUIRED_WORK_SECONDS) {
//       return res.status(403).json({
//         success: false,
//         message: "7 hours active work not completed",
//         remainingSeconds:
//           REQUIRED_WORK_SECONDS - session.workSeconds,
//       });
//     }

//     // ✅ Overtime calculation
//     const overtime =
//       session.workSeconds > REQUIRED_WORK_SECONDS
//         ? session.workSeconds - REQUIRED_WORK_SECONDS
//         : 0;

//     session.overtimeSeconds = overtime;
//     session.endAt = new Date();
//     session.status = "COMPLETED";

//     await session.save();

//     return res.json({
//       success: true,
//       message: "Work session completed",
//       data: {
//         workSeconds: session.workSeconds,
//         idleSeconds: session.idleSeconds,
//         overtimeSeconds: overtime,
//         startAt: session.startAt,
//         endAt: session.endAt,
//       },
//     });
//   } catch (err) {
//     console.error("endSession error:", err);
//     res.status(500).json({ success: false, message: "End session failed" });
//   }
// };






// import WorkSession from "../models/WorkSession.model.js";

// const REQUIRED_WORK_SECONDS = 7 * 3600; // 7 hours

// /* =========================
//    HELPERS
// ========================= */

// // Get today's date in YYYY-MM-DD format
// const getTodayDate = () => {
//   return new Date().toISOString().slice(0, 10);
// };

// // Validate seconds input
// const safeSeconds = (value) => {
//   const num = Number(value);
//   if (!num || num < 0) return 0;
//   return Math.floor(num);
// };

// /* =========================
//    1️⃣ START SESSION (PUNCH IN)
// ========================= */
// export const startSession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const today = getTodayDate();

//     console.log(`🟢 Starting session for employee: ${employeeId} on ${today}`);

//     // ✅ Check if session already exists
//     const existing = await WorkSession.findOne({ employeeId, date: today });

//     if (existing) {
//       console.log("⚠️ Session already exists:", existing);
      
//       // If status is COMPLETED, don't allow restart
//       if (existing.status === "COMPLETED") {
//         return res.status(400).json({
//           success: false,
//           message: "Today's work session is already completed. You can start a new session tomorrow.",
//         });
//       }

//       // Return existing session (allow resume)
//       return res.json({
//         success: true,
//         message: "Session already started",
//         data: existing,
//       });
//     }

//     // ✅ Create new session
//     const session = await WorkSession.create({
//       employeeId,
//       date: today,
//       startAt: new Date(),
//       status: "WORKING",
//       workSeconds: 0,
//       idleSeconds: 0,
//       lastActiveAt: new Date(),
//     });

//     console.log("✅ New session created:", session);

//     return res.json({
//       success: true,
//       message: "Work session started",
//       data: session,
//     });
//   } catch (err) {
//     console.error("❌ startSession error:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to start session",
//       error: err.message 
//     });
//   }
// };

// /* =========================
//    2️⃣ GET TODAY SESSION (RESUME)
// ========================= */
// export const getTodaySession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const today = getTodayDate();

//     console.log(`🔄 Fetching session for employee: ${employeeId} on ${today}`);

//     const session = await WorkSession.findOne({ employeeId, date: today });

//     if (!session) {
//       console.log("⚪ No session found");
//       return res.json({ 
//         success: true, 
//         started: false 
//       });
//     }

//     // ✅ If session is COMPLETED, treat as not started
//     if (session.status === "COMPLETED") {
//       console.log("✅ Session completed earlier today");
//       return res.json({ 
//         success: true, 
//         started: false,
//         message: "Today's session already completed"
//       });
//     }

//     console.log("🔄 Active session found:", {
//       status: session.status,
//       workSeconds: session.workSeconds,
//       idleSeconds: session.idleSeconds,
//     });

//     return res.json({
//       success: true,
//       started: true,
//       data: session,
//     });
//   } catch (err) {
//     console.error("❌ getTodaySession error:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch session",
//       error: err.message 
//     });
//   }
// };

// /* =========================
//    3️⃣ UPDATE SESSION (ACTIVE / IDLE)
// ========================= */
// export const updateSession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const { state, seconds } = req.body;
//     const today = getTodayDate();

//     console.log(`📊 Update request: ${state} - ${seconds}s for ${employeeId}`);

//     const session = await WorkSession.findOne({
//       employeeId,
//       date: today,
//       status: "WORKING",
//     });

//     // ✅ No active session
//     if (!session) {
//       console.log("❌ No active session found");
//       return res.status(400).json({
//         success: false,
//         message: "No active work session",
//       });
//     }

//     const sec = safeSeconds(seconds);

//     // ✅ Ignore zero or invalid seconds
//     if (sec === 0) {
//       return res.json({ 
//         success: true,
//         data: {
//           workSeconds: session.workSeconds,
//           idleSeconds: session.idleSeconds,
//         }
//       });
//     }

//     // ✅ Update work or idle seconds
//     if (state === "ACTIVE") {
//       session.workSeconds += sec;
//       session.lastActiveAt = new Date();
//       console.log(`✅ Added ${sec}s to ACTIVE (total: ${session.workSeconds}s)`);
//     } else if (state === "IDLE") {
//       session.idleSeconds += sec;
//       session.lastIdleAt = new Date();
//       console.log(`✅ Added ${sec}s to IDLE (total: ${session.idleSeconds}s)`);
//     }

//     await session.save();

//     return res.json({
//       success: true,
//       data: {
//         workSeconds: session.workSeconds,
//         idleSeconds: session.idleSeconds,
//       },
//     });
//   } catch (err) {
//     console.error("❌ updateSession error:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to update session",
//       error: err.message 
//     });
//   }
// };

// /* =========================
//    4️⃣ END SESSION (PUNCH OUT)
// ========================= */
// export const endSession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const today = getTodayDate();

//     console.log(`🔴 End session request for ${employeeId} on ${today}`);

//     const session = await WorkSession.findOne({
//       employeeId,
//       date: today,
//       status: "WORKING",
//     });

//     // ✅ No active session
//     if (!session) {
//       console.log("❌ No active session to end");
//       return res.status(400).json({
//         success: false,
//         message: "No active session to end",
//       });
//     }

//     // ✅ Check 7-hour requirement
//     console.log(`⏱️ Work seconds: ${session.workSeconds} / ${REQUIRED_WORK_SECONDS}`);

//     if (session.workSeconds < REQUIRED_WORK_SECONDS) {
//       const remainingSeconds = REQUIRED_WORK_SECONDS - session.workSeconds;
//       const remainingHours = (remainingSeconds / 3600).toFixed(2);
      
//       console.log(`❌ 7-hour requirement not met (${remainingHours}h remaining)`);
      
//       return res.status(403).json({
//         success: false,
//         message: `Cannot punch out. Complete ${remainingHours} more hours.`,
//         remainingSeconds,
//       });
//     }

//     // ✅ Calculate overtime
//     const overtime =
//       session.workSeconds > REQUIRED_WORK_SECONDS
//         ? session.workSeconds - REQUIRED_WORK_SECONDS
//         : 0;

//     session.overtimeSeconds = overtime;
//     session.endAt = new Date();
//     session.status = "COMPLETED";

//     await session.save();

//     console.log("✅ Session completed:", {
//       workSeconds: session.workSeconds,
//       overtimeSeconds: overtime,
//     });

//     return res.json({
//       success: true,
//       message: "Work session completed successfully",
//       data: {
//         workSeconds: session.workSeconds,
//         idleSeconds: session.idleSeconds,
//         overtimeSeconds: overtime,
//         startAt: session.startAt,
//         endAt: session.endAt,
//       },
//     });
//   } catch (err) {
//     console.error("❌ endSession error:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to end session",
//       error: err.message 
//     });
//   }
// };



// ##########################################################################################################################



import WorkSession from "../models/WorkSession.model.js";
import User from "../models/user.model.js";
import { io } from "../app.js";
import Attendance from "../models/attendance.model.js";


const REQUIRED_WORK_SECONDS = 7 * 3600;

/* =========================
   HELPERS
========================= */

// YYYY-MM-DD (timezone safe)
const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10);
};

// Validate seconds input
const safeSeconds = (value) => {
  const num = Number(value);
  if (!num || num < 0) return 0;
  return Math.floor(num);
};

/* =========================
   1️⃣ START SESSION (PUNCH IN)
========================= */
export const startSession = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    // Check existing session
    let session = await WorkSession.findOne({ employeeId, date: today });

    // Fetch employee (for admin grid name)
    const user = await User.findById(employeeId).select("name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // If session already exists
    if (session) {
      // If already completed, block re-start
      if (session.status === "COMPLETED") {
        return res.status(400).json({
          success: false,
          message: "Today's session already completed",
        });
      }

      // Resume existing session
      return res.json({
        success: true,
        message: "Session already started",
        data: session,
      });
    }

    // Create new session
    session = await WorkSession.create({
      employeeId,
      date: today,
      startAt: new Date(),
      status: "WORKING",
      workSeconds: 0,
      idleSeconds: 0,
      lastActiveAt: new Date(),
    });

    // 🔥 ADMIN LIVE ADD (WITH NAME)
    io.emit("admin-live-add", {
      employeeId,
      name: user.name,
      email: user.email,
      status: "ACTIVE",
      startAt: session.startAt,
      workSeconds: 0,
      idleSeconds: 0,
    });

    return res.json({
      success: true,
      message: "Work session started",
      data: session,
    });
  } catch (err) {
    console.error("❌ startSession error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to start session",
    });
  }
};

/* =========================
   2️⃣ GET TODAY SESSION
========================= */
export const getTodaySession = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    const session = await WorkSession.findOne({ employeeId, date: today });

    if (!session || session.status === "COMPLETED") {
      return res.json({
        success: true,
        started: false,
      });
    }

    return res.json({
      success: true,
      started: true,
      data: session,
    });
  } catch (err) {
    console.error("❌ getTodaySession error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch session",
    });
  }
};

/* =========================
   3️⃣ UPDATE SESSION (ACTIVE / IDLE)
========================= */
export const updateSession = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { state, seconds } = req.body;
    const today = getTodayDate();

    const session = await WorkSession.findOne({
      employeeId,
      date: today,
      status: "WORKING",
    });

    if (!session) {
      return res.status(400).json({
        success: false,
        message: "No active work session",
      });
    }

    const sec = safeSeconds(seconds);
    if (sec === 0) {
      return res.json({ success: true });
    }

    if (state === "ACTIVE") {
      session.workSeconds += sec;
      session.lastActiveAt = new Date();
    } else if (state === "IDLE") {
      session.idleSeconds += sec;
      session.lastIdleAt = new Date();
    }

    await session.save();

    // 🔄 ADMIN LIVE UPDATE
    io.emit("admin-live-update", {
      employeeId,
      status: state, // ACTIVE | IDLE
      workSeconds: session.workSeconds,
      idleSeconds: session.idleSeconds,
    });

    return res.json({
      success: true,
      data: {
        workSeconds: session.workSeconds,
        idleSeconds: session.idleSeconds,
      },
    });
  } catch (err) {
    console.error("❌ updateSession error:", err);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

/* =========================
   4️⃣ END SESSION (PUNCH OUT)
========================= */
// export const endSession = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     const today = getTodayDate();

//     const session = await WorkSession.findOne({
//       employeeId,
//       date: today,
//       status: "WORKING",
//     });

//     if (!session) {
//       return res.status(400).json({
//         success: false,
//         message: "No active session to end",
//       });
//     }


// // 🔍 Check Early Leave Approval
// const todayDate = new Date().toISOString().slice(0, 10);

// const attendance = await Attendance.findOne({
//   employeeId: employeeId,   // same user
//   date: todayDate,
//   isPartialLeave: true
// });

// // If early leave approved → allow punch out
// const isEarlyLeaveApproved = !!attendance;





//     // 7 hour rule
//     // if (session.workSeconds < REQUIRED_WORK_SECONDS) {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: "7 hours active work not completed",
//     //     remainingSeconds:
//     //       REQUIRED_WORK_SECONDS - session.workSeconds,
//     //   });
//     // }



//     if (
//   session.workSeconds < REQUIRED_WORK_SECONDS &&
//   !isEarlyLeaveApproved
// ) {
//   return res.status(403).json({
//     success: false,
//     message: "7 hours active work not completed",
//     reason: "NO_EARLY_LEAVE_APPROVAL"
//   });
// }



// io.emit("admin-live-update", {
//   employeeId,
//   status: "COMPLETED",
//   reason: "EARLY_LEAVE_APPROVED"
// });


//     const overtime =
//       session.workSeconds > REQUIRED_WORK_SECONDS
//         ? session.workSeconds - REQUIRED_WORK_SECONDS
//         : 0;

//     session.overtimeSeconds = overtime;
//     session.endAt = new Date();
//     session.status = "COMPLETED";

//     await session.save();

//     // 🔴 ADMIN STATUS UPDATE (REMOVE ❌ NAHI)
//     io.emit("admin-live-update", {
//       employeeId,
//       status: "COMPLETED",
//       workSeconds: session.workSeconds,
//       idleSeconds: session.idleSeconds,
//       endAt: session.endAt,
//     });

//     return res.json({
//       success: true,
//       message: "Work session completed",
//       data: {
//         workSeconds: session.workSeconds,
//         idleSeconds: session.idleSeconds,
//         overtimeSeconds: overtime,
//         startAt: session.startAt,
//         endAt: session.endAt,
//       },
//     });
//   } catch (err) {
//     console.error("❌ endSession error:", err);
//     res.status(500).json({
//       success: false,
//       message: "End session failed",
//     });
//   }
// };



export const endSession = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    const session = await WorkSession.findOne({
      employeeId,
      date: today,
      status: "WORKING",
    });

    if (!session) {
      return res.status(400).json({
        success: false,
        message: "No active session to end",
      });
    }

    // 🔍 Early Leave Check (Date-safe)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      employeeId,
      date: { $gte: startOfDay, $lte: endOfDay },
      isPartialLeave: true,
    });

    const isEarlyLeaveApproved = !!attendance;

    // ⛔ 7 hour rule (bypass only if early leave)
    if (
      session.workSeconds < REQUIRED_WORK_SECONDS &&
      !isEarlyLeaveApproved
    ) {
      return res.status(403).json({
        success: false,
        message: "7 hours active work not completed",
        reason: "NO_EARLY_LEAVE_APPROVAL",
      });
    }

    // ✅ Complete session
    const overtime =
      session.workSeconds > REQUIRED_WORK_SECONDS
        ? session.workSeconds - REQUIRED_WORK_SECONDS
        : 0;

    session.overtimeSeconds = overtime;
    session.endAt = new Date();
    session.status = "COMPLETED";

    await session.save();

    // 🔴 SINGLE SOCKET UPDATE (FINAL)
    io.emit("admin-live-update", {
      employeeId,
      status: "COMPLETED",
      workSeconds: session.workSeconds,
      idleSeconds: session.idleSeconds,
      endAt: session.endAt,
      reason: isEarlyLeaveApproved ? "EARLY_LEAVE_APPROVED" : null,
    });

    return res.json({
      success: true,
      message: "Work session completed",
      data: session,
    });
  } catch (err) {
    console.error("❌ endSession error:", err);
    res.status(500).json({
      success: false,
      message: "End session failed",
    });
  }
};
