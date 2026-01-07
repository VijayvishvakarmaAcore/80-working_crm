

import ExceptionToken from "../models/exceptionToken.model.js";
import User from "../models/user.model.js";
import nodemailer from 'nodemailer';
import crypto from "crypto";


// export const generateExceptionToken = async (req, res) => {
//     try {
//         const { employeeId, employeeName, reason } = req.body || {};


//         if (!employeeId || !reason) {
//             return res.status(400).json({ status: false, message: "Employee ID and reason are required." });
//         }

//         const user = await User.findOne({ employeeId });
//         if (!user) {
//             return res.status(404).json({ status: false, message: "User not found." });
//         }
        
//         const finalEmployeeName = employeeName || user.name; 

//         const exception = await ExceptionToken.create({
//             employeeId: employeeId,
//             reason: reason,
//             status: "pending", 
//         });

       
//         const transporter = nodemailer.createTransport({
//             service: process.env.EMAIL_SERVICE, 
//             auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//         });

//         const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
        
//         const directApprovalLink = `${BASE_URL}/api/exceptions/direct-approve/${exception._id}`; 

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: process.env.ADMIN_EMAIL,
//             subject: `  ACTION REQUIRED: Punch-Out Exception Request from ${finalEmployeeName} (${employeeId})`,
//             html: `
//                 <h3>Punch-Out Exception Request Submitted</h3>
//                 <p>An employee needs approval to punch out without a code commit. Details:</p>
//                 <ul>
//                     <li><strong>Employee ID:</strong> ${employeeId}</li>
//                     <li><strong>Employee Name:</strong> ${finalEmployeeName}</li>
//                     <li><strong>Reason:</strong> ${exception.reason}</li>
//                     <li><strong>Request ID:</strong> ${exception._id}</li>
//                 </ul>
//                 <h4>Click the link below to APPROVE this request instantly:</h4>
//                 <a href="${directApprovalLink}" style="background-color:#4CAF50; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block;">
//                     APPROVE EXCEPTION
//                 </a>
//             `,
//         };
        
//         await transporter.sendMail(mailOptions);
//         console.log(`Approval email sent for Request ID: ${exception._id}`);

//         res.status(201).json({
//             status: true,
//             message: "Exception request submitted for admin approval. Notification email sent.",
//             data: { requestId: exception._id, status: exception.status },
//         });
//     } catch (error) {
//         console.error("Token Generation/Email Error:", error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

export const generateExceptionToken = async (req, res) => {
  try {
    const { reason } = req.body;
    const employeeId = req.user.employeeId;
    const employeeName = req.user.name;

    if (!reason) {
      return res.status(400).json({
        status: false,
        message: "Reason is required"
      });
    }

    const user = await User.findOne({ employeeId });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    const exception = await ExceptionToken.create({
      employeeId,
      reason,
      status: "pending"
    });

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

    const directApprovalLink =
      `${BASE_URL}/api/exceptions/direct-approve/${exception._id}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `ACTION REQUIRED: Punch-Out Exception (${employeeId})`,
      html: `
        <h3>Punch-Out Exception Request</h3>
        <p><b>Employee:</b> ${employeeName} (${employeeId})</p>
        <p><b>Reason:</b> ${reason}</p>
        <a href="${directApprovalLink}">APPROVE</a>
      `
    });

    return res.status(201).json({
      status: true,
      message: "Exception request sent to admin",
      data: {
        requestId: exception._id,
        status: exception.status
      }
    });
  } catch (err) {
    console.error("Exception Error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error"
    });
  }
};

export const approveTokenDirectly = async (req, res) => {
    // Removed approverId from destructuring
    const { requestId } = req.params; 

    try {
        const tokenRecord = await ExceptionToken.findById(requestId);

        if (!tokenRecord) {
            return res.status(404).send("Error: Exception Request Not Found.");
        }
        if (tokenRecord.status !== 'pending') {
            return res.status(400).send(`Error: Request is already ${tokenRecord.status}.`);
        }
        
        // 1. Generate Token and Expiry (24 hours)
        const newToken = crypto.randomBytes(10).toString('hex');
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1); 

        // 2. Update Record
        tokenRecord.status = 'approved';
        tokenRecord.approvedBy = 'System/Admin-Click'; 
        tokenRecord.token = newToken;
        tokenRecord.expiresAt = expiryDate;
        await tokenRecord.save();

        res.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head><title>Approval Successful</title></head>
            <body style="text-align: center; font-family: sans-serif;">
                <h1> Approval Successful</h1>
                <p>The exception token has been generated for Employee ID: <strong>${tokenRecord.employeeId}</strong>.</p>
                <p>Token: <strong>${newToken}</strong> (Expires: ${tokenRecord.expiresAt.toLocaleString()})</p>
                <p>The employee can now use this token to punch out.</p>
            </body>
            </html>
        `);

    } catch (error) {
        console.error("Direct Approval Error:", error);
        res.status(500).send("Error processing approval request.");
    }
};

