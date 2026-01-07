// import axios from "axios";
// import moment from "moment-timezone";
// import User from "../models/user.model.js";
// import ExceptionToken from "../models/exceptionToken.model.js";

// const GITHUB_OWNER = process.env.GITHUB_OWNER;
// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// const githubAPI = axios.create({
//   baseURL: "https://api.github.com",
//   headers: {
//     Authorization: `Bearer ${GITHUB_TOKEN}`,
//     Accept: "application/vnd.github+json",
//   },
// });

// // ✅ helper
// const userHasCommitToday = async (githubUsername) => {
//   try {
//     const today = moment()
//       .tz("Asia/Kolkata")
//       .format("YYYY-MM-DD");

//     const query = `author:${githubUsername} org:${GITHUB_OWNER} committer-date:${today}`;

//     const res = await githubAPI.get("/search/commits", {
//       params: { q: query, per_page: 1 },
//       headers: {
//         Accept: "application/vnd.github.v3.text-match+json",
//       },
//     });

//     return res.data.total_count > 0;
//   } catch (err) {
//     console.error("GitHub commit check failed:", err.message);
//     return false;
//   }
// };

// // ✅ DEFAULT EXPORT — THIS IS CRITICAL
// const verifyGitCommit = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const { exceptionToken } = req.body;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     if (!user.githubUsername) {
//       return res.status(400).json({
//         success: false,
//         message: "GitHub username not set",
//       });
//     }

//     const committed = await userHasCommitToday(user.githubUsername);

//     if (committed) {
//       return next(); // ✅ allow punch-out
//     }

//     // 🔁 fallback: exception token
//     if (exceptionToken) {
//       const token = await ExceptionToken.findOne({
//         token: exceptionToken,
//         employeeId: user.employeeId,
//         used: false,
//         expiresAt: { $gt: new Date() },
//       });

//       if (token) {
//         token.used = true;
//         await token.save();
//         return next();
//       }
//     }

//     return res.status(403).json({
//       success: false,
//       message:
//         "No GitHub commit found today and no valid exception token",
//     });
//   } catch (err) {
//     console.error("verifyGitCommit error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "GitHub verification failed",
//     });
//   }
// };

// export default verifyGitCommit;




// // src/middlewares/verifyGitCommit.middleware.js

// import User from "../models/user.model.js";
// import ExceptionToken from "../models/exceptionToken.model.js";
// import { hasUserCommittedToday } from "../services/github.service.js";

// /* =====================================================
//    VERIFY GITHUB COMMIT
// ===================================================== */
// const verifyGitCommit = async (req, res, next) => {
//   try {
//     const userId = req.user?.id;
//     const { exceptionToken } = req.body || {};

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized user",
//       });
//     }

//     const user = await User.findById(userId).select(
//       "employeeId githubUsername"
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     if (!user.githubUsername) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "GitHub username not configured. Contact admin.",
//       });
//     }

//     /* =========================
//        PRIMARY CHECK
//     ========================= */
//     const committedToday = await hasUserCommittedToday(
//       user.githubUsername
//     );

//     if (committedToday) {
//       return next(); // ✅ PASS
//     }

//     /* =========================
//        FALLBACK: EXCEPTION TOKEN
//     ========================= */
//     if (exceptionToken) {
//       const tokenDoc = await ExceptionToken.findOne({
//         token: exceptionToken,
//         employeeId: user.employeeId,
//         used: false,
//         expiresAt: { $gt: new Date() },
//       });

//       if (tokenDoc) {
//         tokenDoc.used = true;
//         await tokenDoc.save();
//         return next(); // ✅ PASS
//       }
//     }

//     /* =========================
//        BLOCK PUNCH OUT
//     ========================= */
//     // return res.status(403).json({
//     //   success: false,
//     //   code: "GITHUB_COMMIT_REQUIRED",
//     //   message:
//     //     "No GitHub commit found today. Push code or request exception.",
//     // });

//     return res.status(403).json({
//   success: false,
//   reason: "GITHUB_REQUIRED",  
//   message: "No GitHub commit found today"
// });

//   } catch (error) {
//     console.error("❌ verifyGitCommit fatal error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "GitHub verification failed",
//     });
//   }
// };

// export default verifyGitCommit;


// deepseek

import User from "../models/user.model.js";
import ExceptionToken from "../models/exceptionToken.model.js";
import { hasUserCommittedToday } from "../services/github.service.js";

export const verifyGitCommit = async (req, res, next) => {
  try {
    const employeeId = req.user?.employeeId;
    const { exceptionToken } = req.body || {};

    if (!employeeId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const user = await User.findOne({ employeeId }).select(
      "employeeId githubUsername name"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (!user.githubUsername) {
      return res.status(400).json({
        success: false,
        message: "GitHub username not configured. Contact admin.",
      });
    }

    /* =========================
       PRIMARY CHECK: Today's Commit
    ========================= */
    const committedToday = await hasUserCommittedToday(user.githubUsername);

    if (committedToday) {
      return next(); // ✅ PASS - Has committed
    }

    /* =========================
       FALLBACK: Exception Token Check
    ========================= */
    if (exceptionToken) {
      const tokenDoc = await ExceptionToken.findOne({
        token: exceptionToken,
        employeeId: employeeId,
        used: false,
        status: "approved",
        expiresAt: { $gt: new Date() },
      });

      if (tokenDoc) {
        // Mark token as used
        tokenDoc.used = true;
        tokenDoc.usedAt = new Date();
        await tokenDoc.save();
        
        console.log(`✅ Punch-out authorized by exception token for ${employeeId}`);
        return next(); // ✅ PASS - Valid exception token
      }
    }

    /* =========================
       BLOCK PUNCH OUT
    ========================= */
    return res.status(403).json({
      success: false,
      code: "GITHUB_COMMIT_REQUIRED",
      message: "Cannot punch out. No GitHub commit found today.",
      help: "Push your code to GitHub or request exception token from admin.",
    });

  } catch (error) {
    console.error("❌ verifyGitCommit error:", error);
    return res.status(500).json({
      success: false,
      message: "GitHub verification failed",
    });
  }
};

export default verifyGitCommit;
