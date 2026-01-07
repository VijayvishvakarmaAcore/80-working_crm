import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["national", "company", "optional"],
      default: "company",
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Holiday", holidaySchema);
