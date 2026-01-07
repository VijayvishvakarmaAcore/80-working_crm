// import axios from "axios";
// import moment from "moment-timezone";

// /**
//  * ENV REQUIRED
//  * ----------------------------------
//  * GITHUB_TOKEN = github personal access token
//  * GITHUB_OWNER = org name OR username (company account)
//  */

// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// const GITHUB_OWNER = process.env.GITHUB_OWNER;

// /* =========================
//    GITHUB AXIOS INSTANCE
// ========================= */
// const githubAPI = axios.create({
//   baseURL: "https://api.github.com",
//   headers: {
//     Authorization: `Bearer ${GITHUB_TOKEN}`,
//     Accept: "application/vnd.github.v3+json",
//   },
// });

// /* =========================
//    HELPER: TODAY DATE (IST)
// ========================= */
// const getTodayIST = () => {
//   return moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
// };

// /* =====================================================
//    MAIN FUNCTION
//    → Check if user has ANY commit today
// ===================================================== */

// /**
//  * @param {string} githubUsername - GitHub username of employee
//  * @returns {boolean} true | false
//  */
// export const hasUserCommittedToday = async (githubUsername) => {
//   try {
//     if (!githubUsername) return false;

//     const today = getTodayIST();

//     /**
//      * GitHub Search Query
//      * - author: commits by this user
//      * - org: company GitHub org
//      * - committer-date: today's date
//      */
//     const searchQuery = `author:${githubUsername} org:${GITHUB_OWNER} committer-date:${today}`;

//     const response = await githubAPI.get("/search/commits", {
//       params: {
//         q: searchQuery,
//         per_page: 1, // we only need to know IF at least 1 commit exists
//       },
//       headers: {
//         // Required for commit search API
//         Accept: "application/vnd.github.cloak-preview+json",
//       },
//     });

//     return response.data?.total_count > 0;
//   } catch (error) {
//     console.error("❌ GitHub Commit Check Failed:", error.message);
//     return false; // fail-safe (never block server)
//   }
// };

// /* =====================================================
//    OPTIONAL (Future Use)
//    → Get commit count for admin dashboard
// ===================================================== */
// export const getTodayCommitCount = async (githubUsername) => {
//   try {
//     const today = getTodayIST();

//     const searchQuery = `author:${githubUsername} org:${GITHUB_OWNER} committer-date:${today}`;

//     const response = await githubAPI.get("/search/commits", {
//       params: { q: searchQuery },
//       headers: {
//         Accept: "application/vnd.github.cloak-preview+json",
//       },
//     });

//     return response.data?.total_count || 0;
//   } catch (error) {
//     console.error("❌ GitHub Commit Count Error:", error.message);
//     return 0;
//   }
// };




// src/services/github.service.js

import axios from "axios";
import moment from "moment-timezone";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;

/* =========================
   VALIDATION
========================= */
if (!GITHUB_TOKEN || !GITHUB_OWNER) {
  console.warn(
    "⚠️ GitHub ENV missing: GITHUB_TOKEN or GITHUB_OWNER"
  );
}

/* =========================
   AXIOS INSTANCE
========================= */
const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  timeout: 8000,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.cloak-preview+json",
  },
});

/* =========================
   DATE HELPER (IST)
========================= */
const todayIST = () =>
  moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

/* =========================
   MAIN CHECK
========================= */
export const hasUserCommittedToday = async (githubUsername) => {
  try {
    if (!githubUsername || !GITHUB_TOKEN || !GITHUB_OWNER) {
      return false;
    }

    const query = `author:${githubUsername} org:${GITHUB_OWNER} committer-date:${todayIST()}`;

    const res = await githubAPI.get("/search/commits", {
      params: { q: query, per_page: 1 },
    });

    return Boolean(res.data?.total_count);
  } catch (err) {
    console.error("❌ GitHub commit check error:", err.message);
    return false; // never break punch-out system
  }
};
