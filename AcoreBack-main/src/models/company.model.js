import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
   
    name: { type: String, required: true },
    email: { type: String, required: true },
    logo: { type: String, default: "default_logo_url" },
    phone: { type: String },
    website: { type: String },
    address: { type: String },
    timezone: { type: String, default: "Asia/Kolkata" },
    currency: { type: String, default: "INR" },

   
    config: {
        startTime: { type: String, default: "09:00" }, 
        endTime: { type: String, default: "18:00" },
        breakDuration: { type: Number, default: 60 }, 
        overtimeRate: { type: Number, default: 1.5 }, 
        workingDays: [{ 
            type: String, 
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        }],
        autoClockOut: { type: Boolean, default: true }
    }
}, { timestamps: true });

export default mongoose.model('Company', companySchema);