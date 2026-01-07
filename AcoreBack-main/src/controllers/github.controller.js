// import axios from "axios";
// import DailyCommit from "../models/dailyCommit.model.js";
// import User from "../models/user.model.js";

// export const pushToGithub = async (req, res) => {
//   try {
//     const { repository, commitMessage } = req.body;
//     const userId = req.user.employeeId;

//     if (!repository || !commitMessage) {
//       return res.status(400).json({
//         success: false,
//         message: "Repository name and commit message are required."
//       });
//     }

//     const user = await User.findOne({ employeeId: userId });

//     if (!user || !user.githubUsername) {
//       return res.status(400).json({
//         success: false,
//         message: "GitHub username not configured in user profile."
//       });
//     }

//     const username = user.githubUsername;
//     const token = process.env.GITHUB_TOKEN;

//     if (!token) {
//       return res.status(500).json({
//         success: false,
//         message: "GitHub token not set in .env file"
//       });
//     }

//     // ---------- GitHub API Push Request ----------
//     const url = `https://api.github.com/repos/${username}/${repository}/contents/daily_log_${Date.now()}.txt`;

//     const content = Buffer.from(`Auto commit: ${commitMessage}`).toString("base64");

//     const payload = {
//       message: commitMessage,
//       content: content
//     };

//     const githubResponse = await axios.put(url, payload, {
//       headers: {
//         Authorization: `token ${token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     // ---------- Save commit record ----------
//     const today = new Date().toISOString().split("T")[0];

//     await DailyCommit.findOneAndUpdate(
//       { employeeId: userId, date: today },
//       {
//         employeeId: userId,
//         date: today,
//         hasCommit: true,
//         repository,
//         commitMessage,
//         commitUrl: githubResponse.data.content.html_url
//       },
//       { upsert: true, new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Code pushed successfully",
//       commitUrl: githubResponse.data.content.html_url
//     });

//   } catch (error) {
//     console.error("GitHub Push Error:", error.response?.data || error);
//     return res.status(500).json({
//       success: false,
//       message: "GitHub push failed",
//       error: error.response?.data || error.message
//     });
//   }
// };




// import axios from "axios";
// import DailyCommit from "../models/dailyCommit.model.js";
// import User from "../models/user.model.js";

// /* ============================================================
//    1) VALIDATE GITHUB USERNAME
// ============================================================ */
// export const validateGithubUser = async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({
//         success: false,
//         message: "GitHub username is required",
//       });
//     }

//     const url = `https://api.github.com/users/${username}`;
//     const response = await axios.get(url);

//     return res.status(200).json({
//       success: true,
//       message: "GitHub username is valid",
//       user: response.data,
//     });
//   } catch (error) {
//     console.error("GitHub Validate Error:", error.response?.data || error.message);
//     return res.status(404).json({
//       success: false,
//       message: "GitHub username not found",
//       error: error.response?.data || error.message,
//     });
//   }
// };

// /* ============================================================
//    2) CHECK TODAY COMMIT STATUS
// ============================================================ */
// export const checkCommitStatus = async (req, res) => {
//   try {
//     const { employeeId } = req.body;
//     const today = new Date().toISOString().split("T")[0];

//     if (!employeeId) {
//       return res.status(400).json({
//         success: false,
//         message: "Employee ID is required",
//       });
//     }

//     const record = await DailyCommit.findOne({ employeeId, date: today });

//     return res.status(200).json({
//       success: true,
//       hasCommitToday: record?.hasCommit || false,
//       commitData: record || null,
//     });
//   } catch (error) {
//     console.error("Commit Status Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to check commit status",
//       error: error.message,
//     });
//   }
// };

// /* ============================================================
//    3) PUSH COMMIT TO GITHUB (FINAL OPTIMIZED)
// ============================================================ */
// export const pushToGithub = async (req, res) => {
//   try {
//     const { repository, commitMessage } = req.body;
//     const userId = req.user?.employeeId; // from authMiddleware

//     if (!repository || !commitMessage) {
//       return res.status(400).json({
//         success: false,
//         message: "Repository name and commit message are required",
//       });
//     }

//     const user = await User.findOne({ employeeId: userId });

//     if (!user || !user.githubUsername) {
//       return res.status(400).json({
//         success: false,
//         message: "GitHub username not configured in user profile.",
//       });
//     }

//     const username = user.githubUsername;
//     const token = process.env.GITHUB_TOKEN;

