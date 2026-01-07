// adminWorkSessionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

/* =========================
   📡 ADMIN WORK SESSION APIS
   (For Live Tracking Page)
========================= */

// 🟢 Get All Employees Current Sessions
export const fetchAllEmployeesSessions = createAsyncThunk(
  "adminWorkSession/fetchAllEmployeesSessions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/employee-sessions/current");
      console.log("✅ [ADMIN] All employees sessions:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ [ADMIN] Fetch sessions error:", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to load sessions"
      );
    }
  }
);

// 🔄 Get Employee Session History
export const fetchEmployeeSessionHistory = createAsyncThunk(
  "adminWorkSession/fetchEmployeeSessionHistory",
  async (employeeId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/admin/employee-sessions/history/${employeeId}`);
      console.log("✅ [ADMIN] Employee session history:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ [ADMIN] Session history error:", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to load session history"
      );
    }
  }
);

// 📊 Update Employee Session (Admin can update status)
export const updateEmployeeSession = createAsyncThunk(
  "adminWorkSession/updateEmployeeSession",
  async ({ employeeId, status, notes }, { rejectWithValue }) => {
    try {
      console.log(`📊 [ADMIN] Updating employee ${employeeId} to ${status}`);
      const res = await axios.put(`/api/admin/employee-sessions/update/${employeeId}`, {
        status,
        notes
      });
      return res.data;
    } catch (err) {
      console.error("❌ [ADMIN] Update session error:", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to update session"
      );
    }
  }
);

// 🔍 Get Employee Real-time Activity
export const fetchEmployeeActivity = createAsyncThunk(
  "adminWorkSession/fetchEmployeeActivity",
  async (employeeId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/admin/employee-activity/${employeeId}`);
      console.log("✅ [ADMIN] Employee activity:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ [ADMIN] Activity fetch error:", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to load activity"
      );
    }
  }
);

// 📈 Get Productivity Analytics
export const fetchProductivityAnalytics = createAsyncThunk(
  "adminWorkSession/fetchProductivityAnalytics",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { department, dateRange, limit } = params;
      const res = await axios.get("/api/admin/analytics/productivity", {
        params: { department, dateRange, limit }
      });
      console.log("✅ [ADMIN] Productivity analytics:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ [ADMIN] Analytics error:", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to load analytics"
      );
    }
  }
);

/* =========================
   🗂️ SLICE FOR LIVE TRACKING PAGE
========================= */

