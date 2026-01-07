

import axios from "axios";
import User from "../models/user.model.js";
import ExceptionToken from "../models/exceptionToken.model.js";
import moment from "moment-timezone";

const GITHUB_OWNER = process.env.GITHUB_OWNER; 
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const api = axios.create({
    baseURL: "https://api.github.com",
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
});


async function userHasCommitToday(githubUsername) {
    try {
       

        const dateString = moment().tz("Asia/Kolkata").format("YYYY-MM-DD"); 
        
        const searchQuery = `author:${githubUsername} org:${GITHUB_OWNER} committer-date:${dateString}`;

        const searchResponse = await api.get(
            '/search/commits',
            {
                params: { q: searchQuery, per_page: 1 }, 
                headers: { Accept: 'application/vnd.github.v3.text-match+json' }
            }
        );

        return searchResponse.data.total_count > 0; 
    } catch (error) {
        console.error("GitHub API Commit Search ERROR:", error.message);
        return false; 
    }
}


export const verifyGitCommit = async (req, res, next) => {
    try {
        const { employeeId, exceptionToken } = req.body; 

        const user = await User.findOne({ employeeId });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        if (!user.githubUsername) {
            return res.status(400).json({ status: false, message: "GitHub username not set for this user." });
        }

 
        const hasCommit = await userHasCommitToday(user.githubUsername);

        if (hasCommit) {
            
            return next();
        }

    
        if (exceptionToken) {
            const tokenRecord = await ExceptionToken.findOne({ 
                token: exceptionToken,
                employeeId: employeeId,
                used: false,
                
            });

            if (tokenRecord) {
       
                tokenRecord.used = true;
                await tokenRecord.save(); 
                
                console.log(`Punch-out authorized by exception token for ${employeeId}. Reason: ${tokenRecord.reason}`);
                return next(); 
            }
        }
       
        return res.status(403).json({
            status: false,
            message: "You cannot punch out. No valid code commit found, and no valid exception token was provided.",
            fallbackAction: "If unable to commit, please call the token generation API with a reason to obtain a token.",
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};