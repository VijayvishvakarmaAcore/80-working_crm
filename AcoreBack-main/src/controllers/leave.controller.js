

import Leave from "../models/leave.model.js";
import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import Holiday from "../models/holiday.model.js";
import moment from "moment-timezone";







export const applySingleLeave = async (req, res) => {
    try {
        const { employeeId, employeeName, leaveType, reason, date } = req.body;
        
        if (!date || !employeeId || !employeeName || !leaveType || !reason) {
            return res
                .status(400)
                .json({ status: false, message: "All fields are required" });
        }

        const requestedISTDate = moment.tz(date, "YYYY-MM-DD", "Asia/Kolkata").startOf('day');
        
        const dayOfWeek = requestedISTDate.day();
        const dayOfMonth = requestedISTDate.date();
        
        let holidayTitle = null;

        if (dayOfWeek === 6) { 
            if (dayOfMonth <= 7) {
                holidayTitle = "1st Saturday Holiday";
            } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
                const weekOfMonth = Math.ceil(dayOfMonth / 7);
                if (weekOfMonth === 3) {
                    holidayTitle = "3rd Saturday Holiday";
                }
            }
        }
        
        if (holidayTitle) {
            return res
                .status(400)
                .json({ 
                    status: false, 
                    message: `Cannot apply leave. ${holidayTitle} is a designated automatic holiday.` 
                });
        }
        
        const istHolidayQueryDate = requestedISTDate.toDate(); 

        const standardUTCMidnightDate = new Date(date);
        standardUTCMidnightDate.setUTCHours(0, 0, 0, 0); 
        
        const checkHoliday = await Holiday.findOne({ 
            $or: [
                { date: istHolidayQueryDate },
                { date: standardUTCMidnightDate }
            ]
        });
        
        if (checkHoliday) {
            return res
                .status(400)
                .json({ 
                    status: false, 
                    message: `Cannot apply leave. ${checkHoliday.title || 'This date'} is a designated holiday.` 
                });
        }
        
        const finalLeaveDate = standardUTCMidnightDate; 
        
        const exists = await Leave.findOne({
            employeeId,
            fromDate: finalLeaveDate, 
            toDate: finalLeaveDate,  
        });

        if (exists) {
            return res.status(400).json({
                status: false,
                message: "Leave already applied for this date",
            });
        }

        const leave = await Leave.create({
            employeeId,
            employeeName,
            leaveType,
            reason,
            fromDate: finalLeaveDate, 
            toDate: finalLeaveDate,
            applyType: "single",
        });

        res.status(201).json({ status: true, data: leave });
    } catch (error) {
        console.error("Apply Single Leave Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};


export const applyRangeLeave = async (req, res) => {
  try {
    const { employeeId, employeeName, leaveType, reason, fromDate, toDate } =
      req.body;

    if (
      !fromDate ||
      !toDate ||
      !employeeId ||
      !employeeName ||
      !leaveType ||
      !reason
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (start > end) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid date range" });
    }

    // Check existing leave in range
    const exists = await Leave.findOne({
      employeeId,
      fromDate: { $lte: end },
      toDate: { $gte: start },
    });

    if (exists) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Leave already applied in this range",
        });
    }

    const leave = await Leave.create({
      employeeId,
      employeeName,
      leaveType,
      reason,
      fromDate: start,
      toDate: end,
      applyType: "range",
    });

    res.status(201).json({ status: true, data: leave });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const getLeavesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const leaves = await Leave.find({
      fromDate: { $lte: targetDate },
      toDate: { $gte: targetDate },
    });

    res.status(200).json({ status: true, data: leaves });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getLeavesByEmpId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const leaves = await Leave.find({ employeeId });
    res.status(200).json({ status: true, data: leaves });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status, approvedBy } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ status: false, message: "Invalid status" });
    }

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status, approvedBy },
      { new: true }
    );

    if (!leave) {
      return res
        .status(404)
        .json({ status: false, message: "Leave not found" });
    }

    res.status(200).json({ status: true, data: leave });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};



