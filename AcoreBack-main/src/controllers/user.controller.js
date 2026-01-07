


import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from  "dotenv"; 
import { uploadStream } from "../utils/cloudinaryUploader.js";
dotenv.config();




export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: { 
            employeeId: user.employeeId, 
            name: user.name, 
            email: user.email, 
            profilePicture: user.profilePicture
        },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


export const updateProfilePicture = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // 1. Validate uploaded file
    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .json({ status: false, message: "No image file provided." });
    }

    // 2. Upload file to Cloudinary
    const folderPath = `hr_app/avatars/${employeeId}`;

    let imageUrl;
    try {
      const uploadResult = await uploadStream(req.file.buffer, folderPath);
      imageUrl = uploadResult.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary Upload Error:", uploadError);
      return res.status(500).json({
        status: false,
        message: "Failed to upload image to cloud storage.",
        error: uploadError?.message,
      });
    }

    // 3. Update DB
    const User = mongoose.model("User"); // ensure model exists
    const updatedUser = await User.findOneAndUpdate(
      { employeeId },
      { profilePicture: imageUrl },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }

    return res.status(200).json({
      status: true,
      message: "Profile picture updated successfully via Cloudinary.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Profile Picture Update Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// export const loginUser = async (req, res) => {
//   try {
//     const { employeeId, email, password } = req.body;

//     if (!password || (!employeeId && !email)) {
//         return res.status(400).json({ status: false, message: "Employee ID or Email and Password are required." });
//     }

//     const user = await User.findOne({
//       $or: [{ employeeId }, { email }],
//     });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ status: false, message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid password",
//       });
//     }



//     const token = jwt.sign(
//       { id: user._id, employeeId: user.employeeId, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       status: true,
//       message: "Login successfull",
//       data: {
//         employeeId: user.employeeId,
//         name: user.name,
//         email: user.email,
//         profilePicture: user.profilePicture,
//         token,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ status: false, message: error.message });
//   }
// };


export const loginUser = async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;

    // 1. Input Validation
    if (!password || (!employeeId && !email)) {
      return res.status(400).json({
        status: false,
        message: "Employee ID or Email and Password are required.",
      });
    }

    const user = await User.findOne({
      $or: [{ employeeId }, { email }],
    }).select("+password"); 

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found" });
    }

    if (!user.isActive) {
            return res.status(403).json({ 
                status: false, 
                message: "Your account is inactive. Please contact HR for activation." 
            });
        }

    if (!user.password) {
        // This should not happen if .select('+password') works, but it's a safety check
        console.error(`User ${user._id} retrieved without password hash.`);
        return res.status(500).json({ 
            status: false, 
            message: "Authentication failure: Password hash not available." 
        });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid password",
      });
    }
    
    if (!process.env.JWT_SECRET) {
        console.error("FATAL ERROR: process.env.JWT_SECRET is not defined.");
        return res.status(500).json({ 
            status: false, 
            message: "Server configuration error: JWT Secret is missing." 
        });
    }

    const token = jwt.sign(
      { id: user._id,role:user.role, employeeId: user.employeeId,email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    ); 

   
    const refreshToken = jwt.sign({id:user.id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
   

      user.refreshToken = refreshToken;
    await user.save();


    user.password = undefined; 


     res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    
    res.status(200).json({
      status: true,
      message: "Login successfull",
      data: {
        user:user,
        // employeeId: user.employeeId,
        // name: user.name,
        // email: user.email,
        // profilePicture: user.profilePicture,
        token,
      },
    });
  } catch (error) {
    // 6. Generic Error Handler
    console.error("Login Error:", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      status: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getUserByEmpId = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const user = await User.findOne({ employeeId: employeeId }).select("-password");

    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    res.json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateUserByEmpId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const updates = { ...req.body };
    
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    
    const updatedUser = await User.findOneAndUpdate(
      { employeeId },
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ status: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const deletedUser = await User.findOneAndDelete({ employeeId }).select("-password");

    if (!deletedUser) {
      return res.status(400).json({
        status: false,
        message: "user not found ",
      });
    }
    res.json({
      status: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token provided" });


  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);

    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: "Invalid refresh token" });

    // Generate new access token with full payload
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role, employeeId: user.employeeId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token",Error:err.message });
  }
};



export const logoutUser = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(204);

  const user = await User.findOne({ refreshToken: token });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("refreshToken");
  res.sendStatus(204);
};


export const employeeSelfRegister = async (req, res) => {
  try{
const { name, email, password, mobile, birthday, gender, address } = req.body;
    
    const userExists = await User.findOne({email});


        if (userExists) return res.status(400).json({ message: "Email already registered" });
  
        const newUser = await User.create({
         name, email, password, mobile, birthday, gender, address,
        isActive: false, // User cannot login yet
            onboardingStatus: "pending"
        });

        res.status(201).json({ 
            status: true, 
            message: "Personal details saved. Please wait for HR to complete your registration." 
        });
  }catch(error){
res.status(500).json({ status: false, message: error.message });
  }
}


export const hrCompleteRegistration = async (req, res) => {
    try {
    const { userId } = req.params;
        const { employeeId, designation, department, employeeType, dateOfJoining, role } = req.body;
const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                employeeId,
                designation,
                department,
                employeeType,
                dateOfJoining,
                role,
                isActive: true,
                onboardingStatus: "completed"
            },
            { new: true }
        );
        res.status(200).json({ 
            status: true, 
            message: "Employee profile completed and activated!",
            data: updatedUser 
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};