import User from "../models/user.model.js";
import WorkSession from "../models/WorkSession.model.js";

// YYYY-MM-DD
const getTodayDate = () => new Date().toISOString().slice(0, 10);

export const getAdminDashboardSummary = async (req, res) => {
  try {
    const today = getTodayDate();

    // 1️⃣ Total employees
    const totalEmployees = await User.countDocuments({
      role: "employee",
    });

    // 2️⃣ Today's work sessions
    const todaySessions = await WorkSession.find({ date: today });

    // Employees who worked today
    const uniqueEmployeeIds = new Set(
      todaySessions.map((s) => s.employeeId.toString())
    );

    const activeEmployees = uniqueEmployeeIds.size;

    // 3️⃣ Absent employees
    const absentEmployees = Math.max(
      totalEmployees - activeEmployees,
      0
    );

    // 4️⃣ Total work seconds (today)
    const totalWorkSeconds = todaySessions.reduce(
      (sum, s) => sum + (s.workSeconds || 0),
      0
    );

    // 5️⃣ Average work hours (today)
    const avgWorkSeconds =
      activeEmployees > 0
        ? totalWorkSeconds / activeEmployees
        : 0;

    return res.json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        absentEmployees,
        todayTotalWorkHours: Number(
          (totalWorkSeconds / 3600).toFixed(2)
        ),
        todayAverageWorkHours: Number(
          (avgWorkSeconds / 3600).toFixed(2)
        ),
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard summary",
    });
  }
};
