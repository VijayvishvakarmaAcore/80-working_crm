

import moment from "moment-timezone";
import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import TimeLog from "../models/TimeLog.model.js";
import Leave from "../models/leave.model.js"

// export const markAttendance = async (req, res) => {
//     try {
       
//         const { employeeId } = req.body; 

//         const user = await User.findOne({ employeeId });
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found",
//             });
//         }

//         // Always create date in India timezone (Asia/Kolkata)
//         const nowIST = moment().tz("Asia/Kolkata");
        
//         // Date key: Midnight IST, stored as UTC Date object (for consistent querying)
//         const dateOnly = nowIST.clone().startOf("day").toDate(); 
        
//         // Exact punch-in time: The moment the server receives the request
//         const inTime = nowIST.toDate(); 

//         const existing = await Attendance.findOne({ employeeId, date: dateOnly });
//         if (existing) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Attendance already marked for today.",
//             });
//         }

//         const attendance = await Attendance.create({
//             employeeId,
//             inTime,
//             date: dateOnly,
//             status: "present",
//         });



//         try {
//              await TimeLog.create({
            
//                 employeeId: user._id, 
//                 startTime: inTime, 
//                 endTime: null,     // Timer is running
             
//             });
//         } catch (timeLogError) {
//             // Log the error but don't halt the attendance process if time log creation fails
//             console.error("TimeLog creation failed during punch-in:", timeLogError);
//         }
//         // ==========================================================

//         res.status(201).json({ 
//             status: true, 
//             data: attendance, 
//             message: "Punch-in successful. Work time tracking started." 
//         });

//         // res.status(201).json({ status: true, data: attendance, message: "Punch-in successful" });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const markOutTime = async (req, res) => {
//     try {
//         // SECURITY NOTE: We only take employeeId from the body; outTime is generated on the server.
//         const { employeeId } = req.body; 


//         const user = await User.findOne({ employeeId }).select('_id');
        
//         if (!user) {
//              return res.status(404).json({
//                 status: false,
//                 message: "User not found (by custom ID).",
//             });
//         }
        
//         const mongoUserId = user._id.toString();

//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateOnly = nowIST.clone().startOf("day").toDate();
//         const outTime = nowIST.toDate(); // Server-generated outTime

//         const attendance = await Attendance.findOne({ employeeId, date: dateOnly });

//         if (!attendance) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Attendance not found for today. Did you punch in?",
//             });
//         }
        
//         // Check to prevent punching out twice
//         if (attendance.outTime) {
//              return res.status(400).json({
//                 status: false,
//                 message: "Punch-out already recorded for today.",
//             });
//         }

//         attendance.outTime = outTime;

//         // Calculate total working hours in minutes for accuracy
//         if (attendance.inTime) {
//             // Calculate total milliseconds elapsed
//             const totalMs = outTime.getTime() - new Date(attendance.inTime).getTime();
            
//             // Convert to total minutes
//             const totalMinutes = Math.floor(totalMs / (1000 * 60)); 
            
//             // Convert total minutes into hours and remaining minutes for display format
//             const hours = Math.floor(totalMinutes / 60);
//             const minutes = totalMinutes % 60;

//             attendance.totalTime = `${hours}h ${minutes}m`;
//         }

//         await attendance.save();

//         try {
       
//             const runningTimeLog = await TimeLog.findOne({ 
//                 employeeId: mongoUserId, // Use the same identifier as stored in TimeLog
//                 endTime: null 
//             });

//             if (runningTimeLog) {
//                 // Use the duration calculated from the Attendance process
//                 const durationMinutes = totalMinutesForDisplay; 
                
//                 // Update and close the TimeLog record
//                 await TimeLog.findByIdAndUpdate(
//                     runningTimeLog._id,
//                     { 
//                         endTime: outTime, 
//                         durationMinutes: durationMinutes 
//                     }
//                 );
//                 console.log(`TimeLog closed for ${employeeId}. Duration: ${durationMinutes} minutes.`);

//             } else {
//                 console.warn(`No active TimeLog found for ${employeeId} during punch-out. Proceeding with attendance only.`);
//             }

//         } catch (timeLogError) {
//             // Log the error but ensure the punch-out response proceeds
//             console.error("TimeLog closing failed during punch-out:", timeLogError);
//         }
//         // ==========================================================

//         res.json({
//             status: true,
//             message: "Punch-out successful and work time tracking stopped.",
//             data: attendance,
//         });

//         // res.json({
//         //     status: true,
//         //     message: "Punch-out successful",
//         //     data: attendance,
//         // });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };



//  time from backend 

// export const markAttendance = async (req, res) => {
//     try {
        
//         const { employeeId: customEmployeeId } = req.body; 
//         const user = await User.findOne({ employeeId: customEmployeeId });
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found",
//             });
//         }
        
//         const mongoUserId = user._id.toString(); 
        

       

//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateOnly = nowIST.clone().startOf("day").toDate(); 
//         const inTime = nowIST.toDate(); 

//         const existingAttendance = await Attendance.findOne({ employeeId: customEmployeeId, date: dateOnly });
//         if (existingAttendance) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Attendance already marked for today.",
//             });
//         }
        
//         const existingOpenTimeLog = await TimeLog.findOne({ 
//             employeeId: mongoUserId, 
//             endTime: null 
//         });

//         if (existingOpenTimeLog) {
           
//              return res.status(400).json({ 
//                  status: false,
//                  message: "Previous work session was not properly closed. Please contact support or check out first.",
//              });
//         }


//         const attendance = await Attendance.create({
//             employeeId: customEmployeeId,
//             inTime,
//             date: dateOnly,
//             status: "present",
//         });

//         try {
//              await TimeLog.create({
//                 employeeId: mongoUserId, 
//                 startTime: inTime,
//                 endTime: null,
//             });
//         } catch (timeLogError) {
//             console.error("TimeLog creation failed during punch-in:", timeLogError);
//         }

