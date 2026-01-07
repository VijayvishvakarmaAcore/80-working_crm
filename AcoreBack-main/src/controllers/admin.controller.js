import TimeLog from '../models/TimeLog.model.js';
import Holiday from "../models/holiday.model.js"
import Attendance from "../models/attendance.model.js"
import User from '../models/user.model.js';
import moment from 'moment-timezone';
import { ROLES } from '../constants/role.js';

const MINUTES_PER_HOUR = 60;
const TIMEZONE = "Asia/Kolkata";

export const getOverallStatus = async (req, res) => {
    try {
        const nowIST = moment.tz(TIMEZONE);
        const todayStart = nowIST.clone().startOf('day').toDate();
        const thirtyDaysAgo = nowIST.clone().subtract(30, 'days').toDate();

        // Fetch data concurrently
        const [totalEmployees, activeTimeLogs, todayLogs, allCompletedLogs] = await Promise.all([
            User.countDocuments({ role: { $ne: 'admin' } }),
            TimeLog.find({ endTime: null }).select('employeeId startTime'),
            TimeLog.find({ startTime: { $gte: todayStart } }),
            TimeLog.find({ endTime: { $ne: null }, startTime: { $gte: thirtyDaysAgo } }),
        ]);

        // Calculate Total Hours Today (including active sessions)
        const totalMinutesToday = todayLogs.reduce((sum, log) => {
            if (log.endTime) {
                return sum + log.durationMinutes;
            } else {
                return sum + nowIST.diff(moment(log.startTime), 'minutes');
            }
        }, 0);
        const totalHoursToday = (totalMinutesToday / MINUTES_PER_HOUR).toFixed(2);

        // Calculate Avg Hours per Day (over last 30 days)
        const totalMinutesPeriod = allCompletedLogs.reduce((sum, log) => sum + log.durationMinutes, 0);
        const daysInPeriod = 30;
        const totalWorkableHours = totalMinutesPeriod / MINUTES_PER_HOUR;
        const avgHoursPerDay = (totalWorkableHours / totalEmployees / daysInPeriod).toFixed(2);
        
        // Identify checked-in users today
        const checkedInTodayIds = new Set(todayLogs.map(log => log.employeeId));
        const onLeaveCount = totalEmployees - checkedInTodayIds.size; 

        res.status(200).json({
            status: true,
            data: {
                totalEmployees: totalEmployees,
                activeNow: activeTimeLogs.length, 
                totalHoursToday: totalHoursToday,
                avgHoursPerDay: avgHoursPerDay,
                onLeave: onLeaveCount < 0 ? 0 : onLeaveCount,
            }
        });

    } catch (error) {
        console.error("Overall Status Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};


export const getDepartmentDistribution = async (req, res) => {
    try {
        const nowIST = moment.tz(TIMEZONE);
        const todayStart = nowIST.clone().startOf('day').toDate();

        // Fetch all employees and all TimeLogs from today
        const [allEmployees, todayLogs] = await Promise.all([
            User.find({ role: { $ne: 'admin' } }).select('_id department'),
            TimeLog.find({ startTime: { $gte: todayStart } }),
        ]);

        const employeeMap = new Map(allEmployees.map(u => [u._id.toString(), u]));
        const departmentData = {};

        // Initialize departments
        for (const user of allEmployees) {
            const dept = user.department || 'Unassigned';
            if (!departmentData[dept]) {
                departmentData[dept] = { totalEmployees: 0, totalHoursTodayMinutes: 0 };
            }
            departmentData[dept].totalEmployees++;
        }

        // Aggregate today's hours by department
        for (const log of todayLogs) {
            const user = employeeMap.get(log.employeeId);
            if (user) {
                const dept = user.department || 'Unassigned';
                // Calculate duration for both closed (durationMinutes) and open logs
                const duration = log.endTime 
                    ? log.durationMinutes 
                    : nowIST.diff(moment(log.startTime), 'minutes');
                
                if (departmentData[dept]) {
                    departmentData[dept].totalHoursTodayMinutes += duration;
                }
            }
        }
        
        // Final Formatting
        const distribution = Object.keys(departmentData).map(dept => ({
            department: dept,
            totalEmployees: departmentData[dept].totalEmployees,
            totalHoursToday: (departmentData[dept].totalHoursTodayMinutes / MINUTES_PER_HOUR).toFixed(2)
        }));

        res.status(200).json({ status: true, data: distribution });

    } catch (error) {
        console.error("Department Distribution Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// export const getWeeklyBreakdownAnalysis = async (req, res) => {
//     try {
//         const nowIST = moment.tz(TIMEZONE);
//         // Define the analysis period (e.g., last 90 days)
//         const ninetyDaysAgo = nowIST.clone().subtract(90, 'days').toDate(); 

//         // --- MongoDB Aggregation Pipeline ---
//         const weeklyData = await TimeLog.aggregate([
//             { 
//                 // 1. Filter: Only completed logs within the last 90 days
//                 $match: { 
//                     endTime: { $ne: null },
//                     startTime: { $gte: ninetyDaysAgo }
//                 }
//             },
//             {
//                 // 2. Group: Group by year and week number
//                 $group: {
//                     _id: {
//                         year: { $year: "$startTime" },
//                         week: { $isoWeek: "$startTime" } // Use $isoWeek for standard week numbering (1-53)
//                     },
//                     totalMinutes: { $sum: "$durationMinutes" }
//                 }
//             },
//             {
//                 // 3. Project/Calculate: Convert minutes to hours and format date string
//                 $project: {
//                     _id: 0, // Exclude the default _id
//                     year: "$_id.year",
//                     weekNumber: "$_id.week",
//                     totalHours: { $divide: ["$totalMinutes", MINUTES_PER_HOUR] }
//                 }
//             },
//             {
//                 // 4. Sort: Order chronologically (by year, then week)
//                 $sort: { year: 1, weekNumber: 1 }
//             }
//         ]);

//         // --- Post-Processing for Client Display ---
//         // Format the output to be user-friendly (e.g., "Week 45, 2025")
//         const formattedData = weeklyData.map(item => {
//             // Moment.js can be used to determine the start date of the ISO week for better labeling
//             const weekStart = moment().isoWeek(item.weekNumber).startOf('isoWeek');
            
//             return {
//                 label: `Week ${item.weekNumber}, ${item.year} (${weekStart.format('MMM D')})`,
//                 totalHours: item.totalHours.toFixed(2)
//             };
//         });

//         res.status(200).json({ 
//             status: true, 
//             analysisPeriod: `Last 90 Days (${ninetyDaysAgo.toDateString()} to ${nowIST.toDate().toDateString()})`,
//             data: formattedData 
//         });

//     } catch (error) {
//         console.error("Weekly Breakdown Analysis Error:", error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

export const getWeeklyHoursAnalysis = async (req, res) => {
    try {
        const nowIST = moment.tz(TIMEZONE);
        const startOfWeek = nowIST.clone().startOf('week').toDate();

        const [allEmployees, weeklyCompletedLogs] = await Promise.all([
            User.find({ role: { $ne: 'admin' } }).select('_id employeeId name department'),
            TimeLog.find({ endTime: { $ne: null }, startTime: { $gte: startOfWeek } }),
        ]);

        const weeklyHoursMap = {}; // Key: Employee MongoDB ID, Value: Total Minutes

        weeklyCompletedLogs.forEach(log => {
            const userId = log.employeeId;
            weeklyHoursMap[userId] = (weeklyHoursMap[userId] || 0) + log.durationMinutes;
        });

        const analysis = allEmployees.map(user => {
            const userId = user._id.toString();
            const totalMinutes = weeklyHoursMap[userId] || 0;
            return {
                employeeId: user.employeeId,
                name: user.name,
                department: user.department,
                totalHoursThisWeek: (totalMinutes / MINUTES_PER_HOUR).toFixed(2)
            };
        });

        res.status(200).json({ status: true, data: analysis });

    } catch (error) {
        console.error("Weekly Hours Analysis Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};


export const getTodayActivityStatus = async (req, res) => {
    try {
        const nowIST = moment.tz(TIMEZONE);
        const todayStart = nowIST.clone().startOf('day').toDate();

        const [allEmployees, activeTimeLogs, todayLogs] = await Promise.all([
            User.find({ role: { $ne: 'admin' } }).select('_id'),
            TimeLog.find({ endTime: null }).select('employeeId'),
            TimeLog.find({ startTime: { $gte: todayStart } }).select('employeeId'),
        ]);

        const totalEmployees = allEmployees.length;

      
        const activeLogMap = new Map(activeTimeLogs.map(log => [log.employeeId, true]));
        const checkedInTodayIds = new Set(todayLogs.map(log => log.employeeId));

        const statusCounts = {
            activeWorking: 0,
            inactiveCheckedOut: 0,
            inactiveNotPunchedIn: 0,
            totalEmployees: totalEmployees,
        };

    
        for (const user of allEmployees) {
            const userId = user._id.toString();
            
       
            if (activeLogMap.has(userId)) {
                statusCounts.activeWorking++;
            } 
        
            else if (checkedInTodayIds.has(userId)) {
                statusCounts.inactiveCheckedOut++;
            } 
           
            else {
                statusCounts.inactiveNotPunchedIn++;
            }
        }
        
        const detailedActivityList = allEmployees.map(user => {
            const userId = user._id.toString();
            
            let status = 'Inactive (Not Punched In)';
            let statusDetails = 'N/A';
            const activeLog = activeTimeLogs.find(log => log.employeeId === userId);
            
            if (activeLog) {
                status = 'Active (Working)';
                statusDetails = moment(activeLog.startTime).fromNow(true); 
            } else if (checkedInTodayIds.has(userId)) {
                status = 'Inactive (Checked Out)';
            }
            
            return {
                employeeId: user.employeeId,
                name: user.name,
                status: status,
                timeSinceStart: statusDetails 
            };
        });

        res.status(200).json({ 
            status: true, 
            summary: {
                active: statusCounts.activeWorking,
                checkedOut: statusCounts.inactiveCheckedOut,
                notPunchedIn: statusCounts.inactiveNotPunchedIn,
                total: statusCounts.totalEmployees,
            },
            // Optionally include the detailed list for a drill-down view
            detailedList: detailedActivityList 
        });

    } catch (error) {
        console.error("Activity Status Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};


const STANDARD_DAILY_HOURS = 7; 

export const getWeeklyTargetAnalysis = async (req, res) => {
    try {
        const nowIST = moment.tz(TIMEZONE);
        const startOfWeek = nowIST.clone().startOf('isoWeek').toDate(); // Start of Monday
        const endOfWeek = nowIST.clone().endOf('isoWeek').toDate();   // End of Sunday
        
        // 1. Fetch Total Employee Count (to calculate the team's total target)
        const totalEmployees = await User.countDocuments({ role: { $ne: 'admin' } });
        const teamDailyTargetMinutes = totalEmployees * STANDARD_DAILY_HOURS * MINUTES_PER_HOUR;
        
        // 2. Fetch all TimeLogs for the current week
        const weeklyLogs = await TimeLog.find({
            startTime: { $gte: startOfWeek, $lte: endOfWeek }
        }).select('startTime endTime durationMinutes');

        // --- Data Aggregation ---
        // Map to store total minutes for each day of the week
        const dailyMinutes = {
            Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0,
        };

        weeklyLogs.forEach(log => {
            let logDurationMinutes = 0;
            const logStartTime = moment(log.startTime);
            const dayOfWeek = logStartTime.tz(TIMEZONE).format('ddd'); // e.g., 'Mon'

            if (log.endTime) {
                // Log is completed
                logDurationMinutes = log.durationMinutes;
            } else {
                // Log is currently active (Calculate live duration up to now)
                logDurationMinutes = nowIST.diff(logStartTime, 'minutes');
            }
            
            // Note: Since a single log might span across a date change, this logic assumes 
            // the entire log belongs to the starting day. For multi-day accuracy, 
            // MongoDB aggregation by date is better, but this simple iteration is faster.
            if (dailyMinutes.hasOwnProperty(dayOfWeek)) {
                 dailyMinutes[dayOfWeek] += logDurationMinutes;
            }
        });

        // 3. Final Formatting and Comparison
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const analysis = dayNames.map(day => {
            const actualMinutes = dailyMinutes[day] || 0;
            const actualHours = (actualMinutes / MINUTES_PER_HOUR).toFixed(2);
            const targetHours = (teamDailyTargetMinutes / MINUTES_PER_HOUR).toFixed(2);
            
            // Determine Status: Met (✅) or Below (⚠️)
            let status;
            if (actualMinutes >= teamDailyTargetMinutes) {
                status = 'Met'; // ✅
            } else if (day === nowIST.format('ddd')) {
                // Only show "Below" if it's past the current day
                status = 'Live'; // If today, it's live tracking
            } else if (actualMinutes > 0) {
                 status = 'Below'; // ⚠️
            } else {
                 status = 'Zero';
            }


            return {
                day: day,
                targetHours: parseFloat(targetHours),
                actualHours: parseFloat(actualHours),
                status: status
            };
        });

        res.status(200).json({ 
            status: true, 
            totalEmployees: totalEmployees,
            dailyTargetHoursPerEmployee: STANDARD_DAILY_HOURS,
            data: analysis 
        });

    } catch (error) {
        console.error("Weekly Target Analysis Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};



export const getEmployeeManagementSummary = async (req, res) => {
    try {
        const nowIST = moment.tz(TIMEZONE);
        const todayStart = nowIST.clone().startOf('day').toDate();

     
        const [allEmployees, activeTimeLogs, todayLogs] = await Promise.all([
            // Fetch all non-admin users with department info
            User.find({ role: { $ne: 'admin' } }).select('_id employeeId name department'),
            // Find users with an open TimeLog (Active Now)
            TimeLog.find({ endTime: null }).select('employeeId'), 
            // Find users who have logged ANY time today (Checked In Today)
            TimeLog.find({ startTime: { $gte: todayStart } }).select('employeeId'), 
        ]);

        const totalEmployees = allEmployees.length;

        // Maps and Sets for efficient lookups and calculations
        const activeUserIds = new Set(activeTimeLogs.map(log => log.employeeId));
        const checkedInTodayIds = new Set(todayLogs.map(log => log.employeeId));

      
        const activeNowCount = activeUserIds.size;
        
        const onLeaveCount = totalEmployees - checkedInTodayIds.size;

        
        const departmentBreakdown = {};

        // Iterate through all employees to categorize by department and active status
        for (const user of allEmployees) {
            const userIdString = user._id.toString();
            const dept = user.department || 'Unassigned';
            
            // Initialize department object if it doesn't exist
            if (!departmentBreakdown[dept]) {
                departmentBreakdown[dept] = { 
                    department: dept,
                    totalEmployees: 0, 
                    activeNow: 0 
                };
            }
            
            // Increment total employees for the department
            departmentBreakdown[dept].totalEmployees++;
            
            // Increment active users if their ID is in the active set
            if (activeUserIds.has(userIdString)) {
                departmentBreakdown[dept].activeNow++;
            }
        }

        // --- 4. Final Formatting ---
        const overallSummary = {
            totalEmployees: totalEmployees,
            activeNow: activeNowCount,
            onLeave: onLeaveCount < 0 ? 0 : onLeaveCount, 
        };
        
        // Convert the department object into a clean array
        const departmentArray = Object.values(departmentBreakdown);


        res.status(200).json({
            status: true,
            data: {
                overallSummary: overallSummary,
                departmentBreakdown: departmentArray,
            }
        });

    } catch (error) {
        console.error("Employee Management Summary Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const { search } = req.query; 
        
      
        let query = { role: { $ne: 'admin' } };

        if (search) {
    
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { name: searchRegex },
                { employeeId: searchRegex },
                { department: searchRegex },
                { email: searchRegex } 
            ];
        }

     
        const employees = await User.find(query).select(
            'name employeeId email department role dateOfJoining phone address dateOfBirth designation status'
          
        ).sort({ employeeId: 1 }); 

        res.status(200).json({ 
            status: true, 
            count: employees.length,
            data: employees 
        });

    } catch (error) {
        console.error("Get All Employees Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};


export const getEmployeesWithAverages = async (req, res) => {
    try {
        const nowIST = moment.tz(TIMEZONE);
        const startOfWeek = nowIST.clone().startOf('isoWeek').toDate();
        const startOfMonth = nowIST.clone().startOf('month').toDate();

   
        const employees = await User.find({ role: { $ne: 'admin' } })
            .select('employeeId name department role')
            .lean(); 

        const timeStats = await TimeLog.aggregate([
            {
                $match: {
                    startTime: { $gte: startOfMonth }, 
                    endTime: { $ne: null }             
                }
            },
            {
                $group: {
                    _id: "$employeeId",
                    totalMinutesMonth: { $sum: "$durationMinutes" },
                    totalMinutesWeek: {
                        $sum: {
                            $cond: [{ $gte: ["$startTime", startOfWeek] }, "$durationMinutes", 0]
                        }
                    }
                }
            }
        ]);

    
        const statsMap = new Map(timeStats.map(s => [s._id, s]));

       
        const currentDayOfMonth = nowIST.date(); 
        // Calculate how many days have passed in the current week (e.g., Mon=1, Tue=2...)
        const daysPassedInWeek = nowIST.isoWeekday(); 

        const data = employees.map(emp => {
            const stats = statsMap.get(emp._id.toString()) || { totalMinutesMonth: 0, totalMinutesWeek: 0 };
            
            // Weekly Average: Total Week Hours / Days passed in work week
            const weeklyAvg = (stats.totalMinutesWeek / MINUTES_PER_HOUR) / daysPassedInWeek;
            
            // Monthly Average: Total Month Hours / Days passed in month
            const monthlyAvg = (stats.totalMinutesMonth / MINUTES_PER_HOUR) / currentDayOfMonth;

            return {
                ...emp,
                weekAvgHours: weeklyAvg.toFixed(2),
                monthAvgHours: monthlyAvg.toFixed(2)
            };
        });

        res.status(200).json({
            status: true,
            count: data.length,
            data: data
        });

    } catch (error) {
        console.error("Get Employees with Averages Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};


// attendence dashboard 


export const getAttendanceOverview = async (req, res) => {
    try {
        const { date } = req.query;
        const TIMEZONE = "Asia/Kolkata";
        const targetDate = date 
            ? moment.tz(date, TIMEZONE).startOf('day').toDate() 
            : moment.tz(TIMEZONE).subtract(1, 'day').startOf('day').toDate();

        const [totalEmployees, attendanceRecords] = await Promise.all([
            User.countDocuments({ role: { $ne: 'admin' } }),
            Attendance.find({ date: targetDate })
        ]);

        const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
        const leaveCount = attendanceRecords.filter(r => r.status === 'Leave').length;
        const absentCount = totalEmployees - (presentCount + leaveCount);
        
        const percentage = totalEmployees > 0 ? ((presentCount / totalEmployees) * 100).toFixed(2) : 0;
        const totalMinutes = attendanceRecords.reduce((sum, r) => sum + (r.totalTime || 0), 0);
        const avgHours = presentCount > 0 ? (totalMinutes / 60 / presentCount).toFixed(2) : 0;

        res.status(200).json({
            status: true,
            data: {
                totalEmployees,
                present: presentCount,
                absent: Math.max(0, absentCount),
                leave: leaveCount,
                attendancePercentage: `${percentage}%`,
                averageWorkHours: avgHours
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const getAttendanceStatusChart = async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date ? new Date(date) : new Date();
        targetDate.setHours(0,0,0,0);

        const totalEmp = await User.countDocuments({ role: { $ne: 'admin' }, isActive: true });
        const records = await Attendance.find({ date: targetDate });

        const present = records.filter(r => r.status === 'Present').length;
        const leave = records.filter(r => r.status === 'Leave').length;
        const absent = totalEmp - (present + leave);

        res.status(200).json({
            status: true,
            data: [
                { label: 'Present', value: present, color: '#4CAF50' },
                { label: 'Absent', value: Math.max(0, absent), color: '#F44336' },
                { label: 'On Leave', value: leave, color: '#2196F3' }
            ]
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const getAttendanceByDept = async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date ? new Date(date) : new Date();
        targetDate.setHours(0,0,0,0);

        const employees = await User.find({ role: { $ne: 'admin' }, isActive: true }).select('department');
        const attendance = await Attendance.find({ date: targetDate });

        const deptMap = {};
        employees.forEach(emp => {
            const d = emp.department || 'Other';
            if (!deptMap[d]) deptMap[d] = { total: 0, present: 0 };
            deptMap[d].total++;
        });

        attendance.forEach(rec => {
            const user = employees.find(e => e._id.toString() === rec.employeeId.toString());
            if (user && rec.status === 'Present') {
                deptMap[user.department || 'Other'].present++;
            }
        });

        const stats = Object.keys(deptMap).map(name => ({
            department: name,
            present: deptMap[name].present,
            total: deptMap[name].total,
            percentage: ((deptMap[name].present / deptMap[name].total) * 100).toFixed(2)
        }));

        res.status(200).json({ status: true, data: stats });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const getDetailedAttendanceList = async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date ? new Date(date) : new Date();
        targetDate.setHours(0,0,0,0);

        const [employees, records] = await Promise.all([
            User.find({ role: { $ne: 'admin' }, isActive: true }).select('employeeId name role department'),
            Attendance.find({ date: targetDate })
        ]);

        const recordMap = new Map(records.map(r => [r.employeeId.toString(), r]));

        const detailedList = employees.map(emp => {
            const att = recordMap.get(emp._id.toString());
            return {
                employeeId: emp.employeeId,
                name: emp.name,
                role: emp.role,
                department: emp.department,
                checkIn: att?.inTime ? moment(att.inTime).format('hh:mm A') : 'N/A',
                checkOut: att?.outTime ? moment(att.outTime).format('hh:mm A') : 'N/A',
                workHours: att?.totalTime ? (att.totalTime / 60).toFixed(2) + ' hrs' : '0:00',
                status: att?.status || 'Absent'
            };
        });

        res.status(200).json({ status: true, data: detailedList });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

//  weekly attendance 

export const getWeeklySummaryStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const TIMEZONE = "Asia/Kolkata";

        const start = startDate 
            ? moment.tz(startDate, TIMEZONE).startOf('day').toDate() 
            : moment.tz(TIMEZONE).startOf('isoWeek').toDate();
        const end = endDate 
            ? moment.tz(endDate, TIMEZONE).endOf('day').toDate() 
            : moment.tz(TIMEZONE).endOf('isoWeek').toDate();

        const diffDays = moment(end).diff(moment(start), 'days') + 1;

        const [totalEmployees, records] = await Promise.all([
            User.countDocuments({ role: { $ne: 'admin' }, isActive: true }),
            Attendance.find({ date: { $gte: start, $lte: end } })
        ]);

        const totalPresent = records.filter(r => r.status === 'Present').length;
        const totalLeave = records.filter(r => r.status === 'Leave').length;
        
        const totalCapacity = totalEmployees * diffDays;
        const totalAbsent = totalCapacity - (totalPresent + totalLeave);
        const avgAttendance = totalCapacity > 0 ? ((totalPresent / totalCapacity) * 100).toFixed(2) : 0;

        res.status(200).json({
            status: true,
            range: { start, end, totalDays: diffDays },
            data: {
                averageAttendance: `${avgAttendance}%`,
                totalPresent,
                totalAbsent: Math.max(0, totalAbsent),
                totalLeave
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getWeeklyTrendData = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const TIMEZONE = "Asia/Kolkata";

        const start = startDate ? moment.tz(startDate, TIMEZONE).startOf('day') : moment.tz(TIMEZONE).startOf('isoWeek');
        const end = endDate ? moment.tz(endDate, TIMEZONE).endOf('day') : moment.tz(TIMEZONE).endOf('isoWeek');

        const totalEmployees = await User.countDocuments({ role: { $ne: 'admin' }, isActive: true });
        const records = await Attendance.find({ date: { $gte: start.toDate(), $lte: end.toDate() } });

        const chartData = [];
        let current = start.clone();

        while (current.isSameOrBefore(end, 'day')) {
            const dayRecords = records.filter(r => moment(r.date).isSame(current, 'day'));
            const present = dayRecords.filter(r => r.status === 'Present').length;
            const leave = dayRecords.filter(r => r.status === 'Leave').length;
            const absent = totalEmployees - (present + leave);

            chartData.push({
                day: current.format('ddd'),
                date: current.format('YYYY-MM-DD'),
                present: present,
                absent: Math.max(0, absent)
            });
            current.add(1, 'days');
        }

        res.status(200).json({ status: true, data: chartData });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const getWeeklyDetailedReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const TIMEZONE = "Asia/Kolkata";

        const start = startDate ? moment.tz(startDate, TIMEZONE).startOf('day') : moment.tz(TIMEZONE).startOf('isoWeek');
        const end = endDate ? moment.tz(endDate, TIMEZONE).endOf('day') : moment.tz(TIMEZONE).endOf('isoWeek');

        const totalEmployees = await User.countDocuments({ role: { $ne: 'admin' }, isActive: true });
        const records = await Attendance.find({ date: { $gte: start.toDate(), $lte: end.toDate() } });

        const report = [];
        let current = start.clone();

        while (current.isSameOrBefore(end, 'day')) {
            const dayRecords = records.filter(r => moment(r.date).isSame(current, 'day'));
            const present = dayRecords.filter(r => r.status === 'Present').length;
            const leave = dayRecords.filter(r => r.status === 'Leave').length;
            const absent = totalEmployees - (present + leave);
            
            const percentage = totalEmployees > 0 ? ((present / totalEmployees) * 100).toFixed(2) : 0;
            const totalMinutes = dayRecords.reduce((sum, r) => sum + (r.totalTime || 0), 0);
            const avgHours = present > 0 ? (totalMinutes / 60 / present).toFixed(2) : 0;
            const status = percentage >= 80 ? "Good" : "Bad";

            report.push({
                day: current.format('dddd'),
                date: current.format('YYYY-MM-DD'),
                present,
                absent: Math.max(0, absent),
                percentage: `${percentage}%`,
                averageHours: avgHours,
                status: status
            });
            current.add(1, 'days');
        }

        res.status(200).json({ status: true, data: report });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


//  monthly attendance 


export const getMonthlyAttendanceOverview = async (req, res) => {
    try {
        const { month, year } = req.query;
        const TIMEZONE = "Asia/Kolkata";

        const targetDate = moment.tz(TIMEZONE);
        const selectedMonth = month ? parseInt(month) - 1 : targetDate.month();
        const selectedYear = year ? parseInt(year) : targetDate.year();

        const startOfMonth = moment.tz([selectedYear, selectedMonth], TIMEZONE).startOf('month');
        const endOfMonth = startOfMonth.clone().endOf('month');

        const [totalEmployees, attendanceRecords, officialHolidays] = await Promise.all([
            User.countDocuments({ role: { $ne: 'admin' }, isActive: true }),
            Attendance.find({ date: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() } }),
            Holiday.find({ date: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() } })
        ]);

        const holidayDates = new Set(officialHolidays.map(h => moment(h.date).format('YYYY-MM-DD')));

        let businessDaysCount = 0;
        let current = startOfMonth.clone();

        while (current.isSameOrBefore(endOfMonth, 'day')) {
            const dateStr = current.format('YYYY-MM-DD');
            const dayOfWeek = current.day(); 
            const dayOfMonth = current.date();

            let isOffDay = false;

       
            if (dayOfWeek === 0) {
                isOffDay = true;
            }
            
            else if (dayOfWeek === 6) {
                const isFirstSaturday = dayOfMonth <= 7;
                const isThirdSaturday = dayOfMonth >= 15 && dayOfMonth <= 21;
                if (isFirstSaturday || isThirdSaturday) isOffDay = true;
            }
         
            else if (holidayDates.has(dateStr)) {
                isOffDay = true;
            }

            if (!isOffDay) businessDaysCount++;
            current.add(1, 'days');
        }

        const totalPresent = attendanceRecords.filter(r => r.status === 'Present').length;
        const totalLeave = attendanceRecords.filter(r => r.status === 'Leave').length;

      
        const totalCapacity = totalEmployees * businessDaysCount;
        const totalAbsent = totalCapacity - (totalPresent + totalLeave);
        const avgAttendance = totalCapacity > 0 
            ? ((totalPresent / totalCapacity) * 100).toFixed(2) 
            : 0;

        res.status(200).json({
            status: true,
            month: startOfMonth.format('MMMM YYYY'),
            data: {
                totalBusinessDays: businessDaysCount,
                totalEmployees,
                totalPresent,
                totalAbsent: Math.max(0, totalAbsent),
                totalLeave,
                averageAttendance: `${avgAttendance}%`
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};



//  get registred user 

export const getRegisteredClients  = async (req, res) =>{
    try{
        const clients = await User.find({role:ROLES.CLIENT}).select("name email mobile designation department profilePicture createdAt")
        .sort({createdAt: -1});

        res.status(200).json({
           status: true,
      message: "Registered clients fetched successfully",
      data: clients,
        })

    }catch(error){
          res.status(500).json({
      status: false,
      message: error.message,
    });

    }
}


//  grant permission to user's

export const updateSpecificPermission = async (req, res)=>{
    try{

        const {userId}= req.params;
        const {permission, action} = req.body;

        const user = await User.findById(userId);
       if (!user) return res.status(404).json({ message: "User not found" });

       if(action === "grant"){
        if(!user.permissions.includes(permission)){
            user.permissions.push(permission);
        }
    }else if(action === "revoke"){

             user.permissions.pop(permission);
        }

        await user.save();
        res.status(200).json({ status: true, message: `Permission ${action}ed`, permissions: user.permissions });
       }

    catch(error){
    res.status(500).json({ status: false, message: error.message });
    }
}