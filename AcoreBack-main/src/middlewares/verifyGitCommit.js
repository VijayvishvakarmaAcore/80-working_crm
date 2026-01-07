// import User from "../models/user.model.js";
// import ExceptionToken from "../models/exceptionToken.model.js";
// import { hasUserCommittedToday } from "../services/github.service.js";

// /**
//  * Middleware:
//  * --------------------------------------------------
//  * 1. Check GitHub commit for today
//  * 2. If commit exists → allow punch-out
//  * 3. Else check exception token
//  * 4. Else BLOCK punch-out
//  */
// export const verifyGitCommit = async (req, res, next) => {
//   try {
//     /**
//      * NOTE:
//      * req.user is already set by `protect` middleware
//      */
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized user",
//       });
//     }

//     // Fetch user
//     const user = await User.findById(userId).select(
//       "employeeId name githubUsername"
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     // ❌ GitHub username not set
//     if (!user.githubUsername) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "GitHub username not configured. Please contact admin.",
//       });
//     }

//     // 🔍 CHECK TODAY COMMIT
//     const hasCommitToday = await hasUserCommittedToday(
//       user.githubUsername
//     );

//     // ✅ Commit found → allow punch-out
//     if (hasCommitToday) {
//       return next();
//     }

//     /**
//      * ⛔ NO COMMIT FOUND
//      * → Check exception token
//      */
//     const { exceptionToken } = req.body;

//     if (!exceptionToken) {
//       return res.status(403).json({
//         success: false,
//         message:
//           "Daily code commit not found. Punch-out blocked.",
//         actionRequired:
//           "Push code to GitHub OR request exception approval",
//       });
//     }

//     // 🔑 Validate exception token
//     const tokenRecord = await ExceptionToken.findOne({
//       token: exceptionToken,
//       employeeId: user.employeeId,
//       status: "approved",
//       used: false,
//       expiresAt: { $gt: new Date() },
//     });

//     if (!tokenRecord) {
//       return res.status(403).json({
//         success: false,
//         message: "Invalid or expired exception token",
//       });
//     }

//     // ✅ Mark token as used
//     tokenRecord.used = true;
//     await tokenRecord.save();

//     console.log(
//       `⚠️ Punch-out allowed via exception token for ${user.employeeId}`
//     );

//     return next();
//   } catch (error) {
//     console.error("❌ verifyGitCommit error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Git commit verification failed",
//     });
//   }
// };

// export default verifyGitCommit;
