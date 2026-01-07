import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["todo", "in-progress", "review", "done","complete"], default: "todo" },
    estimatedHours: { type: Number, default: 0 }, 
    actualHours: { type: Number, default: 0 }, 
    progressPercentage: { type: Number, min: 0, max: 100, default: 0 },
    startDate: { type: Date },
    dueDate: { type: Date },
    attachments: [{ type: String }], // file URLs
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
