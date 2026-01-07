
// import mongoose from "mongoose";

// const leaveSchema = new mongoose.Schema(
//   {
//     employeeId: {
//       type: String,
//       required: true,
//     },

//     employeeName: {
//       type: String,
//       required: true,
//     },

//     leaveType: {
//       type: String,
//       enum: ["sick", "casual", "earned", "unpaid", "half-day", "auto"],
//       required: true,
//     },

//     reason: {
//       type: String,
//       required: false,
//     },

//     date: {
//       type: Date, // optional for auto leave
//     },

//     fromDate: {
//       type: Date,
//     },

//     toDate: {
//       type: Date,
//     },

//     days: {
//       type: Number,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected", "auto","absent"],
//       default: "pending",
//     },

//     approvedBy: {
//       type: String,
//     },
//     isEarlyLeave: {
//       type: Boolean,
//       default: false
//     },
    
//     earlyLeaveTime: {
//       type: String  // Format: "14:30" (when they want to leave)
//     },
    
//     earlyLeaveApproved: {
//       type: Boolean,
//       default: false
//     }
//   },

//     applyType: {
//       type: String,
//       enum: ["single", "range", "auto","absent"],
//       required: true,
//     },
    
//   },
//   { timestamps: true }
// );

// // Auto-calc days before saving
// leaveSchema.pre("save", function (next) {
//   if (this.applyType === "single") {
//     this.days = 1;
//     this.fromDate = this.fromDate || this.date;
//     this.toDate = this.toDate || this.date;
//   } else if (this.applyType === "range" && this.fromDate && this.toDate) {
//     const diffTime = Math.abs(this.toDate - this.fromDate);
//     this.days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//   } else if (this.applyType === "auto") {
//     this.days = 1;
//     this.leaveType = "auto";
//     this.status = "approved";
//   }

//   next();
// });

// export default mongoose.model("Leave", leaveSchema);






import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },

    employeeName: {
      type: String,
      required: true,
    },

    leaveType: {
      type: String,
      enum: ["sick", "casual", "earned", "unpaid", "half-day", "auto", "early"], // ✅ "early" add करें
      required: true,
    },

    reason: {
      type: String,
      required: false,
    },

    date: {
      type: Date, // optional for auto leave
    },

    fromDate: {
      type: Date,
    },

    toDate: {
      type: Date,
    },

    days: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "auto", "absent"],
      default: "pending",
    },

    approvedBy: {
      type: String,
    },
    
    // ✅ Early Leave Fields (सही जगह पर)
    isEarlyLeave: {
      type: Boolean,
      default: false
    },
    
    earlyLeaveTime: {
      type: String  // Format: "14:30" (when they want to leave)
    },
    
    earlyLeaveApproved: {
      type: Boolean,
      default: false
    },

    // ✅ ये applyType वापस सही जगह पर
    applyType: {
      type: String,
      enum: ["single", "range", "auto", "absent"],
      required: true,
    }
  },
  { timestamps: true }
);

// Auto-calc days before saving
leaveSchema.pre("save", function (next) {
  if (this.applyType === "single") {
    this.days = 1;
    this.fromDate = this.fromDate || this.date;
    this.toDate = this.toDate || this.date;
  } else if (this.applyType === "range" && this.fromDate && this.toDate) {
    const diffTime = Math.abs(this.toDate - this.fromDate);
    this.days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  } else if (this.applyType === "auto") {
    this.days = 1;
    this.leaveType = "auto";
    this.status = "approved";
  }

  next();
});

export default mongoose.model("Leave", leaveSchema);