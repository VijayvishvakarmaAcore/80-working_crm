

import Holiday from "../models/holiday.model.js";
import moment from "moment-timezone";

const IST_OFFSET = 5.5; 


const generateAutoSaturdays = () => {
    const autoHolidays = [];
    const currentYear = new Date().getFullYear();
    
    for (let year = currentYear; year <= currentYear + 1; year++) {
        
        for (let month = 0; month < 12; month++) {
            let saturdayCount = 0;
            
            for (let day = 1; day <= 31; day++) {
                
                const dateIST = moment.tz({ year, month, day }, "Asia/Kolkata"); 
                
                if (dateIST.month() !== month) break;

                if (dateIST.day() === 6) { 
                    saturdayCount++;

                    if (saturdayCount === 1 || saturdayCount === 3) {
                        
                        const holidayDateUTC = dateIST.startOf('day').toDate();
                        
                        autoHolidays.push({
                            title: saturdayCount === 1 ? "1st Saturday Holiday" : "3rd Saturday Holiday",
                            date: holidayDateUTC,
                            type: "automatic",
                            createdBy: "System"
                        });
                    }
                }
            }
        }
    }

    return autoHolidays;
};

export const createHoliday = async (req, res) => {
    try {
        const { title, date, description, createdBy ,type} = req.body;
        
        if (!title || !date || !createdBy) { 
            return res.status(400).json({
                status: false,
                message: "Title, Date, and CreatedBy are required",
            });
        }
        
        const cleanDate = new Date(date);
        cleanDate.setUTCHours(0, 0, 0, 0);

        const newHoliday = await Holiday.create({
            title,
            date: cleanDate,
            description,
            createdBy, 
            type:type,
        });

        res.status(201).json({
            status: true,
            message: "Holiday created successfully",
            data: newHoliday,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const getAllHolidays = async (req, res) => {
    try {
        const manualHolidays = await Holiday.find().sort({ date: 1 });
        const autoHolidays = generateAutoSaturdays();

        const allHolidays = [...manualHolidays, ...autoHolidays];

        allHolidays.sort((a, b) => new Date(a.date) - new Date(b.date));

        res.status(200).json({
            status: true,
            count: allHolidays.length,
            data: allHolidays,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const updateHoliday = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, title } = req.body;

        const updatedHoliday = await Holiday.findByIdAndUpdate(
            id,
            { date, title },
            { new: true }
        );

        if (!updatedHoliday) {
            return res.status(404).json({ message: "Holiday not found" });
        }

        res.json({
            message: "Holiday updated successfully",
            updatedHoliday,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating holiday", error });
    }
};

export const getUpcomingHolidays = async (req, res) => {
    try {
        const { days = 30 } = req.query;

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0); 
        
        const limitDate = new Date(
            today.getTime() + Number(days) * 24 * 60 * 60 * 1000
        );
        limitDate.setUTCHours(23, 59, 59, 999); 

        const manualHolidays = await Holiday.find();
        const autoHolidays = generateAutoSaturdays(); 

        let all = [...manualHolidays, ...autoHolidays];

        const upcoming = all.filter((h) => {
            let hDate = new Date(h.date);
            hDate.setUTCHours(0, 0, 0, 0); 

            return hDate >= today && hDate <= limitDate;
        });

        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

        res.status(200).json({
            status: true,
            count: upcoming.length,
            data: upcoming,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const deleteHoliday = async (req, res) => {
    try {
        const { id } = req.params;

        await Holiday.findByIdAndDelete(id);

        res.status(200).json({
            status: true,
            message: "Holiday deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
};