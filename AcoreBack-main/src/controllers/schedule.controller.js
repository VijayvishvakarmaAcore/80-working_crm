import ShiftSchedule from '../models/schedule.model.js';
import User from '../models/user.model.js';
import moment from 'moment-timezone';

const getEmployeeName = async (employeeId) => {
    const user = await User.findOne({ employeeId }).select('name');
    return user ? user.name : 'Unknown Employee';
};

const calculateShiftEnd = (dateISOString, startTime, durationHours) => {
    const startDateTime = moment.tz(`${moment(dateISOString).format('YYYY-MM-DD')} ${startTime}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
    
    const durationMinutes = durationHours * 60;
    const endDateTime = startDateTime.add(durationMinutes, 'minutes');
    
    return endDateTime.format('HH:mm');
};


export const createDailySchedule = async (req, res) => {
    try {
        const { employeeId, date, shiftStart, shiftDurationHours } = req.body;

        if (!employeeId || !date || !shiftStart || shiftDurationHours === undefined || shiftDurationHours === null) {
            return res.status(400).json({ status: false, message: "Employee ID, date, shiftStart, and shiftDurationHours are required." });
        }
        if (typeof shiftDurationHours !== 'number' || shiftDurationHours <= 0) {
            return res.status(400).json({ status: false, message: "Shift duration must be a positive number." });
        }

        const employeeName = await getEmployeeName(employeeId);
        
        const scheduleDate = moment.tz(date, "YYYY-MM-DD", "Asia/Kolkata").startOf('day').toDate();
        
        const shiftEnd = calculateShiftEnd(date, shiftStart, shiftDurationHours); 

        const schedule = await ShiftSchedule.create({
            employeeId,
            employeeName,
            date: scheduleDate,
            shiftStart,
            shiftDurationHours, 
            shiftEnd,           
        });

        res.status(201).json({ status: true, message: "Daily schedule created.", data: schedule });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ status: false, message: "Schedule already exists for this employee on this date. Use PUT to update/override." });
        }
        console.error("Create Daily Schedule Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const createMonthlySchedule = async (req, res) => {
    try {
        const { employeeId, monthYear, shiftStart, shiftDurationHours, daysOfWeek } = req.body;

        if (!employeeId || !monthYear || !shiftStart || shiftDurationHours === undefined || !daysOfWeek || daysOfWeek.length === 0) {
            return res.status(400).json({ status: false, message: "All fields, including duration and daysOfWeek, are required." });
        }
        if (typeof shiftDurationHours !== 'number' || shiftDurationHours <= 0) {
            return res.status(400).json({ status: false, message: "Shift duration must be a positive number." });
        }

        const employeeName = await getEmployeeName(employeeId);
        const schedules = [];
        let dateCursor = moment.tz(monthYear, "YYYY-MM", "Asia/Kolkata").startOf('month');
        const endOfMonth = moment.tz(monthYear, "YYYY-MM", "Asia/Kolkata").endOf('month');

        while (dateCursor.isSameOrBefore(endOfMonth, 'day')) {
            const dayOfWeek = dateCursor.day();

            if (daysOfWeek.includes(dayOfWeek)) {
                
                const currentDateString = dateCursor.format('YYYY-MM-DD');
                const calculatedShiftEnd = calculateShiftEnd(currentDateString, shiftStart, shiftDurationHours);

                schedules.push({
                    employeeId,
                    employeeName,
                    date: dateCursor.clone().startOf('day').toDate(), 
                    shiftStart,
                    shiftDurationHours, 
                    shiftEnd: calculatedShiftEnd, 
                });
            }
            dateCursor.add(1, 'day');
        }
        
        const result = await ShiftSchedule.insertMany(schedules, { ordered: false });
        
        const successCount = result.length;
        const failedCount = schedules.length - successCount; 

        res.status(201).json({ 
            status: true, 
            message: `Created ${successCount} shifts for the month. (${failedCount} shifts skipped due to existing schedule or error).`, 
            data: result 
        });

    } catch (error) {
        if (error.code === 11000 && error.writeErrors) {
             return res.status(207).json({ 
                 status: true, 
                 message: `Bulk operation finished. ${error.writeErrors.length} shifts were already scheduled and were skipped.`, 
                 errors: error.writeErrors 
             });
        }
        console.error("Create Monthly Schedule Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getEmployeeSchedule = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { startDate, endDate } = req.query; 

        let filter = { employeeId };

        if (startDate && endDate) {
            filter.date = { 
                $gte: moment.tz(startDate, "YYYY-MM-DD", "Asia/Kolkata").startOf('day').toDate(),
                $lte: moment.tz(endDate, "YYYY-MM-DD", "Asia/Kolkata").startOf('day').toDate() 
            };
        } else {
             filter.date = { $gte: moment().tz("Asia/Kolkata").startOf('day').toDate() };
        }

        const schedules = await ShiftSchedule.find(filter).sort({ date: 1 });

        res.status(200).json({ status: true, count: schedules.length, data: schedules });
    } catch (error) {
        console.error("Get Employee Schedule Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const updateSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const updates = req.body; 

        if (updates.shiftStart || updates.shiftDurationHours) {
            const existingSchedule = await ShiftSchedule.findById(scheduleId).select('date shiftStart shiftDurationHours');
            
            if (!existingSchedule) {
                 return res.status(404).json({ status: false, message: "Schedule record not found for update." });
            }

            const newStart = updates.shiftStart || existingSchedule.shiftStart;
            const newDuration = updates.shiftDurationHours || existingSchedule.shiftDurationHours;
            
            const newShiftEnd = calculateShiftEnd(existingSchedule.date, newStart, newDuration);
            
            updates.shiftEnd = newShiftEnd;
            updates.status = 'modified';
        }

        const updatedSchedule = await ShiftSchedule.findByIdAndUpdate(
            scheduleId,
            { $set: updates }, 
            { new: true, runValidators: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ status: false, message: "Schedule record not found." });
        }

        res.status(200).json({ 
            status: true, 
            message: "Schedule successfully updated (daily override applied).", 
            data: updatedSchedule 
        });

    } catch (error) {
        console.error("Update Schedule Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};