// leaves.controller.js में नीचे add करें:

// ✅ 1. Apply Early Leave (New Function)
// export const applyEarlyLeave = async (req, res) => {
//     try {
//         const { employeeId, employeeName, earlyLeaveTime, earlyLeaveReason } = req.body;
        
//         if (!employeeId || !employeeName || !earlyLeaveTime || !earlyLeaveReason) {
//             return res.status(400).json({ 
//                 status: false, 
//                 message: "All fields are required for early leave" 
//             });
//         }

//         // Check if today is holiday
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
        
//         const checkHoliday = await Holiday.findOne({ date: today });
//         if (checkHoliday) {
//             return res.status(400).json({ 
//                 status: false, 
//                 message: `Cannot apply early leave. ${checkHoliday.title} is a holiday.` 
//             });
//         }

//         // Check if already applied early leave for today
//         const existingEarlyLeave = await Leave.findOne({
//             employeeId,
//             fromDate: today,
//             toDate: today,
//             isEarlyLeave: true,
//             status: { $in: ["pending", "approved"] }
//         });

//         if (existingEarlyLeave) {
//             return res.status(400).json({ 
//                 status: false, 
//                 message: "Early leave already applied for today" 
//             });
//         }

//         // Check if regular leave already applied for today
//         const existingRegularLeave = await Leave.findOne({
//             employeeId,
//             fromDate: { $lte: today },
//             toDate: { $gte: today },
//             status: { $in: ["pending", "approved"] }
//         });

//         if (existingRegularLeave) {
//             return res.status(400).json({ 
//                 status: false, 
//                 message: "Regular leave already applied for today" 
//             });
//         }

//         // Create early leave record
//         const earlyLeave = await Leave.create({
//             employeeId,
//             employeeName,
//             leaveType: "early", // New leave type
//             reason: earlyLeaveReason,
//             fromDate: today,
//             toDate: today,
//             days: 1,
//             status: "pending",
//             applyType: "single",
//             // New fields for early leave
//             isEarlyLeave: true,
//             earlyLeaveTime,
//             earlyLeaveReason,
//             earlyLeaveApproved: false
//         });

//         res.status(201).json({ 
//             status: true, 
//             message: "Early leave request submitted successfully",
//             data: earlyLeave 
//         });

//     } catch (error) {
//         console.error("Apply Early Leave Error:", error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


