import mongoose from "mongoose";

const dailyCommitSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    date: { type: String, required: true },
    hasCommit: { type: Boolean, default: false },
    repository: { type: String },
    commitMessage: { type: String },
    commitUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("DailyCommit", dailyCommitSchema);
