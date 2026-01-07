// AcoreBack-main/src/controllers/adminAttendanceController.js - COMPLETE VERSION
import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import moment from "moment-timezone";

// ✅ GET LIVE ATTENDANCE
export const getLiveAttendance = async (req, res) => {
  try {
    const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    
    const liveAttendance = await Attendance.find({
      date: today,
      outTime: { $exists: false }
    }).sort({ inTime: -1 });

    const enrichedData = await Promise.all(
      liveAttendance.map(async (attendance) => {
        const user = await User.findOne({ employeeId: attendance.employeeId });
        return {
          _id: attendance._id,
          employeeId: attendance.employeeId,
          name: user?.name || 'Unknown',
          email: user?.email || 'N/A',
          department: user?.department || 'N/A',
          date: attendance.date,
          inTime: attendance.inTime,
          totalActiveSeconds: attendance.totalActiveSeconds || 0,
          idleSeconds: attendance.idleSeconds || 0,
          sessionStatus: attendance.sessionStatus || 'RUNNING',
          isWithinOfficeRadius: attendance.isWithinOfficeRadius || true,
          totalTime: attendance.totalTime || '0h 0m'
        };
      })
    );

    res.json({
      status: true,
      data: enrichedData,
      count: enrichedData.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ✅ GET TODAY SUMMARY
export const getTodaySummary = async (req, res) => {
  try {
    const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    
    const totalEmployees = await User.countDocuments({ isActive: true });
    const present = await Attendance.countDocuments({ 
      date: today,
      status: 'present'
    });
    const absent = totalEmployees - present;
    
    // Calculate from leave system (simplified)
    const leave = await Leave.countDocuments({
      fromDate: { $lte: today },
      toDate: { $gte: today },
      status: 'approved'
    });
    
    const halfDay = await Attendance.countDocuments({ 
      date: today,
      status: 'half-day'
    });
    
    const late = await Attendance.countDocuments({ 
      date: today,
      isLate: true
    });

    res.json({
      status: true,
      data: {
        present,
        absent,
        leave: leave || 0,
        halfDay: halfDay || 0,
        late: late || 0,
        totalEmployees
      }
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ✅ GET COMPLETED SESSIONS
export const getCompletedSessions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    
    const completed = await Attendance.find({
      date: today,
      outTime: { $exists: true }
    })
    .sort({ outTime: -1 })
    .limit(limit);

    const enrichedData = await Promise.all(
      completed.map(async (attendance) => {
        const user = await User.findOne({ employeeId: attendance.employeeId });
        return {
          _id: attendance._id,
          employeeId: attendance.employeeId,
          name: user?.name || 'Unknown',
          department: user?.department || 'N/A',
          date: attendance.date,
          inTime: attendance.inTime,
          outTime: attendance.outTime,
          totalTime: attendance.totalTime || '0h 0m',
          totalActiveSeconds: attendance.totalActiveSeconds || 0,
          sessionStatus: 'COMPLETED'
        };
      })
    );

    res.json({
      status: true,
      data: enrichedData,
      count: enrichedData.length
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ✅ GET ATTENDANCE ANALYTICS
export const getAttendanceAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: startDate,
        $lte: endDate
      };
    } else {
      // Default to last 30 days
      const thirtyDaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD');
      query.date = { $gte: thirtyDaysAgo };
    }

    const summaries = await Attendance.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$date",
          present: { $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] } },
          halfDay: { $sum: { $cond: [{ $eq: ["$status", "half-day"] }, 1, 0] } },
          totalHours: { $sum: "$totalActiveSeconds" }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 30 }
    ]);

    res.json({
      status: true,
      data: summaries
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};