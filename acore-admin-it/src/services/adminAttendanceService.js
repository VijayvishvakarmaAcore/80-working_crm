// acore-admin-it/src/services/adminAttendanceService.js
import axios from './axiosInstance';

export const adminAttendanceService = {
  // Get live attendance
  getLiveAttendance: async () => {
    try {
      const response = await axios.get('/admin/attendance/live');
      return response.data;
    } catch (error) {
      console.error('Error fetching live attendance:', error);
      throw error;
    }
  },

  // Get today summary
  getTodaySummary: async () => {
    try {
      const response = await axios.get('/admin/attendance/today-summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching today summary:', error);
      throw error;
    }
  },

  // Get completed sessions
  getCompletedSessions: async (limit = 20) => {
    try {
      const response = await axios.get(`/admin/attendance/completed?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching completed sessions:', error);
      throw error;
    }
  },

  // Get attendance analytics
  getAttendanceAnalytics: async (params) => {
    try {
      const response = await axios.get('/admin/attendance/analytics', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
};