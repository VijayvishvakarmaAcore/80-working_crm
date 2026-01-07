// // controllers/attendanceController.js
// const Attendance = require('../models/Attendance');
// const Employee = require('../models/Employee');

// class AttendanceController {
  
//   // ✅ PUNCH IN - Backend creates record
//   async punchIn(req, res) {
//     try {
//       const { employeeId, location } = req.body;
      
//       // Check if already punched in
//       const today = new Date().toISOString().split('T')[0];
//       const existing = await Attendance.findOne({
//         employeeId,
//         date: today,
//         punchOutTime: { $exists: false }
//       });
      
//       if (existing) {
//         return res.status(400).json({
//           success: false,
//           message: 'Already punched in today'
//         });
//       }
      
//       // Check location (must be within office)
//       const isWithinOffice = this.checkOfficeLocation(location);
//       if (!isWithinOffice) {
//         return res.status(400).json({
//           success: false,
//           message: 'You must be at office to punch in'
//         });
//       }
      
//       // Create new attendance record
//       const attendance = new Attendance({
//         employeeId,
//         employeeName: await this.getEmployeeName(employeeId),
//         punchInTime: new Date(),
//         punchInLocation: location,
//         date: today,
//         day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
//         status: 'active',
//         totalActiveSeconds: 0,
//         breakSeconds: 0,
//         effectiveSeconds: 0,
//         activityLogs: [],
//         lastActivityTime: new Date()
//       });
      
//       await attendance.save();
      
//       // Start activity monitoring timer in backend
//       this.startActivityMonitor(attendance._id);
      
//       res.status(201).json({
//         success: true,
//         message: 'Punched in successfully',
//         data: {
//           attendanceId: attendance._id,
//           punchInTime: attendance.punchInTime,
//           requiredHours: 7
//         }
//       });
      
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   }
  
//   // ✅ ACTIVITY UPDATE - Backend calculates time
//   async recordActivity(req, res) {
//     try {
//       const { attendanceId } = req.params;
//       const { timestamp, isActive, systemIdleTime } = req.body;
      
//       const attendance = await Attendance.findById(attendanceId);
//       if (!attendance) {
//         return res.status(404).json({ error: 'Attendance not found' });
//       }
      
//       const now = new Date(timestamp);
//       const lastUpdate = new Date(attendance.lastActivityTime);
//       const secondsSinceLast = Math.floor((now - lastUpdate) / 1000);
      
//       // ✅ BACKEND LOGIC: Calculate active/break time
//       if (isActive && systemIdleTime < 5) {
//         // User is active
//         attendance.totalActiveSeconds += secondsSinceLast;
//         attendance.effectiveSeconds = attendance.totalActiveSeconds - attendance.breakSeconds;
//       } else {
//         // User is idle/break
//         attendance.breakSeconds += secondsSinceLast;
//       }
      
//       // ✅ BACKEND LOGIC: Check if 7 hours completed
//       const effectiveHours = attendance.effectiveSeconds / 3600;
//       attendance.canPunchOut = effectiveHours >= 7;
      
//       // Update activity log
//       attendance.activityLogs.push({
//         timestamp: now,
//         isActive,
//         systemIdleTime,
//         duration: secondsSinceLast
//       });
      
//       attendance.lastActivityTime = now;
//       attendance.updatedAt = now;
      
//       await attendance.save();
      
//       // Send WebSocket update if needed
//       this.sendLiveUpdate(attendance);
      
//       res.json({
//         success: true,
//         data: {
//           totalSeconds: attendance.effectiveSeconds,
//           activeHours: (attendance.totalActiveSeconds / 3600).toFixed(2),
//           breakHours: (attendance.breakSeconds / 3600).toFixed(2),
//           canPunchOut: attendance.canPunchOut,
//           effectiveHours: effectiveHours.toFixed(2),
//           requiredHours: 7
//         }
//       });
      
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   }
  
//   // ✅ PUNCH OUT - Backend verifies 7 hours
//   async punchOut(req, res) {
//     try {
//       const { attendanceId, employeeId, location } = req.body;
      
//       const attendance = await Attendance.findById(attendanceId);
//       if (!attendance || attendance.employeeId !== employeeId) {
//         return res.status(404).json({ error: 'Invalid attendance' });
//       }
      
//       // ✅ BACKEND VERIFICATION: Check minimum 7 hours
//       const effectiveHours = attendance.effectiveSeconds / 3600;
      
//       if (effectiveHours < 7) {
//         // Check if early leave is approved
//         const earlyLeave = await this.checkEarlyLeave(employeeId);
//         if (!earlyLeave.approved) {
//           return res.status(400).json({
//             success: false,
//             message: `Minimum 7 hours required. You have ${effectiveHours.toFixed(2)} hours. Request early leave from admin.`
//           });
//         }
//       }
      
//       // Update attendance
//       attendance.punchOutTime = new Date();
//       attendance.punchOutLocation = location;
//       attendance.status = effectiveHours >= 7 ? 'completed' : 'early_left';
//       attendance.totalHours = effectiveHours;
//       attendance.productivityScore = this.calculateProductivity(attendance);
      
