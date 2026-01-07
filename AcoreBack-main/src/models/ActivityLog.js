// import mongoose from 'mongoose';

// const activityLogSchema = new mongoose.Schema({
//   employeeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true
//   },
//   timestamp: {
//     type: Date,
//     required: true,
//     index: true,
//     default: Date.now
//   },
//   activityType: {
//     type: String,
//     enum: [
//       'mouse_move',
//       'key_press',
//       'app_switch',
//       'window_focus',
//       'idle_start',
//       'idle_end',
//       'screenshot',
//       'punch_in',
//       'punch_out'
//     ],
//     required: true
//   },
//   applicationName: String,
//   windowTitle: String,
//   mouseActivity: {
//     type: Number,
//     default: 0
//   },
//   keyboardActivity: {
//     type: Number,
//     default: 0
//   },
//   screenshot: String, // Base64 encoded
//   metadata: {
//     type: Map,
//     of: mongoose.Schema.Types.Mixed
//   }
// }, {
//   timestamps: true
// });

// // Compound index for faster queries
// activityLogSchema.index({ employeeId: 1, timestamp: -1 });
// activityLogSchema.index({ timestamp: 1, activityType: 1 });

// export default mongoose.model('ActivityLog', activityLogSchema);







import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    required: true,
    index: true,
    default: Date.now
  },
  activityType: {
    type: String,
    enum: [
      'mouse_move',
      'key_press',
      'app_switch',
      'window_focus',
      'idle_start',
      'idle_end',
      'screenshot',
      'punch_in',
      'punch_out',
      'system_active'
    ],
    required: true
  },
  applicationName: String,
  windowTitle: String,
  mouseActivity: {
    type: Number,
    default: 0
  },
  keyboardActivity: {
    type: Number,
    default: 0
  },
  screenshot: String,
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  sessionId: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound indexes
activityLogSchema.index({ employeeId: 1, timestamp: -1 });
activityLogSchema.index({ timestamp: 1, activityType: 1 });
activityLogSchema.index({ employeeId: 1, isActive: 1 });

export default mongoose.model('ActivityLog', activityLogSchema);