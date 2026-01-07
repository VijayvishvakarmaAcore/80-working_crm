import DailyCommit from "../models/dailyCommit.model.js";
import User from "../models/user.model.js";
import ExceptionToken from "../models/exceptionToken.model.js";

/* ============================================================
   1) GET DAILY COMMIT REPORT (FIXED)
============================================================ */
export const getDailyCommitReport = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split("T")[0];

    // Get all non-admin employees
    const employees = await User.find(
      { 
        $or: [
          { role: { $exists: false } },
          { role: { $nin: ["admin", "super-admin", "hr"] } }
        ]
      },
      "employeeId name email department designation githubUsername"
    ).lean();

    // Get today's commits
    const todayCommits = await DailyCommit.find({ 
      date: targetDate 
    }).lean();

    // Get today's approved exceptions
    const todayExceptions = await ExceptionToken.find({
      createdAt: {
        $gte: new Date(targetDate + "T00:00:00.000Z"),
        $lt: new Date(targetDate + "T23:59:59.999Z"),
      },
      status: "approved",
    }).lean();

    // Prepare report
    const report = employees.map(employee => {
      const commit = todayCommits.find(c => c.employeeId === employee.employeeId);
      const exception = todayExceptions.find(e => e.employeeId === employee.employeeId);

      return {
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        department: employee.department || "Not assigned",
        designation: employee.designation || "Employee",
        githubUsername: employee.githubUsername || "Not set",
        
        // Commit Info
        hasCommitted: !!commit,
        commitData: commit ? {
          time: commit.pushedAt,
          message: commit.commitMessage,
          url: commit.commitUrl,
          repository: commit.repository,
        } : null,
        
        // Exception Info
        hasException: !!exception,
        exceptionData: exception ? {
          token: exception.token,
          reason: exception.reason,
          approvedBy: exception.approvedBy,
          approvedAt: exception.updatedAt,
        } : null,
        
        // Status
        status: commit ? "committed" : exception ? "exception" : "pending",
        canPunchOut: !!commit || !!exception,
      };
    });

    // Statistics
    const stats = {
      totalEmployees: employees.length,
      committed: report.filter(r => r.hasCommitted).length,
      exceptions: report.filter(r => r.hasException).length,
      pending: report.filter(r => !r.hasCommitted && !r.hasException).length,
      date: targetDate,
    };

    return res.status(200).json({
      success: true,
      stats,
      report,
    });
  } catch (error) {
    console.error("Get Daily Commit Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate report",
      error: error.message,
    });
  }
};

/* ============================================================
   2) GET EMPLOYEE COMMIT HISTORY (FIXED)
============================================================ */
export const getEmployeeCommitHistory = async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.query;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // Find employee first
    const employee = await User.findOne({ employeeId });
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Build query for commits
    const query = { employeeId };
    
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const commits = await DailyCommit.find(query).sort({ date: -1 }).lean();
    
    // Calculate streak
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    
    // Sort commits by date ascending for streak calculation
    const sortedCommits = [...commits].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    const today = new Date().toISOString().split("T")[0];
    
    // Check current streak (consecutive days with commits including today)
    for (let i = 0; i < sortedCommits.length; i++) {
      const commit = sortedCommits[i];
      
      if (commit.hasCommit) {
        tempStreak++;
        
        if (i === 0) {
          currentStreak = 1;
        } else {
          const prevDate = new Date(sortedCommits[i - 1].date);
          const currDate = new Date(commit.date);
          const dayDiff = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
          
          if (dayDiff === 1) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
        }
        
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        tempStreak = 0;
        // Don't break streak if it's an old day without commit
        if (commit.date !== today) {
          currentStreak = 0;
        }
      }
    }

    // Monthly stats
    const monthlyStats = {};
    commits.forEach(commit => {
      const monthYear = commit.date.substring(0, 7); // YYYY-MM
      if (!monthlyStats[monthYear]) {
        monthlyStats[monthYear] = { committed: 0, totalDays: 0 };
      }
      monthlyStats[monthYear].totalDays++;
      if (commit.hasCommit) monthlyStats[monthYear].committed++;
    });

    return res.status(200).json({
      success: true,
      employee: {
        name: employee.name,
        employeeId: employee.employeeId,
        githubUsername: employee.githubUsername || "Not set",
        department: employee.department || "Not assigned",
        designation: employee.designation || "Employee",
      },
      stats: {
        totalCommits: commits.filter(c => c.hasCommit).length,
        totalDaysTracked: commits.length,
        currentStreak,
        maxStreak,
        commitmentRate: commits.length > 0 
          ? Math.round((commits.filter(c => c.hasCommit).length / commits.length) * 100)
          : 0,
      },
      monthlyStats: Object.entries(monthlyStats).map(([month, data]) => ({
        month,
        committed: data.committed,
        totalDays: data.totalDays,
        rate: Math.round((data.committed / data.totalDays) * 100),
      })),
      commits: commits.map(commit => ({
        date: commit.date,
        hasCommit: commit.hasCommit,
        message: commit.commitMessage,
        repository: commit.repository,
        url: commit.commitUrl,
        pushedAt: commit.pushedAt,
      })),
    });
  } catch (error) {
    console.error("Get Employee Commit History Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch commit history",
      error: error.message,
    });
  }
};