//       await attendance.save();
      
//       // Stop activity monitor
//       this.stopActivityMonitor(attendanceId);
      
//       // Update employee stats
//       await this.updateEmployeeStats(employeeId, attendance);
      
//       res.json({
//         success: true,
//         message: effectiveHours >= 7 
//           ? 'Punched out successfully' 
//           : 'Punched out with early leave',
//         data: {
//           totalHours: effectiveHours.toFixed(2),
//           breakHours: (attendance.breakSeconds / 3600).toFixed(2),
//           status: attendance.status,
//           productivity: attendance.productivityScore,
//           punchInTime: attendance.punchInTime,
//           punchOutTime: attendance.punchOutTime
//         }
//       });
      
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   }
  
//   // ✅ GET LIVE STATUS - Frontend gets data from backend
//   async getLiveStatus(req, res) {
//     try {
//       const { attendanceId } = req.params;
      
//       const attendance = await Attendance.findById(attendanceId);
//       if (!attendance) {
//         return res.status(404).json({ error: 'Attendance not found' });
//       }
      
//       const effectiveHours = attendance.effectiveSeconds / 3600;
//       const activeHours = attendance.totalActiveSeconds / 3600;
//       const breakHours = attendance.breakSeconds / 3600;
      
//       // Get last activity
//       const lastActivity = attendance.activityLogs[attendance.activityLogs.length - 1];
      
//       res.json({
//         isPunchedIn: true,
//         attendanceId: attendance._id,
//         workingHours: effectiveHours,
//         activeHours: activeHours,
//         breakHours: breakHours,
//         workingTime: this.formatTime(attendance.effectiveSeconds),
//         canLogout: attendance.canPunchOut,
//         isIdle: lastActivity ? !lastActivity.isActive : false,
//         currentApp: lastActivity?.application || 'Unknown',
//         progressPercentage: Math.min((effectiveHours / 7) * 100, 100),
//         requiredHours: 7,
//         remainingHours: Math.max(7 - effectiveHours, 0),
//         lastUpdated: attendance.updatedAt
//       });
      
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   }
  
//   // ✅ BACKEND ACTIVITY MONITOR (Runs on server)
//   startActivityMonitor(attendanceId) {
//     // This runs on server, keeps checking even if Electron is closed
//     const interval = setInterval(async () => {
//       try {
//         const attendance = await Attendance.findById(attendanceId);
//         if (!attendance || attendance.punchOutTime) {
//           clearInterval(interval);
//           return;
//         }
        
//         // Auto-calculate time since last activity
//         const now = new Date();
//         const lastUpdate = new Date(attendance.lastActivityTime);
//         const secondsSinceLast = Math.floor((now - lastUpdate) / 1000);
        
//         // If no activity for 30 minutes, mark as idle
//         if (secondsSinceLast > 1800) { // 30 minutes
//           attendance.breakSeconds += secondsSinceLast;
//           attendance.lastActivityTime = now;
//           await attendance.save();
//         }
        
//       } catch (error) {
//         console.error('Activity monitor error:', error);
//       }
//     }, 60000); // Check every minute
    
//     // Store interval reference
//     this.activityMonitors[attendanceId] = interval;
//   }
  
//   stopActivityMonitor(attendanceId) {
//     if (this.activityMonitors[attendanceId]) {
//       clearInterval(this.activityMonitors[attendanceId]);
//       delete this.activityMonitors[attendanceId];
//     }
//   }
  
//   // ✅ HELPER FUNCTIONS
//   checkOfficeLocation(location) {
//     const OFFICE_LAT = 22.7494444;
//     const OFFICE_LNG = 75.8991667;
//     const ALLOWED_RADIUS = 100; // meters
    
//     const distance = this.calculateDistance(
//       location.latitude,
//       location.longitude,
//       OFFICE_LAT,
//       OFFICE_LNG
//     );
    
//     return distance <= ALLOWED_RADIUS;
//   }
  
//   calculateDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371000; // Earth radius in meters
//     const φ1 = lat1 * Math.PI / 180;
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;
    
//     const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ/2) * Math.sin(Δλ/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
//     return R * c;
//   }
  
//   formatTime(seconds) {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs}h ${mins}m ${secs}s`;
//   }
  
//   calculateProductivity(attendance) {
//     const totalSeconds = attendance.totalActiveSeconds + attendance.breakSeconds;
//     if (totalSeconds === 0) return 0;
    
//     const productivity = (attendance.totalActiveSeconds / totalSeconds) * 100;
//     return Math.min(Math.round(productivity), 100);
//   }
  
//   async checkEarlyLeave(employeeId) {
//     const today = new Date().toISOString().split('T')[0];
//     const earlyLeave = await EarlyLeave.findOne({
//       employeeId,
//       date: today,
//       status: 'approved'
//     });
    
//     return earlyLeave || { approved: false };
//   }
  
//   async updateEmployeeStats(employeeId, attendance) {
//     const employee = await Employee.findOne({ employeeId });
//     if (employee) {
//       employee.totalWorkingDays = (employee.totalWorkingDays || 0) + 1;
//       employee.totalWorkingHours = (employee.totalWorkingHours || 0) + 
//         (attendance.effectiveSeconds / 3600);
//       employee.averageProductivity = this.calculateAverageProductivity(employee, attendance);
//       await employee.save();
//     }
//   }
  