export const applyEarlyLeave = async (req, res) => {
    try {
        const { employeeId, employeeName, earlyLeaveTime, earlyLeaveReason } = req.body;
        
        if (!employeeId || !employeeName || !earlyLeaveTime || !earlyLeaveReason) {
            return res.status(400).json({ 
                status: false, 
                message: "All fields are required for early leave" 
            });
        }

        // ✅ SIMPLE FIX: Use JavaScript Date directly
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0); // UTC midnight
        
        const todayEnd = new Date(today);
        todayEnd.setUTCHours(23, 59, 59, 999);
        
        console.log("📅 Dates for early leave:", {
            todayUTC: today.toISOString(),
            todayEndUTC: todayEnd.toISOString(),
            localTime: new Date().toString(),
            ISTTime: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        });

        // Check if today is holiday
        const checkHoliday = await Holiday.findOne({ 
            date: { $gte: today, $lte: todayEnd }
        });
        
        if (checkHoliday) {
            return res.status(400).json({ 
                status: false, 
                message: `Cannot apply early leave. ${checkHoliday.title} is a holiday.` 
            });
        }

        // Check existing early leave
        const existingEarlyLeave = await Leave.findOne({
            employeeId,
            isEarlyLeave: true,
            status: { $in: ["pending", "approved"] },
            $or: [
                { fromDate: { $lte: todayEnd }, toDate: { $gte: today } }
            ]
        });

        if (existingEarlyLeave) {
            return res.status(400).json({ 
                status: false, 
                message: "Early leave already applied for today" 
            });
        }

        // ✅ FIXED: Create with today's date only
        const earlyLeave = await Leave.create({
            employeeId,
            employeeName,
            leaveType: "early",
            reason: earlyLeaveReason,
            fromDate: today,      // ✅ Only today's start
            toDate: today,        // ✅ Only today's start (not end)
            days: 1,
            status: "pending",
            applyType: "single",
            isEarlyLeave: true,
            earlyLeaveTime,
            earlyLeaveReason,
            earlyLeaveApproved: false
        });

        console.log("✅ Early leave created with dates:", {
            fromDate: earlyLeave.fromDate,
            toDate: earlyLeave.toDate
        });

        res.status(201).json({ 
            status: true, 
            message: "Early leave request submitted successfully",
            data: earlyLeave 
        });

    } catch (error) {
        console.error("Apply Early Leave Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};
// ✅ 2. Check Today's Early Leave Approval
// export const checkTodayEarlyLeave = async (req, res) => {
//     try {
//         const { employeeId } = req.params;
        
//         if (!employeeId) {
//             return res.status(400).json({ 
//                 status: false, 
//                 message: "Employee ID is required" 
//             });
//         }

//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const earlyLeave = await Leave.findOne({
//             employeeId,
//             fromDate: today,
//             toDate: today,
//             isEarlyLeave: true,
//             status: "approved"
//         });

//         res.status(200).json({ 
//             status: true, 
//             hasEarlyLeave: !!earlyLeave,
//             data: earlyLeave || null
//         });

//     } catch (error) {
//         console.error("Check Early Leave Error:", error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

export const checkTodayEarlyLeave = async (req, res) => {
    try {
        const { employeeId } = req.params;
        
        if (!employeeId) {
            return res.status(400).json({ 
                status: false, 
                message: "Employee ID is required" 
            });
        }

        // ✅ SIMPLE: Today's date
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

        console.log("🔍 Checking early leave for:", {
            employeeId,
            today: today.toISOString(),
            tomorrow: tomorrow.toISOString()
        });

        // Check for approved early leave for today
        const earlyLeave = await Leave.findOne({
            employeeId,
            isEarlyLeave: true,
            status: "approved",
            fromDate: { $gte: today, $lt: tomorrow }
        });

        console.log("🔍 Found:", earlyLeave);

        res.status(200).json({ 
            status: true, 
            hasEarlyLeave: !!earlyLeave,
            data: earlyLeave 
        });

    } catch (error) {
        console.error("Check Early Leave Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// ✅ 3. Get All Pending Early Leaves (For Admin)
export const getPendingEarlyLeaves = async (req, res) => {
    try {
        const pendingEarlyLeaves = await Leave.find({
            isEarlyLeave: true,
            status: "pending"
        }).sort({ createdAt: -1 });

        res.status(200).json({ 
            status: true, 
            count: pendingEarlyLeaves.length,
            data: pendingEarlyLeaves 
        });

    } catch (error) {
        console.error("Get Pending Early Leaves Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// ✅ 4. Approve/Reject Early Leave (For Admin)
export const approveEarlyLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { status, approvedBy } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ 
                status: false, 
                message: "Invalid status. Use 'approved' or 'rejected'" 
            });
        }

        const leave = await Leave.findById(leaveId);
        
        if (!leave) {
            return res.status(404).json({ 
                status: false, 
                message: "Leave not found" 
            });
        }

        if (!leave.isEarlyLeave) {
            return res.status(400).json({ 
                status: false, 
                message: "Not an early leave request" 
            });
        }

        // Update leave
        const updatedLeave = await Leave.findByIdAndUpdate(
            leaveId,
            { 
                status,
                approvedBy,
                earlyLeaveApproved: status === "approved"
            },
            { new: true }
        );

        res.status(200).json({ 
            status: true, 
            message: `Early leave ${status} successfully`,
            data: updatedLeave 
        });

    } catch (error) {
        console.error("Approve Early Leave Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};
