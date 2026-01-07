import mongoose from "mongoose";

const shiftScheduleSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        index: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
  
    date: {
        type: Date,
        required: true,
    },

    shiftStart: {
        type: String,
        required: true,
    },

    shiftDurationHours: { 
        type: Number,
        required: true,
        min: 0
    },

    shiftEnd: { 
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['scheduled', 'modified', 'cancelled'],
        default: 'scheduled',
    },
}, { 
    timestamps: true 
});


shiftScheduleSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model("ShiftSchedule", shiftScheduleSchema);