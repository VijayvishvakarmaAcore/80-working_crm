// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../services/axiosInstance";

// // DAILY
// export const fetchDailyAttendance = createAsyncThunk(
//   "attendanceAdmin/daily",
//   async (date, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `/api/admin/attendance/daily-status?date=${date}`
//       );
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // WEEKLY
// export const fetchWeeklyAttendance = createAsyncThunk(
//   "attendanceAdmin/weekly",
//   async ({ startDate, endDate }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `/api/admin/attendance/weekly-report?startDate=${startDate}&endDate=${endDate}`
//       );
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // MONTHLY
// export const fetchMonthlyStatus = createAsyncThunk(
//   "attendanceAdmin/monthly",
//   async ({ year, month }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `/api/admin/attendance/status-chart?date=${year}-${month}-01`
//       );
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const attendanceAdminSlice = createSlice({
//   name: "attendanceAdmin",
//   initialState: {
//     daily: null,
//     weekly: null,
//     monthly: null,
//     loading: false,
//     error: null,
//   },

//   extraReducers: (builder) => {
//     builder
//       .addMatcher(
//         (a) => a.type.startsWith("attendanceAdmin") && a.type.endsWith("pending"),
//         (state) => { state.loading = true; state.error = null; }
//       )
//       .addMatcher(
//         (a) => a.type.startsWith("attendanceAdmin") && a.type.endsWith("fulfilled"),
//         (state, action) => { state.loading = false;

//           if (action.type.includes("daily")) state.daily = action.payload;
//           if (action.type.includes("weekly")) state.weekly = action.payload;
//           if (action.type.includes("monthly")) state.monthly = action.payload;
//         }
//       )
//       .addMatcher(
//         (a) => a.type.startsWith("attendanceAdmin") && a.type.endsWith("rejected"),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

// export default attendanceAdminSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

// API Configuration - Adjust these based on your actual backend routes
const API_CONFIG = {
  BASE_URL: "/api/admin/attendance",
  ENDPOINTS: {
    DAILY: "/daily",
    WEEKLY: "/weekly",
    MONTHLY: "/monthly",
    MANUAL: "/manual",
    EXPORT: "/export"
  }
};

// Helper function to format dates
const formatDate = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
};

// DAILY ATTENDANCE - Multiple possible endpoints
export const fetchDailyAttendance = createAsyncThunk(
  "attendanceAdmin/fetchDaily",
  async (date, { rejectWithValue }) => {
    try {
      // Try different possible endpoints
      const endpoints = [
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DAILY}?date=${date}`,
        `${API_CONFIG.BASE_URL}/daily-status?date=${date}`,
        `${API_CONFIG.BASE_URL}/daily?date=${date}`,
        `/api/attendance/daily?date=${date}`,
        `/api/admin/daily-attendance?date=${date}`
      ];

      let lastError = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log("Trying endpoint:", endpoint);
          const { data } = await axios.get(endpoint);
          console.log("Daily API Response:", data);
          return data;
        } catch (err) {
          lastError = err;
          console.log("Failed for endpoint:", endpoint, err.response?.status);
          // Continue to next endpoint
        }
      }
      
      // If all endpoints failed
      throw lastError;
      
    } catch (err) {
      console.error("Daily attendance fetch error:", err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to fetch daily attendance",
        status: err.response?.status
      });
    }
  }
);

// WEEKLY ATTENDANCE
export const fetchWeeklyAttendance = createAsyncThunk(
  "attendanceAdmin/fetchWeekly",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      // Try different possible endpoints
      const endpoints = [
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WEEKLY}?startDate=${startDate}&endDate=${endDate}`,
        `${API_CONFIG.BASE_URL}/weekly-report?startDate=${startDate}&endDate=${endDate}`,
        `${API_CONFIG.BASE_URL}/weekly?startDate=${startDate}&endDate=${endDate}`,
        `/api/attendance/weekly?startDate=${startDate}&endDate=${endDate}`,
        `/api/admin/weekly-attendance?startDate=${startDate}&endDate=${endDate}`
      ];

      let lastError = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log("Trying weekly endpoint:", endpoint);
          const { data } = await axios.get(endpoint);
          console.log("Weekly API Response:", data);
          return data;
        } catch (err) {
          lastError = err;
          console.log("Failed for endpoint:", endpoint);
          // Continue to next endpoint
        }
      }
      
      throw lastError;
      
    } catch (err) {
      console.error("Weekly attendance fetch error:", err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to fetch weekly attendance",
        status: err.response?.status
      });
    }
  }
);

