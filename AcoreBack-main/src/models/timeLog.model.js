
import mongoose from "mongoose";

const timeLogSchema = new mongoose.Schema({
    employeeId: {
        type: String, 
        required: true,
      
    },
 
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        default: null, 
    },
    durationMinutes: {
        type: Number,
        default: 0,
    },
    logDate: {
        type: Date,
        default: Date.now,
    },
    closureReason: {
        type: String, // 'User Punch Out', 'Scheduled Cleanup', etc.
        default: 'User Punch Out', 
    }
}, { 
    timestamps: true 
});

export default mongoose.models.TimeLog 
    ? mongoose.models.TimeLog
    : mongoose.model("TimeLog", timeLogSchema);
