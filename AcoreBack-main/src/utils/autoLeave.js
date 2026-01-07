// import cron from "node-cron";
// import Attendance from "../models/attendance.model.js";
// import Leave from "../models/leave.model.js";
// import User from "../models/user.model.js";
// import Holiday from "../models/holiday.model.js";

// export const runAutoLeave = async () => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   try {
//     const holiday = await Holiday.findOne({
//       date: today,
//     });
//     if (holiday) {
//       console.log("Today is a holiday. No auto-leave will be marked.");
//       return;
//     }

//     const employees = await User.find();

//     for (const emp of employees) {
//       const attendance = await Attendance.findOne({
//         employeeId: emp.employeeId,
//         date: today,
//       });

//       const leaveExists = await Leave.findOne({
//         employeeId: emp.employeeId,
//         fromDate: today,
//         toDate: today,
//       });

//       // No attendance OR missing punchOut
//       if (!leaveExists && (!attendance || !attendance.punchOut)) {
//         await Leave.create({
//           employeeId: emp.employeeId,
//           employeeName: emp.name,
//           leaveType: "unpaid",
//           reason: attendance ? "Did not punch out" : "Did not punch in",
//           fromDate: today,
//           toDate: today,
//           days: 1,
//           status: "approved",
//           applyType: "absent",
//         });
//         console.log(`Auto-leave added for ${emp.employeeId}`);
//       }
//     }
//   } catch (error) {
//     console.error("Error in auto-leave:", error.message);
//   }
// };

// // shedular to run this auto leave function

// export const scheduleAutoLeave = () => {
//   cron.schedule("0 0 * * *", async () => {
//     console.log("Running daily auto-leave check at 12:00 AM...");
//     await runAutoLeave();
//   });
// };





// //     // Cron expression: 15 minutes past 11 AM, every day
// //     cron.schedule("15 11 * * *", async () => {
// //         console.log("Running daily auto-leave check at 11:15 AM...");
// //         await runAutoLeave();
// //     });
// // };





import cron from 'node-cron';
import moment from 'moment-timezone';
import TimeLog from '../models/TimeLog.model.js';
import Attendance from '../models/attendance.model.js';
import Leave from '../models/leave.model.js';
import User from '../models/user.model.js';
import Holiday from '../models/holiday.model.js';

const TIMEZONE = "Asia/Kolkata";
const MINUTES_PER_HOUR = 60;

const autoCloseTimeLogs = async () => {
    try {
        const endOfYesterday = moment.tz(TIMEZONE).subtract(1, 'day').endOf('day').toDate(); 
        
        const openLogs = await TimeLog.find({
            endTime: null,
            startTime: { $lt: endOfYesterday } 
        });

        if (openLogs.length === 0) return;

        const updates = openLogs.map(log => {
            const logStartTime = moment(log.startTime);
            const durationMs = endOfYesterday.getTime() - logStartTime.toDate().getTime();
            const totalMinutes = Math.floor(durationMs / (1000 * MINUTES_PER_HOUR)); 
            
            return TimeLog.updateOne(
                { _id: log._id },
                {
                    $set: {
                        endTime: endOfYesterday,
                        durationMinutes: totalMinutes > 0 ? totalMinutes : 0,
                        closureReason: "System Auto-Close: Missing Punch Out",
                    }
                }
            );
        });

        await Promise.all(updates);
    } catch (error) {
        console.error("TimeLog Cleanup Error:", error);
    }
};

const runAutoLeave = async () => {
    try {
        const yesterdayMoment = moment.tz(TIMEZONE).subtract(1, 'day');
        const targetDateStr = yesterdayMoment.format("YYYY-MM-DD");
        const targetDateObj = yesterdayMoment.clone().startOf('day').toDate();
        const endOfYesterday = yesterdayMoment.clone().endOf('day').toDate();

        const holiday = await Holiday.findOne({ date: targetDateObj });
        if (holiday) return;

        const employees = await User.find({ role: { $ne: 'admin' } });

        for (const emp of employees) {
            const existingLeave = await Leave.findOne({ 
                employeeId: emp.employeeId, 
                fromDate: targetDateObj 
            });
            if (existingLeave) continue;

            const attendance = await Attendance.findOne({ 
                employeeId: emp.employeeId, 
                date: targetDateStr 
            });

            if (!attendance) {
                await Leave.create({
                    employeeId: emp.employeeId,
                    employeeName: emp.name,
                    leaveType: "unpaid",
                    reason: "Absent: No Punch-in recorded",
                    fromDate: targetDateObj,
                    toDate: targetDateObj,
                    days: 1,
                    status: "approved",
                    applyType: "absent",
                });
                continue;
            } 

            if (attendance && !attendance.outTime) { 
                await Leave.create({
                    employeeId: emp.employeeId,
                    employeeName: emp.name,
                    leaveType: "unpaid",
                    reason: "Absent: Did not punch out",
                    fromDate: targetDateObj,
                    toDate: targetDateObj,
                    days: 1,
                    status: "approved",
                    applyType: "absent",
                });

                attendance.outTime = "11:59:59 PM (System Closed)";
                attendance.totalTime = "Incomplete";
                attendance.status = "auto"
                await attendance.save();

                await TimeLog.updateOne(
                    { employeeId: emp._id, endTime: null },
                    { 
                        $set: { 
                            endTime: endOfYesterday,
                            durationMinutes: 0,
                            closureReason: "Auto-Closed: Missing Punch Out"
                        }
                    }
                );
            }
        }
    } catch (error) {
        console.error("AutoLeave Error:", error);
    }
};