// MONTHLY ATTENDANCE
export const fetchMonthlyStatus = createAsyncThunk(
  "attendanceAdmin/fetchMonthly",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const dateParam = `${year}-${String(month).padStart(2, '0')}-01`;
      
      // Try different possible endpoints
      const endpoints = [
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MONTHLY}?year=${year}&month=${month}`,
        `${API_CONFIG.BASE_URL}/monthly-status?year=${year}&month=${month}`,
        `${API_CONFIG.BASE_URL}/monthly?year=${year}&month=${month}`,
        `${API_CONFIG.BASE_URL}/status-chart?date=${dateParam}`,
        `/api/attendance/monthly?year=${year}&month=${month}`,
        `/api/admin/monthly-attendance?year=${year}&month=${month}`
      ];

      let lastError = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log("Trying monthly endpoint:", endpoint);
          const { data } = await axios.get(endpoint);
          console.log("Monthly API Response:", data);
          return data;
        } catch (err) {
          lastError = err;
          console.log("Failed for endpoint:", endpoint);
          // Continue to next endpoint
        }
      }
      
      throw lastError;
      
    } catch (err) {
      console.error("Monthly attendance fetch error:", err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to fetch monthly attendance",
        status: err.response?.status
      });
    }
  }
);

// MARK ATTENDANCE MANUALLY
export const markAttendance = createAsyncThunk(
  "attendanceAdmin/markAttendance",
  async ({ empId, date, status, checkIn, checkOut }, { rejectWithValue }) => {
    try {
      const payload = {
        empId,
        date,
        status,
        ...(checkIn && { checkIn }),
        ...(checkOut && { checkOut })
      };

      // Try different endpoints
      const endpoints = [
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MANUAL}`,
        `${API_CONFIG.BASE_URL}/manual-entry`,
        `${API_CONFIG.BASE_URL}/mark`,
        `/api/attendance/mark`,
        `/api/admin/mark-attendance`
      ];

      let lastError = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log("Trying mark attendance endpoint:", endpoint, payload);
          const { data } = await axios.post(endpoint, payload);
          console.log("Mark attendance response:", data);
          return data;
        } catch (err) {
          lastError = err;
          console.log("Failed for endpoint:", endpoint);
        }
      }
      
      throw lastError;
      
    } catch (err) {
      console.error("Mark attendance error:", err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to mark attendance",
        status: err.response?.status
      });
    }
  }
);

