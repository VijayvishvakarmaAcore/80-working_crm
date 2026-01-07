// import mongoose from 'mongoose';

// const dailySummarySchema = new mongoose.Schema({
//   employeeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true
//   },
//   date: {
//     type: Date,
//     required: true,
//     index: true
//   },
//   punchInTime: Date,
//   punchOutTime: Date,
//   totalActiveSeconds: {
//     type: Number,
//     default: 0
//   },
//   mouseActivities: {
//     type: Number,
//     default: 0
//   },
//   keyboardActivities: {
//     type: Number,
//     default: 0
//   },
//   applicationsUsed: [{
//     name: String,
//     usageCount: Number,
//     sampleWindows: [String]
//   }],
//   screenshots: [{
//     timestamp: Date,
//     image: String,
//     activityType: String
//   }],
//   productivityScore: {
//     type: Number,
//     min: 0,
//     max: 100,
//     default: 0
//   }
// }, {
//   timestamps: true
// });

// // Compound index
// dailySummarySchema.index({ employeeId: 1, date: 1 }, { unique: true });

// export default mongoose.model('DailySummary', dailySummarySchema);





import mongoose from 'mongoose';

const dailySummarySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
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
  mouseActivities: {
    type: Number,
    default: 0
  },
  keyboardActivities: {
    type: Number,
    default: 0
  },
  appSwitches: {
    type: Number,
    default: 0
  },
  applicationsUsed: [{
    name: String,
    usageSeconds: Number,
    usagePercentage: Number,
    windowTitles: [String]
  }],
  screenshots: [{
    timestamp: Date,
    image: String,
    activityType: String
  }],
  productivityScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  attendanceStatus: {
    type: String,
    enum: ['present', 'absent', 'half_day', 'leave'],
    default: 'present'
  },
  sessionData: {
    sessionId: String,
    startTime: Date,
    endTime: Date,
    totalDuration: Number
  }
}, {
  timestamps: true
});

// Unique compound index
dailySummarySchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model('DailySummary', dailySummarySchema);