//     if (!token) {
//       return res.status(500).json({
//         success: false,
//         message: "GitHub Token missing in .env",
//       });
//     }

//     // Create unique log file
//     const fileName = `log_${new Date().toISOString().replace(/[:.]/g, "-")}.txt`;

//     const githubUrl = `https://api.github.com/repos/${username}/${repository}/contents/${fileName}`;

//     const contentEncoded = Buffer.from(
//       `Auto Commit Log:\n${commitMessage}\nTime: ${new Date().toLocaleString()}`
//     ).toString("base64");

//     const payload = {
//       message: commitMessage,
//       content: contentEncoded,
//     };

//     // Push file to GitHub repo
//     const githubResponse = await axios.put(githubUrl, payload, {
//       headers: {
//         Authorization: `token ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const today = new Date().toISOString().split("T")[0];

//     // Save or update daily commit in DB
//     await DailyCommit.findOneAndUpdate(
//       { employeeId: userId, date: today },
//       {
//         employeeId: userId,
//         date: today,
//         hasCommit: true,
//         repository,
//         commitMessage,
//         commitUrl: githubResponse.data.content.html_url,
//       },
//       { upsert: true, new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "GitHub Commit Successful",
//       fileUrl: githubResponse.data.content.html_url,
//     });

//   } catch (error) {
//     console.error("GitHub Push Error:", error.response?.data || error.message);

//     return res.status(500).json({
//       success: false,
//       message: "GitHub push failed",
//       error: error.response?.data || error.message,
//     });
//   }
// };



// deepseek 

import axios from "axios";
import DailyCommit from "../models/dailyCommit.model.js";
import User from "../models/user.model.js";
import moment from "moment-timezone";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;

