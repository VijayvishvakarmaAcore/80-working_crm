



// import mongoose from "mongoose";

// const exceptionTokenSchema = new mongoose.Schema({
//     employeeId: {
//         type: String,
//         required: true,
//         index: true,
//     },
//     reason: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ["pending", "approved", "rejected"],
//         default: "pending", 
//     },
//     approvedBy: {
//         type: String, 
//         default: null,
//     },
//     token: {
//        type: String, 
//     unique: true, 
 
//     },
//     used: {
//         type: Boolean,
//         default: false,
//     },
//     expiresAt: {
//         type: Date,
//         default: null, 
//     },
// }, { timestamps: true });

// export default mongoose.model("ExceptionToken", exceptionTokenSchema);



import mongoose from "mongoose";

const exceptionTokenSchema = new mongoose.Schema(
  {
  
    employeeId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },


    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },


    approvedBy: {
      type: String, 
      default: null,
    },

    token: {
      type: String,
      unique: true,
      sparse: true, 
      index: true,
    },

  
    used: {
      type: Boolean,
      default: false,
    },


    expiresAt: {
      type: Date,
      default: null,
    },

   
    rejectionReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

exceptionTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export default mongoose.model("ExceptionToken", exceptionTokenSchema);