/* ============================================================
   3) GET EXCEPTION REQUESTS (FIXED)
============================================================ */
export const getExceptionRequests = async (req, res) => {
  try {
    const { status, date } = req.query; // pending, approved, rejected
    
    const query = {};
    if (status) query.status = status;
    
    // Filter by date if provided
    if (date) {
      query.createdAt = {
        $gte: new Date(date + "T00:00:00.000Z"),
        $lt: new Date(date + "T23:59:59.999Z"),
      };
    }

    const exceptions = await ExceptionToken.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Get employee names for each exception
    const exceptionsWithNames = await Promise.all(
      exceptions.map(async (exception) => {
        const user = await User.findOne({ 
          employeeId: exception.employeeId 
        }, "name department designation");
        
        return {
          id: exception._id,
          employeeId: exception.employeeId,
          employeeName: user?.name || "Unknown",
          department: user?.department || "Unknown",
          designation: user?.designation || "Unknown",
          reason: exception.reason,
          status: exception.status,
          token: exception.token,
          approvedBy: exception.approvedBy,
          createdAt: exception.createdAt,
          expiresAt: exception.expiresAt,
          used: exception.used,
          rejectionReason: exception.rejectionReason,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: exceptionsWithNames.length,
      data: exceptionsWithNames,
    });
  } catch (error) {
    console.error("Get Exception Requests Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch exception requests",
      error: error.message,
    });
  }
};

/* ============================================================
   4) APPROVE/REJECT EXCEPTION (ADDITIONAL)
============================================================ */
export const updateExceptionStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action, rejectionReason } = req.body; // action: "approve" or "reject"

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Action must be 'approve' or 'reject'",
      });
    }

    const exception = await ExceptionToken.findById(requestId);
    
    if (!exception) {
      return res.status(404).json({
        success: false,
        message: "Exception request not found",
      });
    }

    if (exception.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Exception request is already ${exception.status}`,
      });
    }

    const adminUser = req.admin;
    
    if (action === "approve") {
      // Generate token
      const crypto = await import("crypto");
      const token = crypto.randomBytes(8).toString("hex");
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1); // 24 hours validity

      exception.status = "approved";
      exception.token = token;
      exception.expiresAt = expiresAt;
      exception.approvedBy = adminUser.name || "Admin";
    } else {
      // Reject
      exception.status = "rejected";
      exception.rejectionReason = rejectionReason || "Rejected by admin";
      exception.approvedBy = adminUser.name || "Admin";
    }

    await exception.save();

    return res.status(200).json({
      success: true,
      message: `Exception request ${action}ed successfully`,
      data: {
        requestId: exception._id,
        status: exception.status,
        token: exception.token,
        expiresAt: exception.expiresAt,
        rejectionReason: exception.rejectionReason,
      },
    });
  } catch (error) {
    console.error("Update Exception Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update exception status",
      error: error.message,
    });
  }
};


// Add this function to your existing file

/* ============================================================
   5) GET DATE RANGE REPORT
============================================================ */
export const getDateRangeReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Start date and end date are required",
      });
    }

    // Get all employees
    const employees = await User.find(
      { role: { $nin: ["admin", "super-admin"] } },
      "employeeId name department"
    ).lean();

    // Get commits within date range
    const commits = await DailyCommit.find({
      date: { $gte: startDate, $lte: endDate },
      hasCommit: true,
    }).lean();

    // Get exceptions within date range
    const exceptions = await ExceptionToken.find({
      createdAt: {
        $gte: new Date(startDate + "T00:00:00.000Z"),
        $lte: new Date(endDate + "T23:59:59.999Z"),
      },
      status: "approved",
    }).lean();

    // Group by date
    const dateMap = {};
    const currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);

    while (currentDate <= endDateObj) {
      const dateStr = currentDate.toISOString().split("T")[0];
      dateMap[dateStr] = {
        date: dateStr,
        totalEmployees: employees.length,
        committed: 0,
        exceptions: 0,
        employees: [],
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Populate data
    commits.forEach(commit => {
      const dateStr = commit.date;
      if (dateMap[dateStr]) {
        dateMap[dateStr].committed++;
        if (!dateMap[dateStr].employees.includes(commit.employeeId)) {
          dateMap[dateStr].employees.push(commit.employeeId);
        }
      }
    });

    exceptions.forEach(exception => {
      const dateStr = exception.createdAt.toISOString().split("T")[0];
      if (dateMap[dateStr]) {
        dateMap[dateStr].exceptions++;
      }
    });

    // Convert to array
    const dateReport = Object.values(dateMap).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // Calculate overall stats
    const totalDays = dateReport.length;
    const totalCommits = dateReport.reduce((sum, day) => sum + day.committed, 0);
    const totalExceptions = dateReport.reduce((sum, day) => sum + day.exceptions, 0);
    const avgCommitsPerDay = totalDays > 0 ? totalCommits / totalDays : 0;

    return res.status(200).json({
      success: true,
      range: { startDate, endDate },
      stats: {
        totalDays,
        totalCommits,
        totalExceptions,
        avgCommitsPerDay: Math.round(avgCommitsPerDay * 100) / 100,
        commitRate: employees.length > 0 ? 
          Math.round((totalCommits / (employees.length * totalDays)) * 100) : 0,
      },
      dailyReport: dateReport,
      employees: employees.map(emp => ({
        employeeId: emp.employeeId,
        name: emp.name,
        department: emp.department,
      })),
    });
  } catch (error) {
    console.error("Get Date Range Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate date range report",
      error: error.message,
    });
  }
};