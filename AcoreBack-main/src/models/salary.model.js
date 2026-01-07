import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    baseSalary: {
      type: Number,
      required: true,
    },
    totalWorkingDays: {
      type: Number,
      required: true,
    },
    presentDays: {
      type: Number,
      default: 0,
    },
    leaveDays: {
      type: Number,
      default: 0,
    },
    absentDays: {
      type: Number,
      default: 0,
    },
    salaryDeduction: {
      type: Number,
      default: 0,
    },
    finalSalary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "generated", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Salary", salarySchema);
