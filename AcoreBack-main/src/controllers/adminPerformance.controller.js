import mongoose from "mongoose";
import WorkSession from "../models/WorkSession.model.js";
import User from "../models/user.model.js";

/* =========================
   HELPERS
========================= */

// YYYY-MM-DD
const formatDate = (date) => date.toISOString().slice(0, 10);

// Get start & end of today
const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// Get last N days range
const getLastNDaysRange = (days) => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);

  return { start, end };
};

// Get current month range
const getMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  return { start, end };
};

// Get year range
const getYearRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

  return { start, end };
};

// Convert seconds → hours (2 decimals)
const secToHours = (sec = 0) =>
  Number((sec / 3600).toFixed(2));

/* =========================
   MAIN CONTROLLER
========================= */

/**
 * GET /api/admin/employee-performance
 * Query:
 *   employeeId
 *   range = day | week | month | year
 */
export const getEmployeePerformance = async (req, res) => {
  try {
    const { employeeId, range } = req.query;

    if (!employeeId || !range) {
      return res.status(400).json({
        success: false,
        message: "employeeId and range are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employeeId",
      });
    }

    // 🔹 Employee basic info (NAME MUST STAY)
    const employee = await User.findById(employeeId).select("name email");
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    let data;

    switch (range) {
      case "day":
        data = await getDayPerformance(employeeId);
        break;

      case "week":
        data = await getWeekPerformance(employeeId);
        break;

      case "month":
        data = await getMonthPerformance(employeeId);
        break;

      case "year":
        data = await getYearPerformance(employeeId);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid range (day | week | month | year)",
        });
    }

    return res.json({
      success: true,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
      },
      range,
      data,
    });

  } catch (error) {
    console.error("❌ Admin performance error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee performance",
    });
  }
};

/* =========================
   DAY PERFORMANCE
========================= */

const getDayPerformance = async (employeeId) => {
  const today = formatDate(new Date());

  const session = await WorkSession.findOne({
    employeeId,
    date: today,
  });

  if (!session) {
    return {
      date: today,
      workHours: 0,
      idleHours: 0,
      overtimeHours: 0,
      status: "NO_DATA",
    };
  }

  return {
    date: today,
    workHours: secToHours(session.workSeconds),
    idleHours: secToHours(session.idleSeconds),
    overtimeHours: secToHours(session.overtimeSeconds),
    status: session.status,
  };
};

/* =========================
   WEEK PERFORMANCE (LAST 7 DAYS)
========================= */

const getWeekPerformance = async (employeeId) => {
  const { start, end } = getLastNDaysRange(7);

  const sessions = await WorkSession.find({
    employeeId,
    createdAt: { $gte: start, $lte: end },
  }).sort({ date: 1 });

  let totalWork = 0;
  let totalIdle = 0;
  let totalOvertime = 0;

  const dailyBreakdown = sessions.map((s) => {
    totalWork += s.workSeconds;
    totalIdle += s.idleSeconds;
    totalOvertime += s.overtimeSeconds;

    return {
      date: s.date,
      workHours: secToHours(s.workSeconds),
      idleHours: secToHours(s.idleSeconds),
      overtimeHours: secToHours(s.overtimeSeconds),
      status: s.status,
    };
  });

  return {
    totalWorkHours: secToHours(totalWork),
    avgWorkHoursPerDay: dailyBreakdown.length
      ? secToHours(totalWork / dailyBreakdown.length)
      : 0,
    totalIdleHours: secToHours(totalIdle),
    totalOvertimeHours: secToHours(totalOvertime),
    daysTracked: dailyBreakdown.length,
    dailyBreakdown,
  };
};

/* =========================
   MONTH PERFORMANCE
========================= */

const getMonthPerformance = async (employeeId) => {
  const { start, end } = getMonthRange();

  const sessions = await WorkSession.find({
    employeeId,
    createdAt: { $gte: start, $lte: end },
  }).sort({ date: 1 });

  let totalWork = 0;
  let totalIdle = 0;
  let totalOvertime = 0;

  const dailyBreakdown = sessions.map((s) => {
    totalWork += s.workSeconds;
    totalIdle += s.idleSeconds;
    totalOvertime += s.overtimeSeconds;

    return {
      date: s.date,
      workHours: secToHours(s.workSeconds),
      idleHours: secToHours(s.idleSeconds),
      overtimeHours: secToHours(s.overtimeSeconds),
      status: s.status,
    };
  });

  return {
    totalWorkHours: secToHours(totalWork),
    avgWorkHoursPerDay: dailyBreakdown.length
      ? secToHours(totalWork / dailyBreakdown.length)
      : 0,
    totalIdleHours: secToHours(totalIdle),
    totalOvertimeHours: secToHours(totalOvertime),
    workingDays: dailyBreakdown.length,
    dailyBreakdown,
  };
};

/* =========================
   YEAR PERFORMANCE (MONTH-WISE)
========================= */

const getYearPerformance = async (employeeId) => {
  const { start, end } = getYearRange();

  const sessions = await WorkSession.find({
    employeeId,
    createdAt: { $gte: start, $lte: end },
  });

  const monthMap = {};

  sessions.forEach((s) => {
    const month = s.date.slice(0, 7); // YYYY-MM

    if (!monthMap[month]) {
      monthMap[month] = {
        work: 0,
        idle: 0,
        overtime: 0,
        days: 0,
      };
    }

    monthMap[month].work += s.workSeconds;
    monthMap[month].idle += s.idleSeconds;
    monthMap[month].overtime += s.overtimeSeconds;
    monthMap[month].days += 1;
  });

  const monthlyBreakdown = Object.keys(monthMap).map((month) => ({
    month,
    workHours: secToHours(monthMap[month].work),
    idleHours: secToHours(monthMap[month].idle),
    overtimeHours: secToHours(monthMap[month].overtime),
    avgWorkHoursPerDay: secToHours(
      monthMap[month].work / monthMap[month].days
    ),
    workingDays: monthMap[month].days,
  }));

  return {
    monthsTracked: monthlyBreakdown.length,
    monthlyBreakdown,
  };
};