//   sendLiveUpdate(attendance) {
//     // Send to WebSocket for admin dashboard
//     if (this.io) {
//       this.io.emit('attendance-update', {
//         employeeId: attendance.employeeId,
//         name: attendance.employeeName,
//         workingHours: (attendance.effectiveSeconds / 3600).toFixed(2),
//         status: attendance.status,
//         lastActivity: attendance.lastActivityTime,
//         canPunchOut: attendance.canPunchOut
//       });
//     }
//   }
// }

// module.exports = new AttendanceController();






import Attendance from "../models/attendance.model.js";

const REQUIRED_ACTIVE_SECONDS = 7 * 3600;

/**
 * Helper: get today date string (YYYY-MM-DD)
 */
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * =========================
 * 1️⃣ PUNCH IN
 * =========================
 */
export const punchIn = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    // 🔒 Prevent duplicate punch-in for same day
    const existing = await Attendance.findOne({
      employeeId,
      date: today,
    });

    if (existing) {
      if (existing.status === "COMPLETED") {
        return res.status(400).json({
          success: false,
          message: "Attendance already completed for today",
        });
      }

      // Resume case (already punched in)
      return res.json({
        success: true,
        message: "Attendance already started",
        data: existing,
      });
    }

    // ✅ Create new attendance
    const attendance = await Attendance.create({
      employeeId,
      date: today,
      punchInTime: new Date(),
      totalActiveSeconds: 0,
      totalIdleSeconds: 0,
      status: "PUNCHED_IN",
      punchSource: "desktop",
    });

    return res.json({
      success: true,
      message: "Punch in successful",
      data: attendance,
    });
  } catch (error) {
    console.error("Punch In Error:", error);
    res.status(500).json({
      success: false,
      message: "Punch in failed",
    });
  }
};

/**
 * =========================
 * 2️⃣ GET TODAY ATTENDANCE (RESUME)
 * =========================
 */
export const getTodayAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    const attendance = await Attendance.findOne({
      employeeId,
      date: today,
    });

    if (!attendance) {
      return res.json({
        success: true,
        punchedIn: false,
      });
    }

    return res.json({
      success: true,
      punchedIn: attendance.status === "PUNCHED_IN",
      data: attendance,
    });
  } catch (error) {
    console.error("Get Today Attendance Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};

/**
 * =========================
 * 3️⃣ LIVE UPDATE (ACTIVE / IDLE)
 * =========================
 * payload:
 * {
 *   status: "ACTIVE" | "IDLE",
 *   seconds: number
 * }
 */
export const liveUpdate = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { status, seconds } = req.body;
    const today = getTodayDate();

    const attendance = await Attendance.findOne({
      employeeId,
      date: today,
      status: "PUNCHED_IN",
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: "No active attendance found",
      });
    }

    if (status === "ACTIVE") {
      attendance.totalActiveSeconds += Number(seconds || 0);
      attendance.lastActiveAt = new Date();
    }

    if (status === "IDLE") {
      attendance.totalIdleSeconds += Number(seconds || 0);
      attendance.lastIdleAt = new Date();
    }

    await attendance.save();

    return res.json({
      success: true,
      data: {
        totalActiveSeconds: attendance.totalActiveSeconds,
        totalIdleSeconds: attendance.totalIdleSeconds,
      },
    });
  } catch (error) {
    console.error("Live Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Live update failed",
    });
  }
};

/**
 * =========================
 * 4️⃣ PUNCH OUT
 * =========================
 */
export const punchOut = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    const attendance = await Attendance.findOne({
      employeeId,
      date: today,
      status: "PUNCHED_IN",
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: "No active attendance found",
      });
    }

    // 🔒 7 HOURS RULE (unless partial leave approved)
    if (!attendance.partialLeaveApproved) {
      if (attendance.totalActiveSeconds < REQUIRED_ACTIVE_SECONDS) {
        const remaining =
          REQUIRED_ACTIVE_SECONDS - attendance.totalActiveSeconds;

        return res.status(403).json({
          success: false,
          message: "7 hours active work not completed",
          remainingSeconds: remaining,
        });
      }
    }

    // ✅ Calculate overtime
    const overtimeSeconds = Math.max(
      0,
      attendance.totalActiveSeconds - REQUIRED_ACTIVE_SECONDS
    );

    attendance.overtimeSeconds = overtimeSeconds;
    attendance.punchOutTime = new Date();
    attendance.status = "COMPLETED";

    await attendance.save();

    return res.json({
      success: true,
      message: "Punch out successful",
      data: {
        totalActiveSeconds: attendance.totalActiveSeconds,
        totalIdleSeconds: attendance.totalIdleSeconds,
        overtimeSeconds,
        punchInTime: attendance.punchInTime,
        punchOutTime: attendance.punchOutTime,
      },
    });
  } catch (error) {
    console.error("Punch Out Error:", error);
    res.status(500).json({
      success: false,
      message: "Punch out failed",
    });
  }
};
