import mongoose from "mongoose";

const workSessionSchema = new mongoose.Schema(
  {
    // 🔹 Employee reference (new system only)
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🔹 One session per day
    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },

    // 🔹 Session lifecycle
    startAt: {
      type: Date,
      required: true,
    },

    endAt: {
      type: Date,
      default: null,
    },

    // 🔹 Time tracking (SECONDS)
    workSeconds: {
      type: Number,
      default: 0,
    },

    idleSeconds: {
      type: Number,
      default: 0,
    },

    overtimeSeconds: {
      type: Number,
      default: 0,
    },

    // 🔹 Session status
    status: {
      type: String,
      enum: ["WORKING", "COMPLETED"],
      default: "WORKING",
    },

    // 🔹 Resume helpers
    lastActiveAt: {
      type: Date,
      default: null,
    },

    lastIdleAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// 🔒 One work session per employee per day
workSessionSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model("WorkSession", workSessionSchema);
