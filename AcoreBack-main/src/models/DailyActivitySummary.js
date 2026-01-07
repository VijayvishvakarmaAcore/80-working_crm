// models/DailyActivitySummary.js
import mongoose from "mongoose";

const dailyActivitySummarySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  punchInTime: Date,
  punchOutTime: Date,
  totalActiveSeconds: {
    type: Number,
    default: 0
  },
  totalIdleSeconds: {
    type: Number,
    default: 0
  },
  totalWorkingSeconds: {
    type: Number,
    default: 0
  },
  totalMouseActivities: {
    type: Number,
    default: 0
  },
  totalKeyboardActivities: {
    type: Number,
    default: 0
  },
  applicationsUsed: [{
    name: String,
    title: String,
    totalTime: Number, // seconds
    percentage: Number
  }],
  productivityScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  idlePeriods: [{
    startTime: Date,
    endTime: Date,
    duration: Number
  }],
  screenshots: [{
    timestamp: Date,
    image: String,
    activityType: String
  }],
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  status: {
    type: String,
    enum: ["in_progress", "completed", "absent"],
    default: "in_progress"
  }
}, { timestamps: true });

// Compound index for faster queries
dailyActivitySummarySchema.index({ employeeId: 1, date: 1 });

export default mongoose.model("DailyActivitySummary", dailyActivitySummarySchema);