// EXPORT ATTENDANCE
export const exportAttendance = createAsyncThunk(
  "attendanceAdmin/export",
  async ({ startDate, endDate, format = 'excel' }, { rejectWithValue }) => {
    try {
      const endpoint = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPORT}?startDate=${startDate}&endDate=${endDate}&format=${format}`;
      
      const response = await axios.get(endpoint, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_${startDate}_to_${endDate}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return { success: true };
    } catch (err) {
      console.error("Export error:", err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to export attendance",
        status: err.response?.status
      });
    }
  }
);

const attendanceAdminSlice = createSlice({
  name: "attendanceAdmin",
  initialState: {
    // Daily Data
    daily: {
      data: [],
      summary: {
        totalEmployees: 0,
        present: 0,
        absent: 0,
        onLeave: 0,
        lateArrivals: 0,
        percentage: 0,
        avgHours: 0
      },
      date: formatDate(new Date())
    },
    
    // Weekly Data
    weekly: {
      data: [],
      summary: {
        totalPresent: 0,
        totalAbsent: 0,
        totalLeaves: 0,
        avgDailyPercentage: 0,
        avgHours: 0
      },
      startDate: formatDate(new Date(new Date().setDate(new Date().getDate() - 6))),
      endDate: formatDate(new Date())
    },
    
    // Monthly Data
    monthly: {
      data: [],
      summary: {
        workingDays: 0,
        presentDays: 0,
        absentDays: 0,
        leaveDays: 0,
        totalEmployees: 0,
        avgAttendance: 0
      },
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    },
    
    // UI State
    loading: false,
    error: null,
    lastUpdated: null,
    markingAttendance: false,
    apiStatus: {
      daily: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
      weekly: 'idle',
      monthly: 'idle'
    }
  },
  
  reducers: {
    // Reset state
    resetAttendance: (state) => {
      state.daily.data = [];
      state.daily.summary = {
        totalEmployees: 0,
        present: 0,
        absent: 0,
        onLeave: 0,
        lateArrivals: 0,
        percentage: 0,
        avgHours: 0
      };
      state.error = null;
      state.apiStatus.daily = 'idle';
      state.apiStatus.weekly = 'idle';
      state.apiStatus.monthly = 'idle';
    },
    
    // Set date for daily view
    setDailyDate: (state, action) => {
      state.daily.date = action.payload;
    },
    
    // Set weekly date range
    setWeeklyRange: (state, action) => {
      state.weekly.startDate = action.payload.startDate;
      state.weekly.endDate = action.payload.endDate;
    },
    
    // Set monthly period
    setMonthlyPeriod: (state, action) => {
      state.monthly.year = action.payload.year;
      state.monthly.month = action.payload.month;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set API configuration
    setApiConfig: (state, action) => {
      // You can dynamically change API endpoints if needed
      if (action.payload.BASE_URL) {
        API_CONFIG.BASE_URL = action.payload.BASE_URL;
      }
      if (action.payload.ENDPOINTS) {
        API_CONFIG.ENDPOINTS = { ...API_CONFIG.ENDPOINTS, ...action.payload.ENDPOINTS };
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Daily Attendance
      .addCase(fetchDailyAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.apiStatus.daily = 'loading';
      })
      .addCase(fetchDailyAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.apiStatus.daily = 'succeeded';
        
        // Handle different response formats
        const response = action.payload;
        
        if (Array.isArray(response)) {
          // If response is directly an array
          state.daily.data = response;
          state.daily.summary = calculateDailySummary(response);
        } else if (response.attendance) {
          // If response has attendance array
          state.daily.data = response.attendance || [];
          state.daily.summary = response.summary || calculateDailySummary(response.attendance || []);
        } else if (response.data) {
          // If response is nested in data property
          state.daily.data = response.data || [];
          state.daily.summary = calculateDailySummary(response.data || []);
        } else {
          // Fallback
          state.daily.data = [];
          state.daily.summary = calculateDailySummary([]);
        }
        
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDailyAttendance.rejected, (state, action) => {
        state.loading = false;
        state.apiStatus.daily = 'failed';
        state.error = {
          type: 'daily',
          message: action.payload?.message || 'Failed to load daily attendance',
          details: action.payload
        };
      })
      
      // Weekly Attendance
      .addCase(fetchWeeklyAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.apiStatus.weekly = 'loading';
      })
      .addCase(fetchWeeklyAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.apiStatus.weekly = 'succeeded';
        
        const response = action.payload;
        
        if (Array.isArray(response)) {
          state.weekly.data = response;
          state.weekly.summary = calculateWeeklySummary(response);
        } else if (response.dailyReports) {
          state.weekly.data = response.dailyReports || [];
          state.weekly.summary = response.summary || calculateWeeklySummary(response.dailyReports || []);
        } else if (response.data) {
          state.weekly.data = response.data || [];
          state.weekly.summary = calculateWeeklySummary(response.data || []);
        } else {
          state.weekly.data = [];
          state.weekly.summary = calculateWeeklySummary([]);
        }
      })
      .addCase(fetchWeeklyAttendance.rejected, (state, action) => {
        state.loading = false;
        state.apiStatus.weekly = 'failed';
        state.error = {
          type: 'weekly',
          message: action.payload?.message || 'Failed to load weekly attendance',
          details: action.payload
        };
      })
      
      // Monthly Attendance
      .addCase(fetchMonthlyStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.apiStatus.monthly = 'loading';
      })
      .addCase(fetchMonthlyStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.apiStatus.monthly = 'succeeded';
        
        const response = action.payload;
        
        if (Array.isArray(response)) {
          state.monthly.data = response;
          state.monthly.summary = calculateMonthlySummary(response);
        } else if (response.monthlyData) {
          state.monthly.data = response.monthlyData || [];
          state.monthly.summary = response.summary || calculateMonthlySummary(response.monthlyData || []);
        } else if (response.data) {
          state.monthly.data = response.data || [];
          state.monthly.summary = calculateMonthlySummary(response.data || []);
        } else {
          state.monthly.data = [];
          state.monthly.summary = calculateMonthlySummary([]);
        }
      })
      .addCase(fetchMonthlyStatus.rejected, (state, action) => {
        state.loading = false;
        state.apiStatus.monthly = 'failed';
        state.error = {
          type: 'monthly',
          message: action.payload?.message || 'Failed to load monthly attendance',
          details: action.payload
        };
      })
      
      // Mark Attendance
      .addCase(markAttendance.pending, (state) => {
        state.markingAttendance = true;
        state.error = null;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.markingAttendance = false;
        
        // Update the specific attendance record in daily data
        const updatedRecord = action.payload;
        
        if (state.daily.data) {
          const index = state.daily.data.findIndex(item => 
            item.empId === updatedRecord.empId && 
            item.date === updatedRecord.date
          );
          
          if (index !== -1) {
            state.daily.data[index] = updatedRecord;
          } else {
            state.daily.data.push(updatedRecord);
          }
          
          // Recalculate summary
          state.daily.summary = calculateDailySummary(state.daily.data);
        }
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.markingAttendance = false;
        state.error = {
          type: 'mark',
          message: action.payload?.message || 'Failed to mark attendance',
          details: action.payload
        };
      });
  }
});

// Helper function to calculate daily summary
const calculateDailySummary = (attendance) => {
  if (!Array.isArray(attendance)) return {
    totalEmployees: 0,
    present: 0,
    absent: 0,
    onLeave: 0,
    lateArrivals: 0,
    percentage: 0,
    avgHours: 0
  };

  const present = attendance.filter(a => a.status === 'Present').length;
  const absent = attendance.filter(a => a.status === 'Absent').length;
  const onLeave = attendance.filter(a => a.status === 'Leave').length;
  const total = attendance.length;
  
  // Calculate average hours for present employees
  const presentEmployees = attendance.filter(a => a.status === 'Present');
  const totalHours = presentEmployees.reduce((sum, a) => {
    return sum + (parseFloat(a.totalHours) || 0);
  }, 0);
  const avgHours = presentEmployees.length > 0 ? totalHours / presentEmployees.length : 0;

  return {
    totalEmployees: total,
    present,
    absent,
    onLeave,
    lateArrivals: attendance.filter(a => a.isLate).length || 0,
    percentage: total > 0 ? Math.round((present / total) * 100) : 0,
    avgHours: parseFloat(avgHours.toFixed(1))
  };
};

// Helper function to calculate weekly summary
const calculateWeeklySummary = (weeklyData) => {
  if (!Array.isArray(weeklyData)) return {
    totalPresent: 0,
    totalAbsent: 0,
    totalLeaves: 0,
    avgDailyPercentage: 0,
    avgHours: 0
  };

  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLeaves = 0;
  let totalPercentage = 0;
  let totalHours = 0;
  let daysWithData = 0;

  weeklyData.forEach(day => {
    totalPresent += day.present || 0;
    totalAbsent += day.absent || 0;
    totalLeaves += day.leaves || day.onLeave || 0;
    totalPercentage += day.percentage || 0;
    totalHours += day.avgHours || 0;
    
    if (day.present !== undefined || day.percentage !== undefined) {
      daysWithData++;
    }
  });

  return {
    totalPresent,
    totalAbsent,
    totalLeaves,
    avgDailyPercentage: daysWithData > 0 ? Math.round(totalPercentage / daysWithData) : 0,
    avgHours: daysWithData > 0 ? parseFloat((totalHours / daysWithData).toFixed(1)) : 0
  };
};

// Helper function to calculate monthly summary
const calculateMonthlySummary = (monthlyData) => {
  if (!Array.isArray(monthlyData)) return {
    workingDays: 0,
    presentDays: 0,
    absentDays: 0,
    leaveDays: 0,
    totalEmployees: 0,
    avgAttendance: 0
  };

  // This is a simplified calculation
  // In real app, you'd have more detailed data
  const presentDays = monthlyData.filter(day => day.status === 'present').length;
  const totalDays = monthlyData.length;
  
  return {
    workingDays: totalDays,
    presentDays,
    absentDays: monthlyData.filter(day => day.status === 'absent').length,
    leaveDays: monthlyData.filter(day => day.status === 'leave').length,
    totalEmployees: 0, // You'd get this from another API
    avgAttendance: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0
  };
};

export const { 
  resetAttendance, 
  setDailyDate, 
  setWeeklyRange, 
  setMonthlyPeriod,
  clearError,
  setApiConfig
} = attendanceAdminSlice.actions;

export default attendanceAdminSlice.reducer;