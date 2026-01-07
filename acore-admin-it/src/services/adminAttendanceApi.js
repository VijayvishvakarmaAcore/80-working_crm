// acore-admin-it/src/services/adminAttendanceApi.js
import axiosInstance from "../services/axiosInstance";

const handleApi = async (callback) => {
  try {
    const res = await callback();
    if (res?.data?.status === false) throw new Error(res?.data?.message || "Request failed");
    return res.data;
  } catch (error) {
    console.error("Admin Attendance API Error:", error?.response?.data || error.message);
    throw error?.response?.data || { message: error.message || "Request failed" };
  }
};

export const adminAttendanceApi = {

  // 1️⃣ Daily Overview
  getDailyOverview: async (date) =>
    handleApi(() =>
      axiosInstance.get(`/api/admin/attendance/overview?date=${date}`)
    ),

  // 2️⃣ Attendance List
  getAttendanceList: async (date) =>
    handleApi(() =>
      axiosInstance.get(`/api/admin/attendance/list?date=${date}`)
    ),

  // 3️⃣ Weekly Stats
  getWeeklyStats: async (startDate, endDate) =>
    handleApi(() =>
      axiosInstance.get(
        `/api/admin/attendance/weekly-stats?startDate=${startDate}&endDate=${endDate}`
      )
    ),

  // 4️⃣ Weekly Trends
  getWeeklyTrends: async (startDate, endDate) =>
    handleApi(() =>
      axiosInstance.get(
        `/api/admin/attendance/weekly-trends?startDate=${startDate}&endDate=${endDate}`
      )
    ),

  // 5️⃣ Monthly Overview
  getMonthlyOverview: async (month, year) =>
    handleApi(() =>
      axiosInstance.get(
        `/api/admin/attendance/monthly-overview?month=${month}&year=${year}`
      )
    ),
};

export default adminAttendanceApi;