export const startAllSchedulers = () => {
    cron.schedule('1 0 * * *', async () => {
        await autoCloseTimeLogs();
        await runAutoLeave();
    }, {
        scheduled: true,
        timezone: TIMEZONE, 
    });
};



//  for test 

// import cron from 'node-cron';
// import moment from 'moment-timezone';
// import TimeLog from '../models/TimeLog.model.js';
// import Attendance from '../models/attendance.model.js';
// import Leave from '../models/leave.model.js';
// import User from '../models/user.model.js';
// import Holiday from '../models/holiday.model.js';

// const TIMEZONE = "Asia/Kolkata";
// const MINUTES_PER_HOUR = 60;

// const autoCloseTimeLogs = async () => {
//     try {
//         // TESTING: Check for logs started before the current moment
//         const now = moment.tz(TIMEZONE).toDate(); 
        
//         console.log(`[TEST] Checking for open logs before: ${now}`);

//         const openLogs = await TimeLog.find({
//             endTime: null
//         });

//         if (openLogs.length === 0) {
//             console.log("[TEST] No open TimeLogs found.");
//             return;
//         }

//         const updates = openLogs.map(log => {
//             return TimeLog.updateOne(
//                 { _id: log._id },
//                 {
//                     $set: {
//                         endTime: now,
//                         durationMinutes: 5, // Hardcoded for test
//                         closureReason: "TEST MODE: Auto-Close",
//                     }
//                 }
//             );
//         });

//         await Promise.all(updates);
//         console.log(`[TEST] Successfully closed ${openLogs.length} TimeLogs.`);
//     } catch (error) {
//         console.error("Cleanup Error:", error);
//     }
// };

// const runAutoLeave = async () => {
//     try {
//         // TESTING: Use TODAY'S date to see immediate results
//         const todayMoment = moment.tz(TIMEZONE);
//         const targetDateStr = todayMoment.format("YYYY-MM-DD");
//         const targetDateObj = todayMoment.clone().startOf('day').toDate();

//         console.log(`[TEST] Running Auto-Leave for TODAY: ${targetDateStr}`);

//         const employees = await User.find({ role: { $ne: 'admin' } });

//         for (const emp of employees) {
//             // Skip if Leave already exists for today
//             const existingLeave = await Leave.findOne({ 
//                 employeeId: emp.employeeId, 
//                 fromDate: targetDateObj 
//             });
//             if (existingLeave) continue;

//             const attendance = await Attendance.findOne({ 
//                 employeeId: emp.employeeId, 
//                 date: targetDateStr 
//             });

//             if (!attendance) {
//                 await Leave.create({
//                     employeeId: emp.employeeId,
//                     employeeName: emp.name,
//                     leaveType: "unpaid",
//                     reason: "TEST: Absent (No Punch-in)",
//                     fromDate: targetDateObj,
//                     toDate: targetDateObj,
//                     days: 1,
//                     status: "approved",
//                     applyType: "absent",
//                 });
//                 console.log(`[TEST] Created Leave for ${emp.employeeId}`);
//             } 

//             if (attendance && !attendance.outTime) { 
//                 await Leave.create({
//                     employeeId: emp.employeeId,
//                     employeeName: emp.name,
//                     leaveType: "unpaid",
//                     reason: "TEST: Absent (No Punch-out)",
//                     fromDate: targetDateObj,
//                     toDate: targetDateObj,
//                     days: 1,
//                     status: "approved",
//                     applyType: "absent",
//                 });

//                 attendance.outTime = "TEST-CLOSED";
//                 attendance.totalTime = "Incomplete";
//                 attendance.status = 'auto';
//                 await attendance.save();

//                 await TimeLog.updateOne(
//                     { employeeId: emp._id, endTime: null },
//                     { $set: { endTime: new Date(), closureReason: "TEST-AUTO-CLOSE" } }
//                 );
//                 console.log(`[TEST] Processed missing punch-out for ${emp.employeeId}`);
//             }
//         }
//     } catch (error) {
//         console.error("AutoLeave Error:", error);
//     }
// };

// export const startAllSchedulers = () => {
//     // RUNS EVERY MINUTE FOR TESTING
//     cron.schedule('* * * * *', async () => {
//         console.log("--- TEST SCHEDULER TRIGGERED ---");
//         await autoCloseTimeLogs();
//         await runAutoLeave();
//     }, {
//         scheduled: true,
//         timezone: TIMEZONE, 
//     });
    
//     console.log("Scheduler is running in TEST MODE (Every Minute)");
// };