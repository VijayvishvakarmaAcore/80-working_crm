// // In controllers/attendance.controller.js (or wherever your checkIn logic resides)

// import Attendance from '../models/attendance.model.js';
// import TimeLog from '../models/timeLog.model.js';

// export const checkIn = async (req, res) => {
//     try {
//         const employeeId = req.user._id;
//         const punchInTime = new Date();
        
//         // --- 1. Create Attendance Record ---
//         const newAttendance = await Attendance.create({
//             employeeId: employeeId,
//             checkIn: punchInTime,
//             // ... other attendance fields (e.g., location) ...
//         });

//         // --- 2. Create Automatic TimeLog (Start) ---
//         await TimeLog.create({
//             employeeId: employeeId,
//             startTime: punchInTime, // Start time is the exact punch-in time
//             endTime: null, // Timer is running
//             // taskId is omitted
//         });

//         res.status(201).json({ 
//             status: true, 
//             message: "Checked in successfully. Work time tracking started.", 
//             attendance: newAttendance 
//         });

//     } catch (error) {
//         console.error("Check-In Error:", error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };