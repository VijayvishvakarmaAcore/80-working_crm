import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const GITHUB_OWNER = process.env.GITHUB_OWNER; 
console.log("test1",GITHUB_OWNER);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
console.log("test2",GITHUB_TOKEN);

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
});

async function testConnection() {
  try {
    const res = await api.get(`/users/${GITHUB_OWNER}/repos`);
    console.log(" GitHub connected! Repos found:", res.data.map(r => r.name));
  } catch (error) {
    console.error(" GitHub connection failed:", error.message);
  }
}

testConnection();
