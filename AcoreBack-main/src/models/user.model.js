import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Counter from "./counter.model.js";
import { ROLES } from "../constants/role.js";

// const userSchema = new mongoose.Schema(
//   {
//     // Personal Info
//     name: { type: String, required: true },
//     gender: { type: String, enum: ["male", "female", "other"] },
//     bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
//     mobile: { type: String, required: true },
//     birthday: { type: Date, required: true },
//     address: { type: String },
//     profilePicture: { type: String, default: "default_avatar_url" },
//     emergencyContactName: { type: String },
//     emergencyContactRelation: { type: String },
//     emergencyContactNumber: { type: String },
//     aadhaarNumber: { type: String, minlength: 12, maxlength: 12 },
//     panNumber: { type: String, uppercase: true, minlength: 10, maxlength: 10 },

//     // Professional Info
//     employeeId: { type: String, unique: true },
//     designation: { type: String, required: true },
//     department: { type: String, required: true },
//     dateOfJoining: { type: Date, required: true },
//     anniversaryDate: { type: Date },
//     employeeType: { type: String, enum: ["full-time", "intern"], required: true },
//     githubUsername: { type: String },
//     role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },

//     // Auth
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true, select: false },
//     refreshToken: { type: String },

//     // Bank / Account Details
//     accountNumber: { type: String },
//     ifscCode: { type: String },
//     bankName: { type: String },
//     bankBranch: { type: String },
//   },
//   { timestamps: true }
// );

// Auto-generate employeeId and hash password



const userSchema = new mongoose.Schema(
  {
    // Personal Info (Employee fills these)
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
    mobile: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: { type: String }, 
    profilePicture: { type: String, default: "default_avatar_url" },
    emergencyContactName: { type: String },
    emergencyContactRelation: { type: String },
    emergencyContactNumber: { type: String },
    aadhaarNumber: { type: String, minlength: 12, maxlength: 12 },
    panNumber: { type: String, uppercase: true, minlength: 10, maxlength: 10 },

    // Professional Info (HR fills these later)

    employeeId: { type: String, unique: true, sparse: true }, 
    designation: { type: String }, 
    department: { type: String },
    dateOfJoining: { type: Date },
    anniversaryDate: { type: Date },
    employeeType: { type: String, enum: ["full-time", "intern"] },
    githubUsername: { type: String },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.CLIENT },

   
    // Login Control Fields
    isActive: { type: Boolean, default: false }, 
    onboardingStatus: { type: String, enum: ["pending", "completed"], default: "pending" },

    // Auth
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    refreshToken: { type: String },

    // Bank / Account Details
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    bankBranch: { type: String },

    // permossion (admin provide)
    
 permissions: [{
    type: String,
    enum: [
        "edit_attendance",
        "view_reports",
        "view_own_attendance",
        "manage_users",
        "manage_teams",
        "grant_permissions",
        "manage_company_settings",
        "manage_holidays",
        "manage_leave",
        "manage_project",
        "view_salary_details",
        "approve_expenses",
        "manage_assets",
        "view_audit_logs",
        "manage_announcements"
    ]
}]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "employeeId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    const seq = counter.sequence_value.toString().padStart(3, "0");
    this.employeeId = `EMP${seq}`;
  }

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (!this.anniversaryDate && this.dateOfJoining) {
    this.anniversaryDate = new Date(this.dateOfJoining);
  }

  next();
});

userSchema.virtual("anniversaryThisYear").get(function () {
  if (!this.anniversaryDate) return null;
  const today = new Date();
  return new Date(today.getFullYear(), this.anniversaryDate.getMonth(), this.anniversaryDate.getDate());
});

export default mongoose.model("User", userSchema);