//         res.status(201).json({ 
//             status: true, 
//             data: attendance, 
//             message: "Punch-in successful. Work time tracking started." 
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const markAttendance = async (req, res) => {
//     try {
//         const { employeeId: customEmployeeId } = req.body; 

//         const user = await User.findOne({ employeeId: customEmployeeId });
//         if (!user) {
//             return res.status(404).json({ status: false, message: "User not found" });
//         }

//         const nowIST = moment().tz("Asia/Kolkata");
         
//         const dateStr = nowIST.format("YYYY-MM-DD");  
//         const timeStr = nowIST.format("hh:mm:ss A");  
 
//         const existingAttendance = await Attendance.findOne({ 
//             employeeId: customEmployeeId, 
//             date: dateStr 
//         });

//         if (existingAttendance) {
//             return res.status(400).json({ status: false, message: "Attendance already marked." });
//         }
 
//         const attendance = await Attendance.create({
//             employeeId: customEmployeeId,
//             date: dateStr, 
//             inTime: timeStr, 
//             status: "present",
//         });
 
//         try {
//             await TimeLog.create({
//                 employeeId: user._id, 
//                 startTime: nowIST.toDate(),  
//                 endTime: null,
//             });
//         } catch (err) { console.error(err); }

//         res.status(201).json({ 
//             status: true, 
//             message: "Punch-in successful.",
//             data: attendance  
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


export const markAttendance = async (req, res) => {
    try {
        const { employeeId: customEmployeeId, latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({
                status: false,
                message: "Location is required for punch-in"
            });
        }

        // ********* OFFICE LOCATION **********
        const OFFICE_LAT = 22.7494444;
        const OFFICE_LNG = 75.8991667;
        const ALLOWED_RADIUS = 200; // meters

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371000;
            const φ1 = lat1 * Math.PI / 180;
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;

            const a =
                Math.sin(Δφ / 2) ** 2 +
                Math.cos(φ1) *
                Math.cos(φ2) *
                Math.sin(Δλ / 2) ** 2;

            return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        }

        const distance = calculateDistance(latitude, longitude, OFFICE_LAT, OFFICE_LNG);

        if (distance > ALLOWED_RADIUS) {
            return res.status(401).json({
                status: false,
                message: `You are ${Math.floor(distance)}m away! Punch-In allowed only inside office range`
            });
        }

        const user = await User.findOne({ employeeId: customEmployeeId });
        if (!user) return res.status(404).json({ status: false, message: "User not found" });

        const nowIST = moment().tz("Asia/Kolkata");
        const dateStr = nowIST.format("YYYY-MM-DD");
        const timeStr = nowIST.format("hh:mm:ss A");

        const existingAttendance = await Attendance.findOne({
            employeeId: customEmployeeId,
            date: dateStr
        });

        if (existingAttendance) {
            return res.status(400).json({ status: false, message: "Attendance already marked." });
        }

        const attendance = await Attendance.create({
            employeeId: customEmployeeId,
            date: dateStr,
            inTime: timeStr,
            status: "present",
            location: {
                lat: latitude,
                lng: longitude
            },
            punchSource: "electron/web"
        });

        try {
            await TimeLog.create({
                employeeId: user._id,
                startTime: nowIST.toDate(),
                endTime: null
            });
        } catch (err) {
            console.error("TimeLog Error:", err);
        }

        res.status(201).json({
            status: true,
            message: "Punch-in successful",
            data: attendance
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// time from clien side 

// export const markAttendance = async (req, res) => {
//     try {
//         // 1. Get custom employeeId AND the client-side inTime
//         const { employeeId: customEmployeeId, clientInTime } = req.body;

//         if (!clientInTime) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Check-in time is required from the client.",
//             });
//         }

//         const user = await User.findOne({ employeeId: customEmployeeId });
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found",
//             });
//         }

//         const mongoUserId = user._id.toString();
        
//         const inTime = new Date(clientInTime); 
//         const dateOnly = moment(inTime).tz("Asia/Kolkata").startOf("day").toDate();

//         const existingAttendance = await Attendance.findOne({ 
//             employeeId: customEmployeeId, 
//             date: dateOnly 
//         });

//         if (existingAttendance) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Attendance already marked for today.",
//             });
//         }

//         const existingOpenTimeLog = await TimeLog.findOne({ 
//             employeeId: mongoUserId, 
//             endTime: null 
//         });

//         if (existingOpenTimeLog) {
//             return res.status(400).json({ 
//                 status: false,
//                 message: "Previous work session was not properly closed.",
//             });
//         }

//         const attendance = await Attendance.create({
//             employeeId: customEmployeeId,
//             inTime: inTime, 
//             date: dateOnly,
//             status: "present",
//         });

//         try {
         
//             await TimeLog.create({
//                 employeeId: mongoUserId, 
//                 startTime: inTime, 
//                 endTime: null,
//             });
//         } catch (timeLogError) {
//             console.error("TimeLog creation failed:", timeLogError);
//         }

//         res.status(201).json({ 
//             status: true, 
//             data: attendance, 
//             message: "Punch-in successful using client-provided time." 
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const markOutTime = async (req, res) => {
//     try {
//         const { employeeId: customEmployeeId } = req.body; 
        
//         let totalMinutesTracked = 0; 
        
    
//         const user = await User.findOne({ employeeId: customEmployeeId }).select('_id');
        
//         if (!user) {
//              return res.status(404).json({
//                 status: false,
//                 message: "User not found (by custom ID).",
//             });
//         }
        
//         const mongoUserId = user._id.toString(); 

//         // 2. Setup Time Variables and Find Attendance
//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateOnly = nowIST.clone().startOf("day").toDate();
//         const outTime = nowIST.toDate(); 

//         const attendance = await Attendance.findOne({ employeeId: customEmployeeId, date: dateOnly });
        
//         // --- Attendance Validation Checks (Preserving original functionality) ---
//         if (!attendance) {
//             return res.status(404).json({ status: false, message: "Attendance not found for today. Did you punch in?" });
//         }
//         if (attendance.outTime) {
//             return res.status(400).json({ status: false, message: "Punch-out already recorded for today." });
//         }
        
//         // 3. Update Attendance Record and Calculate Time
//         attendance.outTime = outTime;

//         if (attendance.inTime) {
//             const totalMs = outTime.getTime() - new Date(attendance.inTime).getTime();
//             totalMinutesTracked = Math.floor(totalMs / (1000 * 60)); 
            
//             const hours = Math.floor(totalMinutesTracked / 60);
//             const minutes = totalMinutesTracked % 60;

//             attendance.totalTime = `${hours}h ${minutes}m`; 
//         }

//         await attendance.save(); 


//         try {
//             // Find the single, most recently started open TimeLog record
//             const runningTimeLog = await TimeLog.findOne({ 
//                 employeeId: mongoUserId, 
//                 endTime: null 
//             }).sort({ startTime: -1 }); 

//             if (runningTimeLog) {
//                 const durationMinutes = totalMinutesTracked; 
                
//                 const updateResult = await TimeLog.updateOne(
//                     { _id: runningTimeLog._id }, 
//                     { $set: { endTime: outTime, durationMinutes: durationMinutes } }
//                 );
                
//                 if (updateResult.modifiedCount > 0) {
//                      console.log(`TimeLog successfully closed. ID: ${runningTimeLog._id}. Duration: ${totalMinutesTracked} minutes.`);
//                 } else {
//                      console.warn(`TimeLog update failed, modifiedCount is 0 for ID: ${runningTimeLog._id}.`);
//                 }
                
//             } else {
//                  console.warn(`No active TimeLog found for ${customEmployeeId} using User ID ${mongoUserId}. Proceeding with attendance only.`);
//             }

//         } catch (timeLogError) {
//             console.error("TimeLog closing failed during punch-out:", timeLogError);
//         }
//         // ==========================================================

//         res.json({
//             status: true,
//             message: "Punch-out successful and work time tracking stopped.",
//             data: attendance,
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const markOutTime = async (req, res) => {
//     try {
//         const { employeeId: customEmployeeId } = req.body; 
//         let totalMinutesTracked = 0; 
    
//         // 1. Validate User
//         const user = await User.findOne({ employeeId: customEmployeeId }).select('_id');
//         if (!user) {
//              return res.status(404).json({ status: false, message: "User not found." });
//         }
//         const mongoUserId = user._id.toString(); 

//         // 2. Setup IST Time
//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateStr = nowIST.format("YYYY-MM-DD"); 
//         const outTimeStr = nowIST.format("hh:mm:ss A"); 
//         const outTimeDate = nowIST.toDate(); 

//         // 3. Find Attendance by String Date
//         const attendance = await Attendance.findOne({ 
//             employeeId: customEmployeeId, 
//             date: dateStr 
//         });
        
//         if (!attendance) {
//             return res.status(404).json({ status: false, message: "No punch-in record found for today." });
//         }
//         if (attendance.outTime) {
//             return res.status(400).json({ status: false, message: "Punch-out already recorded." });
//         }
        
//         // 4. Update TimeLog and Calculate Duration
//         if (attendance.inTime) {
//             const runningTimeLog = await TimeLog.findOne({ 
//                 employeeId: mongoUserId, 
//                 endTime: null 
//             }).sort({ startTime: -1 });

//             if (runningTimeLog) {
//                 const start = moment(runningTimeLog.startTime);
//                 const end = moment(outTimeDate);
                
//                 // Use moment duration for accurate math
//                 const duration = moment.duration(end.diff(start));
//                 totalMinutesTracked = Math.floor(duration.asMinutes());

//                 const hours = Math.floor(totalMinutesTracked / 60);
//                 const minutes = totalMinutesTracked % 60;

//                 attendance.totalTime = `${hours}h ${minutes}m`;
                
//                 // Close TimeLog with Reason
//                 runningTimeLog.endTime = outTimeDate;
//                 runningTimeLog.durationMinutes = totalMinutesTracked;
//                 runningTimeLog.closureReason = "User Punch Out"; // <--- Added for tracking
//                 await runningTimeLog.save();
//             }
//         }

//         // 5. Save String Out-Time to Attendance
//         attendance.outTime = outTimeStr; 
//         await attendance.save(); 

//         res.json({
//             status: true,
//             message: "Punch-out successful.",
//             data: {
//                 ...attendance._doc,
//                 inTime: attendance.inTime, 
//                 outTime: attendance.outTime,
//                 totalTime: attendance.totalTime
//             },
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

export const markOutTime = async (req, res) => {
    try {
        const { employeeId: customEmployeeId } = req.body;
        let totalMinutesTracked = 0;

        const user = await User.findOne({ employeeId: customEmployeeId }).select('_id');
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        const mongoUserId = user._id.toString();

        const nowIST = moment().tz("Asia/Kolkata");
        const dateStr = nowIST.format("YYYY-MM-DD");
        const outTimeStr = nowIST.format("hh:mm:ss A");
        const outTimeDate = nowIST.toDate();

        const attendance = await Attendance.findOne({
            employeeId: customEmployeeId,
            date: dateStr
        });

        if (!attendance) {
            return res.status(404).json({
                status: false,
                message: "No punch-in record found for today."
            });
        }

        if (attendance.outTime) {
            return res.status(400).json({
                status: false,
                message: "Punch-out already recorded."
            });
        }

        const runningTimeLog = await TimeLog.findOne({
            employeeId: mongoUserId,
            endTime: null
        }).sort({ startTime: -1 });

        if (runningTimeLog) {
            const start = moment(runningTimeLog.startTime);
            const end = moment(outTimeDate);

            const duration = moment.duration(end.diff(start));
            totalMinutesTracked = Math.floor(duration.asMinutes());

            const hours = Math.floor(totalMinutesTracked / 60);
            const minutes = totalMinutesTracked % 60;

            attendance.totalTime = `${hours}h ${minutes}m`;

            // *********** MAIN RULE ************
            if (totalMinutesTracked < 420) {
                return res.status(400).json({
                    status: false,
                    message: `You worked only ${hours}h ${minutes}m. Minimum 7h required to punch out.`
                });
            }

            runningTimeLog.endTime = outTimeDate;
            runningTimeLog.durationMinutes = totalMinutesTracked;
            runningTimeLog.closureReason = "User Punch Out";
            await runningTimeLog.save();
        }

        attendance.outTime = outTimeStr;
        await attendance.save();

        res.json({
            status: true,
            message: "Punch-out successful.",
            data: {
                ...attendance._doc,
                inTime: attendance.inTime,
                outTime: attendance.outTime,
                totalTime: attendance.totalTime
            },
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};



export const getAttendanceByEmpId = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const attendanceRecords = await Attendance.find({ employeeId }).sort({ date: -1 });
        const leaveRecords = await Leave.find({employeeId}).sort({ fromDate: -1 });

        const absent = leaveRecords.filter(leave => leave.applyType === "absent");
        const leave = leaveRecords.filter(leave => leave.applyType !== "absent");

        res.json({ status: true, present:  attendanceRecords, leaves: leave, absent: absent });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
 
// export const getAttendanceByDate = async (req, res) => {
//     try {
//         const date = new Date(req.params.date);
//         const records = await Attendance.find({ date });
// console.log("test get attendence :", date)
//         res.json({ status: true, data: records });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };
 

export const getAttendanceByDate = async (req, res) => {
    try {
        const queryDateString = req.params.date; 

        const startOfDay = new Date(queryDateString);
        startOfDay.setHours(0, 0, 0, 0); 
        
 
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1); 

        console.log("Start of Day:", startOfDay);
        console.log("End of Day (Next Day):", endOfDay);
 
        const records = await Attendance.find({ 
            date: {
                $gte: startOfDay,  
                $lt: endOfDay      
            }
        });

        res.json({ status: true, data: records });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const requestPartialDayLeave = async (req, res)=>{
    try{

        const {employeeId,leaveType , reason} = req.body;

        if(!employeeId || !leaveType || !reason){
            return res.status(400).json({status:false, message:"Employee ID, leave type, and reason are required."})
        }

        const nowIST  = moment().tz("Asia/Kolkata");
        const dateOnly = nowIST.clone().startOf("day").toDate();
        
        const attendance = await Attendance.findOne({employeeId, date:dateOnly});

        if(!attendance){
            return res.status(404).json({ status: false, message: "Cannot apply partial leave. Employee has not punched in today." });
        }

        if (attendance.isPartialLeave) {
            return res.status(400).json({ status: false, message: "Partial leave is already logged for today." });
        }

        attendance.isPartialLeave = true;
        attendance.partialLeaveType=leaveType;
        attendance.partialLeaveReason=reason;

        await attendance.save();

        res.status(200).json({
            status:true,
           message: `Partial leave (${leaveType}) logged successfully for today.`,
           data:attendance
        })

    }catch(error){
console.error("Request Partial Leave Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
}



// ---------------------------------------------------------------------------------------------------------------------------------------------



// import moment from "moment-timezone";
// import Attendance from "../models/attendance.model.js";
// import User from "../models/user.model.js";
// import TimeLog from "../models/timeLog.model.js";
// import Leave from "../models/leave.model.js";
// import { haversine } from "../utils/haversine.js";

// // Office Configuration
// const OFFICE_LAT = 22.7196;
// const OFFICE_LON = 75.8577;
// const OFFICE_RADIUS_METERS = 100;
// const WORK_LIMIT_SECONDS = 7 * 60 * 60; // 7 hours in seconds

// export const markAttendance = async (req, res) => {
//     try {
//         const { employeeId: customEmployeeId, latitude, longitude } = req.body;

//         if (!latitude || !longitude) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Location is required for punch-in"
//             });
//         }

//         // ********* OFFICE LOCATION VALIDATION WITH HAVERSINE **********
//         const distanceFromOffice = haversine(
//             parseFloat(latitude),
//             parseFloat(longitude),
//             OFFICE_LAT,
//             OFFICE_LON
//         );

//         const isWithinRadius = distanceFromOffice <= OFFICE_RADIUS_METERS;

//         if (!isWithinRadius) {
//             return res.status(401).json({
//                 status: false,
//                 message: `You are ${Math.floor(distanceFromOffice)}m away! Punch-In allowed only within ${OFFICE_RADIUS_METERS}m office radius`
//             });
//         }

//         const user = await User.findOne({ employeeId: customEmployeeId });
//         if (!user) return res.status(404).json({ status: false, message: "User not found" });

//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateStr = nowIST.format("YYYY-MM-DD");
//         const timeStr = nowIST.format("hh:mm:ss A");

//         const existingAttendance = await Attendance.findOne({
//             employeeId: customEmployeeId,
//             date: dateStr
//         });

//         if (existingAttendance) {
//             return res.status(400).json({ status: false, message: "Attendance already marked." });
//         }

//         // Create attendance with new fields
//         const attendance = await Attendance.create({
//             employeeId: customEmployeeId,
//             date: dateStr,
//             inTime: timeStr,
//             status: "present", // Existing status field for attendance type
//             location: {
//                 lat: latitude.toString(),
//                 lng: longitude.toString()
//             },
//             punchSource: "electron/web",
//             // NEW FIELDS
//             latitude: parseFloat(latitude),
//             longitude: parseFloat(longitude),
//             isWithinOfficeRadius: true,
//             totalActiveSeconds: 0,
//             idleSeconds: 0,
//             sessionStatus: "RUNNING" // Renamed to avoid conflict
//         });

//         try {
//             await TimeLog.create({
//                 employeeId: user._id,
//                 startTime: nowIST.toDate(),
//                 endTime: null
//             });
//         } catch (err) {
//             console.error("TimeLog Error:", err);
//         }

//         // Start background tracking for this attendance record
//         startBackgroundTracking(attendance._id);

//         res.status(201).json({
//             status: true,
//             message: "Punch-in successful",
//             data: attendance
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Background tracking system
// const activeTrackers = new Map();

// const startBackgroundTracking = async (attendanceId) => {
//     try {
//         console.log(`Starting background tracking for attendance: ${attendanceId}`);
        
//         const updateInterval = setInterval(async () => {
//             try {
//                 const attendance = await Attendance.findById(attendanceId);
//                 if (!attendance) {
//                     clearInterval(updateInterval);
//                     activeTrackers.delete(attendanceId);
//                     return;
//                 }

//                 // If session is completed, stop tracking
//                 if (attendance.sessionStatus === "COMPLETED") {
//                     clearInterval(updateInterval);
//                     activeTrackers.delete(attendanceId);
//                     return;
//                 }

//                 // Calculate active seconds (simulate 90% active, 10% idle for demo)
//                 // In production, you'd integrate with actual activity monitoring
//                 const lastUpdate = attendance.updatedAt || new Date();
//                 const now = new Date();
//                 const secondsPassed = Math.floor((now - lastUpdate) / 1000);
                
//                 if (secondsPassed > 0) {
//                     const activeSecondsToAdd = Math.floor(secondsPassed * 0.9); // 90% active
//                     const idleSecondsToAdd = secondsPassed - activeSecondsToAdd; // 10% idle
                    
//                     // Update attendance record
//                     await Attendance.findByIdAndUpdate(
//                         attendanceId,
//                         {
//                             $inc: {
//                                 totalActiveSeconds: activeSecondsToAdd,
//                                 idleSeconds: idleSecondsToAdd
//                             }
//                         },
//                         { new: true }
//                     );
                    
//                     console.log(`Updated tracker for ${attendanceId}: +${activeSecondsToAdd} active, +${idleSecondsToAdd} idle seconds`);
//                 }
//             } catch (err) {
//                 console.error(`Error in background tracker for ${attendanceId}:`, err);
//             }
//         }, 30000); // Update every 30 seconds

//         // Store the interval reference
//         activeTrackers.set(attendanceId, updateInterval);
//     } catch (error) {
//         console.error(`Failed to start background tracking for ${attendanceId}:`, error);
//     }
// };

// const stopBackgroundTracking = (attendanceId) => {
//     if (activeTrackers.has(attendanceId)) {
//         clearInterval(activeTrackers.get(attendanceId));
//         activeTrackers.delete(attendanceId);
//         console.log(`Stopped background tracking for attendance: ${attendanceId}`);
//     }
// };

// export const markOutTime = async (req, res) => {
//     try {
//         const { employeeId: customEmployeeId } = req.body;
//         let totalMinutesTracked = 0;

//         const user = await User.findOne({ employeeId: customEmployeeId }).select('_id');
//         if (!user) {
//             return res.status(404).json({ status: false, message: "User not found." });
//         }

//         const mongoUserId = user._id.toString();

//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateStr = nowIST.format("YYYY-MM-DD");
//         const outTimeStr = nowIST.format("hh:mm:ss A");
//         const outTimeDate = nowIST.toDate();

//         const attendance = await Attendance.findOne({
//             employeeId: customEmployeeId,
//             date: dateStr
//         });

//         if (!attendance) {
//             return res.status(404).json({
//                 status: false,
//                 message: "No punch-in record found for today."
//             });
//         }

//         if (attendance.outTime) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Punch-out already recorded."
//             });
//         }

//         const runningTimeLog = await TimeLog.findOne({
//             employeeId: mongoUserId,
//             endTime: null
//         }).sort({ startTime: -1 });

//         if (runningTimeLog) {
//             const start = moment(runningTimeLog.startTime);
//             const end = moment(outTimeDate);

//             const duration = moment.duration(end.diff(start));
//             totalMinutesTracked = Math.floor(duration.asMinutes());

//             const hours = Math.floor(totalMinutesTracked / 60);
//             const minutes = totalMinutesTracked % 60;

//             attendance.totalTime = `${hours}h ${minutes}m`;

//             // *********** ENHANCED: CHECK WORK LIMIT IN SECONDS ************
//             // Convert 7 hours to seconds
//             const requiredWorkSeconds = 7 * 60 * 60;
            
//             // Check both traditional minutes AND totalActiveSeconds
//             if (totalMinutesTracked < 420) { // Existing check
//                 return res.status(400).json({
//                     status: false,
//                     message: `You worked only ${hours}h ${minutes}m. Minimum 7h required to punch out.`
//                 });
//             }
            
//             // Additional check using totalActiveSeconds (if tracking is active)
//             if (attendance.totalActiveSeconds > 0 && attendance.totalActiveSeconds < requiredWorkSeconds) {
//                 const activeHours = Math.floor(attendance.totalActiveSeconds / 3600);
//                 const activeMinutes = Math.floor((attendance.totalActiveSeconds % 3600) / 60);
                
//                 return res.status(400).json({
//                     status: false,
//                     message: `Active work time is ${activeHours}h ${activeMinutes}m. Minimum 7h active work required.`
//                 });
//             }

//             runningTimeLog.endTime = outTimeDate;
//             runningTimeLog.durationMinutes = totalMinutesTracked;
//             runningTimeLog.closureReason = "User Punch Out";
//             await runningTimeLog.save();
//         }

//         // Update attendance with punch-out details and new fields
//         attendance.outTime = outTimeStr;
//         attendance.sessionStatus = "COMPLETED"; // Mark session as completed
        
//         // Calculate final active time if not already tracked
//         if (attendance.totalActiveSeconds === 0 && totalMinutesTracked > 0) {
//             attendance.totalActiveSeconds = totalMinutesTracked * 60; // Convert minutes to seconds
//         }

//         await attendance.save();

//         // Stop background tracking for this attendance
//         stopBackgroundTracking(attendance._id);

//         res.json({
//             status: true,
//             message: "Punch-out successful.",
//             data: {
//                 ...attendance._doc,
//                 inTime: attendance.inTime,
//                 outTime: attendance.outTime,
//                 totalTime: attendance.totalTime,
//                 totalActiveHours: Math.floor(attendance.totalActiveSeconds / 3600),
//                 totalActiveMinutes: Math.floor((attendance.totalActiveSeconds % 3600) / 60)
//             },
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Utility function to manually update tracking (for testing/admin)
// export const updateAttendanceTracking = async (req, res) => {
//     try {
//         const { attendanceId, activeSeconds, idleSeconds } = req.body;
        
//         if (!attendanceId) {
//             return res.status(400).json({ status: false, message: "Attendance ID is required" });
//         }

//         const attendance = await Attendance.findById(attendanceId);
//         if (!attendance) {
//             return res.status(404).json({ status: false, message: "Attendance not found" });
//         }

//         const updates = {};
//         if (activeSeconds !== undefined) {
//             updates.$inc = { totalActiveSeconds: parseInt(activeSeconds) };
//         }
//         if (idleSeconds !== undefined) {
//             updates.$inc = { ...updates.$inc, idleSeconds: parseInt(idleSeconds) };
//         }

//         const updatedAttendance = await Attendance.findByIdAndUpdate(
//             attendanceId,
//             updates,
//             { new: true }
//         );

//         res.json({
//             status: true,
//             message: "Tracking updated successfully",
//             data: updatedAttendance
//         });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// // Cleanup function to stop all tracking on server shutdown
// const cleanupTrackers = () => {
//     console.log("Cleaning up all background trackers...");
//     for (const [attendanceId, interval] of activeTrackers.entries()) {
//         clearInterval(interval);
//         activeTrackers.delete(attendanceId);
//     }
// };

// // Handle graceful shutdown
// process.on('SIGINT', cleanupTrackers);
// process.on('SIGTERM', cleanupTrackers);

// export const getAttendanceByEmpId = async (req, res) => {
//     try {
//         const { employeeId } = req.params;
//         const attendanceRecords = await Attendance.find({ employeeId }).sort({ date: -1 });
//         const leaveRecords = await Leave.find({employeeId}).sort({ fromDate: -1 });

//         const absent = leaveRecords.filter(leave => leave.applyType === "absent");
//         const leave = leaveRecords.filter(leave => leave.applyType !== "absent");

//         res.json({ status: true, present:  attendanceRecords, leaves: leave, absent: absent });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// export const getAttendanceByDate = async (req, res) => {
//     try {
//         const queryDateString = req.params.date; 

//         const startOfDay = new Date(queryDateString);
//         startOfDay.setHours(0, 0, 0, 0); 
        
//         const endOfDay = new Date(startOfDay);
//         endOfDay.setDate(startOfDay.getDate() + 1); 

//         console.log("Start of Day:", startOfDay);
//         console.log("End of Day (Next Day):", endOfDay);
 
//         const records = await Attendance.find({ 
//             date: {
//                 $gte: startOfDay,  
//                 $lt: endOfDay      
//             }
//         });

//         res.json({ status: true, data: records });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

// export const requestPartialDayLeave = async (req, res)=>{
//     try{

//         const {employeeId,leaveType , reason} = req.body;

//         if(!employeeId || !leaveType || !reason){
//             return res.status(400).json({status:false, message:"Employee ID, leave type, and reason are required."})
//         }

//         const nowIST  = moment().tz("Asia/Kolkata");
//         const dateOnly = nowIST.clone().startOf("day").toDate();
        
//         const attendance = await Attendance.findOne({employeeId, date:dateOnly});

//         if(!attendance){
//             return res.status(404).json({ status: false, message: "Cannot apply partial leave. Employee has not punched in today." });
//         }

//         if (attendance.isPartialLeave) {
//             return res.status(400).json({ status: false, message: "Partial leave is already logged for today." });
//         }

//         attendance.isPartialLeave = true;
//         attendance.partialLeaveType=leaveType;
//         attendance.partialLeaveReason=reason;

//         await attendance.save();

//         res.status(200).json({
//             status:true,
//            message: `Partial leave (${leaveType}) logged successfully for today.`,
//            data:attendance
//         })

//     }catch(error){
// console.error("Request Partial Leave Error:", error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// }



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// // AcoreBack-main/src/controllers/attendance.controller.js
// import moment from "moment-timezone";
// import Attendance from "../models/attendance.model.js";
// import User from "../models/user.model.js";
// import TimeLog from "../models/timeLog.model.js";
// import Leave from "../models/leave.model.js";
// import { haversine } from "../utils/haversine.js";

// // Office Configuration - Vijay Nagar, Indore
// const OFFICE_LAT = 22.7494444;
// const OFFICE_LON = 75.8991667;
// const OFFICE_RADIUS_METERS = 100;
// const REQUIRED_WORK_SECONDS = 7 * 60 * 60; // 7 hours in seconds

// // ✅ 1️⃣ CHECK PUNCH STATUS
// export const checkPunchStatus = async (req, res) => {
//   try {
//     const { employeeId } = req.params;
//     const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

//     // Find today's attendance
//     const attendance = await Attendance.findOne({
//       employeeId,
//       date: today
//     });

//     if (!attendance) {
//       return res.json({
//         status: true,
//         isPunchedIn: false,
//         message: "No attendance record for today"
//       });
//     }

//     const isPunchedIn = attendance.inTime && !attendance.outTime;
    
//     return res.json({
//       status: true,
//       isPunchedIn,
//       data: attendance,
//       message: isPunchedIn ? "Currently punched in" : "Not punched in today"
//     });

//   } catch (error) {
//     console.error("❌ checkPunchStatus error:", error);
//     res.status(500).json({ 
//       status: false, 
//       message: "Failed to check punch status" 
//     });
//   }
// };

// // ✅ 2️⃣ MARK ATTENDANCE (Punch In)
// export const markAttendance = async (req, res) => {
//   try {
//     const { employeeId: customEmployeeId, latitude, longitude } = req.body;

//     // Validate required fields
//     if (!customEmployeeId || !latitude || !longitude) {
//       return res.status(400).json({
//         status: false,
//         message: "Employee ID and location are required"
//       });
//     }

//     console.log(`🎯 Punch In attempt for: ${customEmployeeId}`);

//     // Validate user exists and is active
//     const user = await User.findOne({ 
//       employeeId: customEmployeeId,
//       isActive: true 
//     });
    
//     if (!user) {
//       return res.status(404).json({ 
//         status: false, 
//         message: "Employee not found or inactive" 
//       });
//     }

//     // Validate location - Office radius check
//     const distanceFromOffice = haversine(
//       parseFloat(latitude),
//       parseFloat(longitude),
//       OFFICE_LAT,
//       OFFICE_LON
//     );

//     console.log(`📍 Distance from office: ${Math.floor(distanceFromOffice)}m`);

//     if (distanceFromOffice > OFFICE_RADIUS_METERS) {
//       return res.status(400).json({
//         status: false,
//         message: `You are ${Math.floor(distanceFromOffice)}m away from office. Punch-in allowed only within ${OFFICE_RADIUS_METERS}m radius.`
//       });
//     }

//     const nowIST = moment().tz("Asia/Kolkata");
//     const dateStr = nowIST.format("YYYY-MM-DD");
//     const timeStr = nowIST.format("HH:mm:ss");

//     // Check existing attendance for today
//     const existingAttendance = await Attendance.findOne({
//       employeeId: customEmployeeId,
//       date: dateStr
//     });

//     if (existingAttendance) {
//       if (existingAttendance.outTime) {
//         return res.status(400).json({ 
//           status: false, 
//           message: "Already punched out for today. Cannot punch in again." 
//         });
//       }
//       return res.status(400).json({ 
//         status: false, 
//         message: "Already punched in today" 
//       });
//     }

//     // Create new attendance record
//     const attendanceData = {
//       employeeId: customEmployeeId,
//       name: user.name,
//       email: user.email,
//       department: user.department || "Not Assigned",
//       date: dateStr,
//       inTime: timeStr,
//       status: "present",
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//       isWithinOfficeRadius: true,
//       punchSource: "electron",
//       sessionStatus: "RUNNING",
//       totalActiveSeconds: 0,
//       idleSeconds: 0,
//       location: {
//         lat: latitude.toString(),
//         lng: longitude.toString()
//       }
//     };

//     const attendance = await Attendance.create(attendanceData);

//     // Create time log entry
//     try {
//       await TimeLog.create({
//         employeeId: user._id,
//         employeeIdString: customEmployeeId,
//         startTime: nowIST.toDate(),
//         endTime: null,
//         type: "work",
//         source: "attendance-system"
//       });
//     } catch (logError) {
//       console.error("TimeLog creation error:", logError);
//       // Continue even if time log fails
//     }

//     console.log(`✅ Punch In successful for ${customEmployeeId}. Attendance ID: ${attendance._id}`);

//     res.status(201).json({
//       status: true,
//       message: "Punch-in successful",
//       data: attendance
//     });

//   } catch (error) {
//     console.error("❌ markAttendance error:", error);
//     res.status(500).json({ 
//       status: false, 
//       message: error.message || "Punch-in failed due to server error" 
//     });
//   }
// };

// // ✅ 3️⃣ MARK OUT TIME (Punch Out)
// export const markOutTime = async (req, res) => {
//   try {
//     const { employeeId: customEmployeeId } = req.body;

//     if (!customEmployeeId) {
//       return res.status(400).json({
//         status: false,
//         message: "Employee ID is required"
//       });
//     }

//     console.log(`🎯 Punch Out attempt for: ${customEmployeeId}`);

//     // Find user
//     const user = await User.findOne({ employeeId: customEmployeeId });
//     if (!user) {
//       return res.status(404).json({ 
//         status: false, 
//         message: "Employee not found" 
//       });
//     }

//     const nowIST = moment().tz("Asia/Kolkata");
//     const dateStr = nowIST.format("YYYY-MM-DD");
//     const outTimeStr = nowIST.format("HH:mm:ss");

//     // Find today's attendance
//     const attendance = await Attendance.findOne({
//       employeeId: customEmployeeId,
//       date: dateStr
//     });

//     if (!attendance) {
//       return res.status(404).json({
//         status: false,
//         message: "No punch-in record found for today"
//       });
//     }

//     if (attendance.outTime) {
//       return res.status(400).json({
//         status: false,
//         message: "Already punched out today"
//       });
//     }

//     // Validate work time - STRICT 7-HOUR RULE
//     const totalActiveSeconds = attendance.totalActiveSeconds || 0;
    
//     if (totalActiveSeconds < REQUIRED_WORK_SECONDS) {
//       // Check for approved early leave
//       const hasEarlyLeave = await checkEarlyLeaveApproval(customEmployeeId, dateStr);
      
//       if (!hasEarlyLeave) {
//         const activeHours = Math.floor(totalActiveSeconds / 3600);
//         const activeMinutes = Math.floor((totalActiveSeconds % 3600) / 60);
//         const remainingSeconds = REQUIRED_WORK_SECONDS - totalActiveSeconds;
//         const remainingHours = Math.floor(remainingSeconds / 3600);
//         const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
        
//         return res.status(400).json({
//           status: false,
//           message: `Active work time: ${activeHours}h ${activeMinutes}m. Need ${remainingHours}h ${remainingMinutes}m more to complete 7 hours.`,
//           code: "INSUFFICIENT_WORK_HOURS",
//           currentActive: totalActiveSeconds,
//           required: REQUIRED_WORK_SECONDS,
//           remaining: remainingSeconds
//         });
//       }
//     }

//     // Calculate total worked time
//     const inTime = moment(attendance.inTime, "HH:mm:ss");
//     const outTime = moment(outTimeStr, "HH:mm:ss");
//     const workDuration = moment.duration(outTime.diff(inTime));
//     const totalWorkedSeconds = Math.floor(workDuration.asSeconds());
//     const hours = Math.floor(totalWorkedSeconds / 3600);
//     const minutes = Math.floor((totalWorkedSeconds % 3600) / 60);

//     // Update attendance record
//     attendance.outTime = outTimeStr;
//     attendance.totalTime = `${hours}h ${minutes}m`;
//     attendance.totalWorkedSeconds = totalWorkedSeconds;
//     attendance.sessionStatus = "COMPLETED";
    
//     await attendance.save();

//     // Update time log
//     try {
//       const runningTimeLog = await TimeLog.findOne({
//         employeeId: user._id,
//         endTime: null
//       }).sort({ startTime: -1 });

//       if (runningTimeLog) {
//         const start = moment(runningTimeLog.startTime);
//         const end = moment(nowIST.toDate());
//         const duration = moment.duration(end.diff(start));
//         const totalMinutes = Math.floor(duration.asMinutes());
        
//         runningTimeLog.endTime = nowIST.toDate();
//         runningTimeLog.durationMinutes = totalMinutes;
//         runningTimeLog.closureReason = "Normal Punch Out";
//         await runningTimeLog.save();
//       }
//     } catch (logError) {
//       console.error("TimeLog update error:", logError);
//     }

//     console.log(`✅ Punch Out successful for ${customEmployeeId}. Worked: ${hours}h ${minutes}m`);

//     res.json({
//       status: true,
//       message: "Punch-out successful",
//       data: {
//         ...attendance._doc,
//         totalActiveHours: Math.floor(totalActiveSeconds / 3600),
//         totalActiveMinutes: Math.floor((totalActiveSeconds % 3600) / 60),
//         totalWorkedSeconds: totalWorkedSeconds
//       }
//     });

//   } catch (error) {
//     console.error("❌ markOutTime error:", error);
//     res.status(500).json({ 
//       status: false, 
//       message: error.message || "Punch-out failed due to server error" 
//     });
//   }
// };

// // ✅ 4️⃣ UPDATE TRACKING (For Electron to update active/idle seconds)
// export const updateAttendanceTracking = async (req, res) => {
//   try {
//     const { attendanceId, activeSeconds, idleSeconds } = req.body;

//     if (!attendanceId) {
//       return res.status(400).json({ 
//         status: false, 
//         message: "Attendance ID is required" 
//       });
//     }

//     const attendance = await Attendance.findById(attendanceId);
//     if (!attendance) {
//       return res.status(404).json({ 
//         status: false, 
//         message: "Attendance record not found" 
//       });
//     }

//     // Only update if session is still running
//     if (attendance.sessionStatus !== "RUNNING") {
//       return res.status(400).json({
//         status: false,
//         message: "Cannot update tracking for completed session"
//       });
//     }

//     // Update tracking data
//     const updates = {};
//     if (activeSeconds !== undefined && activeSeconds >= 0) {
//       updates.totalActiveSeconds = parseInt(activeSeconds);
//     }
//     if (idleSeconds !== undefined && idleSeconds >= 0) {
//       updates.idleSeconds = parseInt(idleSeconds);
//     }

//     const updatedAttendance = await Attendance.findByIdAndUpdate(
//       attendanceId,
//       updates,
//       { new: true }
//     );

//     res.json({
//       status: true,
//       message: "Tracking updated successfully",
//       data: updatedAttendance
//     });

//   } catch (error) {
//     console.error("❌ updateAttendanceTracking error:", error);
//     res.status(500).json({ 
//       status: false, 
//       message: "Failed to update tracking" 
//     });
//   }
// };

// // ✅ 5️⃣ GET ATTENDANCE BY EMPLOYEE ID
// export const getAttendanceByEmpId = async (req, res) => {
//   try {
//     const { employeeId } = req.params;
    
//     const attendanceRecords = await Attendance.find({ employeeId })
//       .sort({ date: -1 })
//       .limit(100);

//     const leaveRecords = await Leave.find({ employeeId })
//       .sort({ fromDate: -1 });

//     const absent = leaveRecords.filter(leave => leave.applyType === "absent");
//     const leave = leaveRecords.filter(leave => leave.applyType !== "absent");

//     res.json({ 
//       status: true, 
//       present: attendanceRecords, 
//       leaves: leave, 
//       absent: absent 
//     });
//   } catch (error) {
//     console.error("❌ getAttendanceByEmpId error:", error);
//     res.status(500).json({ 
//       status: false, 
//       message: "Failed to fetch attendance records" 
//     });
//   }
// };

// // ✅ 6️⃣ GET ATTENDANCE BY DATE
// export const getAttendanceByDate = async (req, res) => {
//   try {
//     const { date } = req.params;

//     const records = await Attendance.find({ 
//       date: date
//     }).sort({ inTime: 1 });

//     res.json({ 
//       status: true, 
//       data: records,
//       count: records.length
//     });
//   } catch (error) {
//     console.error("❌ getAttendanceByDate error:", error);
//     res.status(500).json({ 
//       status: false, 
//       message: "Failed to fetch attendance for date" 
//     });
//   }
// };

// // ✅ 7️⃣ REQUEST PARTIAL DAY LEAVE
// export const requestPartialDayLeave = async (req, res) => {
//   try {
//     const { employeeId, leaveType, reason } = req.body;

//     if (!employeeId || !leaveType || !reason) {
//       return res.status(400).json({
//         status: false,
//         message: "Employee ID, leave type, and reason are required."
//       });
//     }

//     const nowIST = moment().tz("Asia/Kolkata");
//     const dateOnly = nowIST.clone().startOf("day").toDate();
    
//     const attendance = await Attendance.findOne({
//       employeeId,
//       date: dateOnly
//     });

//     if (!attendance) {
//       return res.status(404).json({
//         status: false,
//         message: "Cannot apply partial leave. Employee has not punched in today."
//       });
//     }

//     if (attendance.isPartialLeave) {
//       return res.status(400).json({
//         status: false,
//         message: "Partial leave is already logged for today."
//       });
//     }

//     attendance.isPartialLeave = true;
//     attendance.partialLeaveType = leaveType;
//     attendance.partialLeaveReason = reason;

//     await attendance.save();

//     res.status(200).json({
//       status: true,
//       message: `Partial leave (${leaveType}) logged successfully for today.`,
//       data: attendance
//     });

//   } catch (error) {
//     console.error("❌ requestPartialDayLeave error:", error);
//     res.status(500).json({ 
//       status: false, 
//       message: "Failed to process partial leave request" 
//     });
//   }
// };

// // 🔧 HELPER FUNCTION: Check early leave approval
// const checkEarlyLeaveApproval = async (employeeId, date) => {
//   try {
//     const leave = await Leave.findOne({
//       employeeId,
//       fromDate: { $lte: date },
//       toDate: { $gte: date },
//       status: "approved",
//       applyType: "early_leave"
//     });
    
//     return !!leave;
//   } catch (error) {
//     console.error("Error checking early leave:", error);
//     return false;
//   }
// };