const adminWorkSessionSlice = createSlice({
  name: "adminWorkSession",
  initialState: {
    // All employees current sessions
    allSessions: [],
    allSessionsLoading: false,
    allSessionsError: null,
    
    // Selected employee details
    selectedEmployee: null,
    employeeHistory: [],
    employeeActivity: [],
    
    // Analytics data
    productivityAnalytics: null,
    analyticsLoading: false,
    analyticsError: null,
    
    // Real-time updates
    realTimeUpdates: [],
    lastUpdated: null,
    
    // Filters
    filters: {
      department: 'all',
      status: 'all',
      dateRange: 'today'
    }
  },

  reducers: {
    // 🔄 Reset selected employee
    resetSelectedEmployee: (state) => {
      state.selectedEmployee = null;
      state.employeeHistory = [];
      state.employeeActivity = [];
    },

    // 🔍 Set filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // 📝 Update employee status locally (for immediate UI update)
    updateEmployeeStatus: (state, action) => {
      const { employeeId, status } = action.payload;
      const employeeIndex = state.allSessions.findIndex(emp => emp.employeeId === employeeId);
      if (employeeIndex !== -1) {
        state.allSessions[employeeIndex].status = status;
        state.allSessions[employeeIndex].lastUpdated = new Date().toISOString();
      }
      
      // Also update in selected employee if matches
      if (state.selectedEmployee && state.selectedEmployee.employeeId === employeeId) {
        state.selectedEmployee.status = status;
      }
    },

    // 🔄 Add real-time update
    addRealTimeUpdate: (state, action) => {
      const update = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      state.realTimeUpdates.unshift(update);
      
      // Keep only last 50 updates
      if (state.realTimeUpdates.length > 50) {
        state.realTimeUpdates.pop();
      }
    },

    // 🗑️ Clear real-time updates
    clearRealTimeUpdates: (state) => {
      state.realTimeUpdates = [];
    }
  },

  extraReducers: (builder) => {
    builder

      /* -------- 📊 ALL EMPLOYEES SESSIONS -------- */
      .addCase(fetchAllEmployeesSessions.pending, (state) => {
        state.allSessionsLoading = true;
        state.allSessionsError = null;
      })
      .addCase(fetchAllEmployeesSessions.fulfilled, (state, action) => {
        state.allSessionsLoading = false;
        state.lastUpdated = new Date().toISOString();
        
        // Transform API response to match our UI structure
        const sessions = action.payload.data || action.payload || [];
        state.allSessions = sessions.map(session => ({
          employeeId: session.employeeId || session._id,
          name: session.name || session.employeeName,
          empId: session.empId || session.employeeCode,
          department: session.department || 'General',
          role: session.role || session.position,
          status: session.status?.toUpperCase() || 'OFFLINE',
          workSeconds: session.activeTime || session.workSeconds || 0,
          idleSeconds: session.idleTime || session.idleSeconds || 0,
          punchInTime: session.checkInTime || session.punchInTime,
          currentActivity: session.currentTask || session.activity,
          appName: session.application || session.currentApp,
          lastActive: session.lastActive || 'Just now',
          productivity: session.productivityScore || session.efficiency || 0,
          meetingSeconds: session.meetingTime || 0,
          breakSeconds: session.breakTime || 0,
          email: session.email || '',
          phone: session.phone || session.contact || '',
          location: session.location || 'Office',
          device: session.device || 'Desktop',
          screenshotUrl: session.screenshotUrl,
          isOnline: session.isOnline || false,
          lastUpdated: new Date().toISOString()
        }));
        
        console.log(`✅ [ADMIN] Loaded ${state.allSessions.length} employee sessions`);
      })
      .addCase(fetchAllEmployeesSessions.rejected, (state, action) => {
        state.allSessionsLoading = false;
        state.allSessionsError = action.payload;
      })

      /* -------- 📜 EMPLOYEE SESSION HISTORY -------- */
      .addCase(fetchEmployeeSessionHistory.pending, (state) => {
        state.employeeHistory = [];
      })
      .addCase(fetchEmployeeSessionHistory.fulfilled, (state, action) => {
        state.employeeHistory = action.payload.data || action.payload || [];
        console.log(`✅ [ADMIN] Loaded ${state.employeeHistory.length} history records`);
      })
      .addCase(fetchEmployeeSessionHistory.rejected, (state, action) => {
        console.error("❌ [ADMIN] Failed to load history:", action.payload);
      })

      /* -------- 🎯 EMPLOYEE ACTIVITY -------- */
      .addCase(fetchEmployeeActivity.pending, (state) => {
        state.employeeActivity = [];
      })
      .addCase(fetchEmployeeActivity.fulfilled, (state, action) => {
        state.employeeActivity = action.payload.data || action.payload || [];
        console.log(`✅ [ADMIN] Loaded ${state.employeeActivity.length} activity records`);
      })
      .addCase(fetchEmployeeActivity.rejected, (state, action) => {
        console.error("❌ [ADMIN] Failed to load activity:", action.payload);
      })

      /* -------- 📈 PRODUCTIVITY ANALYTICS -------- */
      .addCase(fetchProductivityAnalytics.pending, (state) => {
        state.analyticsLoading = true;
        state.analyticsError = null;
      })
      .addCase(fetchProductivityAnalytics.fulfilled, (state, action) => {
        state.analyticsLoading = false;
        state.productivityAnalytics = action.payload.data || action.payload || {};
        
        console.log("✅ [ADMIN] Loaded productivity analytics");
      })
      .addCase(fetchProductivityAnalytics.rejected, (state, action) => {
        state.analyticsLoading = false;
        state.analyticsError = action.payload;
      })

      /* -------- ✏️ UPDATE EMPLOYEE SESSION -------- */
      .addCase(updateEmployeeSession.fulfilled, (state, action) => {
        const updatedEmployee = action.payload.data || action.payload;
        const employeeIndex = state.allSessions.findIndex(
          emp => emp.employeeId === updatedEmployee.employeeId
        );
        
        if (employeeIndex !== -1) {
          state.allSessions[employeeIndex] = {
            ...state.allSessions[employeeIndex],
            ...updatedEmployee,
            lastUpdated: new Date().toISOString()
          };
        }
        
        // Add to real-time updates
        state.realTimeUpdates.unshift({
          id: Date.now(),
          type: 'status_change',
          employeeName: updatedEmployee.name,
          message: `status changed to ${updatedEmployee.status}`,
          timestamp: new Date().toISOString()
        });
        
        console.log(`✅ [ADMIN] Updated employee ${updatedEmployee.employeeId}`);
      })
      .addCase(updateEmployeeSession.rejected, (state, action) => {
        console.error("❌ [ADMIN] Update failed:", action.payload);
      });
  },
});

export const {
  resetSelectedEmployee,
  setFilters,
  updateEmployeeStatus,
  addRealTimeUpdate,
  clearRealTimeUpdates
} = adminWorkSessionSlice.actions;

export default adminWorkSessionSlice.reducer;