/* ============================================================
   1) VALIDATE GITHUB USERNAME
============================================================ */
export const validateGithubUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "GitHub username is required",
      });
    }

    const url = `https://api.github.com/users/${username}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    return res.status(200).json({
      success: true,
      message: "GitHub username is valid",
      user: response.data,
    });
  } catch (error) {
    console.error("GitHub Validate Error:", error.response?.data || error.message);
    return res.status(404).json({
      success: false,
      message: "GitHub username not found",
      error: error.response?.data || error.message,
    });
  }
};

/* ============================================================
   2) CHECK TODAY COMMIT STATUS (Updated for exact check)
============================================================ */
export const checkCommitStatus = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const today = new Date().toISOString().split("T")[0];

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // Check in our database first
    const record = await DailyCommit.findOne({ employeeId, date: today });
    
    if (record?.hasCommit) {
      return res.status(200).json({
        success: true,
        hasCommitToday: true,
        commitData: record,
      });
    }

    // If no record, check GitHub directly
    const user = await User.findOne({ employeeId });
    if (!user || !user.githubUsername) {
      return res.status(200).json({
        success: true,
        hasCommitToday: false,
        message: "GitHub username not configured",
      });
    }

    // Call GitHub API to check commits
    const hasCommit = await hasUserCommittedToday(user.githubUsername);
    
    // Save result in database
    if (hasCommit && !record) {
      await DailyCommit.create({
        employeeId,
        date: today,
        hasCommit: true,
        repository: "company-repo", // Default or fetch from actual commit
      });
    }

    return res.status(200).json({
      success: true,
      hasCommitToday: hasCommit,
      commitData: record,
    });
  } catch (error) {
    console.error("Commit Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to check commit status",
      error: error.message,
    });
  }
};

/* ============================================================
   3) PUSH COMMIT TO GITHUB (Company Repository)
============================================================ */
export const pushToGithub = async (req, res) => {
  try {
    const { commitMessage } = req.body;
    const employeeId = req.user?.employeeId;

    if (!commitMessage) {
      return res.status(400).json({
        success: false,
        message: "Commit message is required",
      });
    }

    const user = await User.findOne({ employeeId });
    if (!user || !user.githubUsername) {
      return res.status(400).json({
        success: false,
        message: "GitHub username not configured in your profile",
      });
    }

    // Company's repository details (configured in .env)
    const COMPANY_REPO = process.env.COMPANY_REPO || "acore/employee-work";
    const COMPANY_BRANCH = process.env.COMPANY_BRANCH || "main";

    const username = user.githubUsername;
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return res.status(500).json({
        success: false,
        message: "GitHub Token not configured",
      });
    }

    // Create unique file
    const fileName = `work_${username}_${Date.now()}.txt`;
    const filePath = `daily-commits/${fileName}`;

    const githubUrl = `https://api.github.com/repos/${COMPANY_REPO}/contents/${filePath}`;

    const contentEncoded = Buffer.from(
      `Daily Work Commit by ${user.name} (${employeeId})\n` +
      `Date: ${new Date().toLocaleString()}\n` +
      `Message: ${commitMessage}\n` +
      `Employee: ${user.name}\n` +
      `GitHub: ${username}\n` +
      `Timestamp: ${new Date().toISOString()}`
    ).toString("base64");

    const payload = {
      message: `[Daily Work] ${commitMessage} - ${user.name}`,
      content: contentEncoded,
      branch: COMPANY_BRANCH,
    };

    // Push to company repository
    const githubResponse = await axios.put(githubUrl, payload, {
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    const today = new Date().toISOString().split("T")[0];

    // Save commit record
    const commitRecord = await DailyCommit.findOneAndUpdate(
      { employeeId, date: today },
      {
        employeeId,
        employeeName: user.name,
        date: today,
        hasCommit: true,
        repository: COMPANY_REPO,
        commitMessage,
        commitUrl: githubResponse.data.content.html_url,
        commitHash: githubResponse.data.commit.sha,
        pushedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Code pushed to company repository successfully",
      data: {
        fileUrl: githubResponse.data.content.html_url,
        commitHash: githubResponse.data.commit.sha,
        recordId: commitRecord._id,
      },
    });

  } catch (error) {
    console.error("GitHub Push Error:", error.response?.data || error.message);
    
    // Check if file already exists (409 Conflict)
    if (error.response?.status === 409) {
      return res.status(409).json({
        success: false,
        message: "File already exists. Try with different message.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to push code to GitHub",
      error: error.response?.data || error.message,
    });
  }
};

/* ============================================================
   4) GET ALL EMPLOYEE COMMITS (For Admin Dashboard)
============================================================ */
export const getAllEmployeeCommits = async (req, res) => {
  try {
    const { date } = req.query;
    const filterDate = date || new Date().toISOString().split("T")[0];

    // Get all commits for today
    const commits = await DailyCommit.find({ date: filterDate })
      .populate("user", "name email employeeId department")
      .sort({ pushedAt: -1 });

    // Get all employees to check who hasn't committed
    const allEmployees = await User.find(
      { role: { $ne: "admin" } },
      "employeeId name email department githubUsername"
    );

    const employeesWithCommits = commits.map(c => c.employeeId);
    
    const employeesWithoutCommits = allEmployees.filter(
      emp => !employeesWithCommits.includes(emp.employeeId)
    ).map(emp => ({
      employeeId: emp.employeeId,
      name: emp.name,
      email: emp.email,
      department: emp.department,
      githubUsername: emp.githubUsername,
      hasCommit: false,
      reason: "No commit today",
    }));

    const employeesWithCommitsData = commits.map(commit => ({
      employeeId: commit.employeeId,
      name: commit.employeeName,
      hasCommit: true,
      repository: commit.repository,
      commitMessage: commit.commitMessage,
      commitUrl: commit.commitUrl,
      commitHash: commit.commitHash,
      pushedAt: commit.pushedAt,
      date: commit.date,
    }));

    return res.status(200).json({
      success: true,
      date: filterDate,
      stats: {
        totalEmployees: allEmployees.length,
        committedToday: employeesWithCommitsData.length,
        notCommitted: employeesWithoutCommits.length,
      },
      data: {
        withCommits: employeesWithCommitsData,
        withoutCommits: employeesWithoutCommits,
      },
    });
  } catch (error) {
    console.error("Get All Commits Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch commit data",
      error: error.message,
    });
  }
};

/* ============================================================
   5) CHECK IF USER HAS COMMITTED TODAY (Helper Function)
============================================================ */
export const hasUserCommittedToday = async (githubUsername) => {
  try {
    if (!githubUsername || !GITHUB_TOKEN || !GITHUB_OWNER) {
      return false;
    }

    const dateString = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    const searchQuery = `author:${githubUsername} org:${GITHUB_OWNER} committer-date:${dateString}`;

    const searchResponse = await axios.get(
      'https://api.github.com/search/commits',
      {
        params: { q: searchQuery, per_page: 1 },
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.cloak-preview+json',
        },
      }
    );

    return searchResponse.data.total_count > 0;
  } catch (error) {
    console.error("GitHub Commit Check Error:", error.message);
    return false;
  }
};