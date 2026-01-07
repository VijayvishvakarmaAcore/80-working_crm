import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
   inTime: { type: String, required: true },

    outTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["present", "absent", "leave","auto"],
      default: "present",
    },
    totalTime: {
      type: String,
    },
location:{
  lat:String,
  lng:String
},
punchSource:String,
    isPartialLeave: {
        type: Boolean,
        default: false,
    },
    partialLeaveType: {
        type: String,
        enum: ['half-day-am', 'half-day-pm', 'short-leave', null],
        default: null,
    },
    partialLeaveReason: {
        type: String,
        default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendence", attendanceSchema);



// ------------------------------------------------------------------------------------------------------------




// import mongoose from "mongoose";

// const attendanceSchema = new mongoose.Schema(
//   {
//     employeeId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Employee",
//       required: true,
//     },

//     date: {
//       type: Date,
//       required: true,
//     },

//     inTime: { 
//       type: String, 
//       required: true 
//     },

//     outTime: {
//       type: String,
//     },

//     status: {
//       type: String,
//       enum: ["present", "absent", "leave", "auto"],
//       default: "present",
//     },

//     totalTime: {
//       type: String,
//     },

//     punchSource: {
//       type: String, // "electron" | "web" | "mobile"
//     },

//     isPartialLeave: {
//       type: Boolean,
//       default: false,
//     },

//     partialLeaveType: {
//       type: String,
//       enum: ["half-day-am", "half-day-pm", "short-leave", null],
//       default: null,
//     },

//     partialLeaveReason: {
//       type: String,
//       default: null,
//     },

//     // FINAL APPROVED FIELDS
//     latitude: {
//       type: Number,
//     },

//     longitude: {
//       type: Number,
//     },

//     isWithinOfficeRadius: {
//       type: Boolean,
//       default: false,
//     },

//     totalActiveSeconds: {
//       type: Number,
//       default: 0,
//     },

//     idleSeconds: {
//       type: Number,
//       default: 0,
//     },

//     sessionStatus: {
//       type: String,
//       enum: ["RUNNING", "COMPLETED"],
//       default: "RUNNING",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Attendance", attendanceSchema);