export const getRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        
        const tokenRecord = await ExceptionToken.findById(requestId).select('-__v'); 

        if (!tokenRecord) {
            return res.status(404).json({ status: false, message: "Exception request not found." });
        }

        if (tokenRecord.status === 'approved') {
            
            return res.status(200).json({
                status: true,
                message: " Request approved. Token available.",
                data: {
                    status: tokenRecord.status,
                    token: tokenRecord.token,
                    expiresAt: tokenRecord.expiresAt,
                    used: tokenRecord.used
                }
            });
        } else if (tokenRecord.status === 'rejected') {
            // If rejected, inform the user
            return res.status(200).json({
                status: false,
                message: " Request rejected.",
                data: {
                    status: tokenRecord.status,
                }
            });
        } else {
            // If pending, inform the user they must wait
            return res.status(200).json({
                status: false,
                message: "Request is still pending approval from the administrator.",
                data: {
                    status: tokenRecord.status,
                    submittedAt: tokenRecord.createdAt,
                }
            });
        }
        
    } catch (error) {
        console.error("Get Request Status Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};



export const logExceptionRequest = async (req, res) => {
    try {
        const { employeeId, employeeName, reason } = req.body;

       if (!employeeId || !reason) {
  return res.status(400).json({
    status: false,
    message: "employeeId and reason are required"
  });
}


        const user = await User.findOne({ employeeId });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        const exception = await ExceptionToken.create({
            employeeId: employeeId,
            reason: reason,
            status: "pending", 

            employeeName: employeeName || user.name 
        });

        res.status(201).json({
            status: true,
            message: "Exception request logged successfully. Awaiting manual admin review.",
            data: { 
                requestId: exception._id, 
                status: exception.status,
                employeeId: exception.employeeId
            },
        });
    } catch (error) {
        console.error("Log Request Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const listPendingRequests = async (req, res) => {
    try {
       
        const pendingRequests = await ExceptionToken.find({ status: 'pending' })
            .sort({ createdAt: 1 })
            .select('-__v'); 

        res.status(200).json({ 
            status: true, 
            count: pendingRequests.length,
            data: pendingRequests 
        });
    } catch (error) {
        console.error("List Pending Requests Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const approveTokenManual = async (req, res) => {
    try {
        const { requestId } = req.params;
    
        // const approverId = req.user.employeeId || 'Manual_Admin_Panel'; 
        
        const tokenRecord = await ExceptionToken.findById(requestId);

        if (!tokenRecord) {
            return res.status(404).json({ status: false, message: "Exception Request Not Found." });
        }
        if (tokenRecord.status !== 'pending') {
            return res.status(400).json({ status: false, message: `Request is already ${tokenRecord.status}.` });
        }
        
      
        const newToken = crypto.randomBytes(10).toString('hex');
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1); 

    
        tokenRecord.status = 'approved';
        // tokenRecord.approvedBy = approverId; 
        tokenRecord.token = newToken;
        tokenRecord.expiresAt = expiryDate;
        await tokenRecord.save();

        res.status(200).json({
            status: true,
            message: "Exception approved and token generated.",
            data: {
                requestId: tokenRecord._id,
                token: newToken,
                expiresAt: expiryDate,
                employeeId: tokenRecord.employeeId
            }
        });

    } catch (error) {
        console.error("Manual Approval Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};


// export const rejectTokenManual = async (req, res) => {
//     try {
//         const { requestId } = req.params;
//         const { rejectionReason } = req.body; 
        
//         // const approverId = req.user.employeeId || 'Manual_Admin_Panel'; 
        
//         const tokenRecord = await ExceptionToken.findById(requestId);

//         if (!tokenRecord) {
//             return res.status(404).json({ status: false, message: "Exception Request Not Found." });
//         }
//         if (tokenRecord.status !== 'pending') {
//             return res.status(400).json({ status: false, message: `Request is already ${tokenRecord.status} and cannot be rejected.` });
//         }
        
  
//         tokenRecord.status = 'rejected';
//         // tokenRecord.approvedBy = approverId; 
//         tokenRecord.rejectionReason = rejectionReason || 'Rejected by Admin Panel.'; 
//         await tokenRecord.save();

//         res.status(200).json({
//             status: true,
//             message: "Exception request successfully rejected.",
//             data: {
//                 requestId: tokenRecord._id,
//                 status: 'rejected',
//                 rejectionReason: tokenRecord.rejectionReason
//             }
//         });

//     } catch (error) {
//         console.error("Manual Rejection Error:", error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


export const rejectTokenManual = async (req, res) => {
  try {
    const { requestId } = req.params;

    const body = req.body || {};
    const rejectionReason = body.rejectionReason;

    if (!rejectionReason) {
      return res.status(400).json({
        status: false,
        message: "rejectionReason is required",
      });
    }

    const tokenRecord = await ExceptionToken.findById(requestId);

    if (!tokenRecord) {
      return res.status(404).json({
        status: false,
        message: "Exception Request Not Found",
      });
    }

    if (tokenRecord.status !== "pending") {
      return res.status(400).json({
        status: false,
        message: `Request already ${tokenRecord.status}`,
      });
    }

    tokenRecord.status = "rejected";
    tokenRecord.rejectionReason = rejectionReason;

    await tokenRecord.save();

    return res.status(200).json({
      status: true,
      message: "Exception request rejected successfully",
      data: {
        requestId,
        status: "rejected",
        rejectionReason,
      },
    });
  } catch (error) {
    console.error("Reject Error:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
