import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String, 
      required: true,
    },
    department: {
      type: String,
      default: "all", // HR, IT, Sales, all
    },

    expiryDate: {
      type: Date,
      required: true,
    },
    attachments: [
      {
        url: String,
        fileName: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
