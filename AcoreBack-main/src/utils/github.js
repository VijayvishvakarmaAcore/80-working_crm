import axios from "axios";

const GITHUB_OWNER = "";
const GITHUB_TOKEN = process.env.GitHub_TOKEN;

export const hasPushedToday = async (githubUsername) => {
  try {
    const repoResponse = await axios.get(
      `https://api.github.com/orgs/${GITHUB_OWNER}/repos`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );

    const repos = repoResponse.data;

    const today = new Date().toISOString().split("T")[0];
    for (const repo of repos) {
      const commiteRes = await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${repo.name}/commits`,
        {
          headers: { Authorization: `token ${GITHUB_TOKEN}` },
          params: {
            author: githubUsername,
            since: today + "T00:00:00Z",
            until: today + "T23:59:59Z",
          },
        }
      );
      if (commiteRes.data.length > 0) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("GitHub API error:", error.message);
    return false;
  }
};
