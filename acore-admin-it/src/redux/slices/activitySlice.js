// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async Thunks
// export const fetchRealtimeActivities = createAsyncThunk(
//   'activity/fetchRealtimeActivities',
//   async ({ department = 'all', limit = 50 }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`/api/activity/realtime-activities?department=${department}&limit=${limit}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const fetchDailySummaries = createAsyncThunk(
//   'activity/fetchDailySummaries',
//   async ({ date = null, page = 1, limit = 20 }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       let url = `/api/activity/daily-summaries?page=${page}&limit=${limit}`;
//       if (date) url += `&date=${date}`;
      
//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const fetchEmployeeTimeline = createAsyncThunk(
//   'activity/fetchEmployeeTimeline',
//   async ({ employeeId, date }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       let url = `/api/activity/employee-timeline/${employeeId}`;
//       if (date) url += `?date=${date}`;
      
//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const fetchAppUsage = createAsyncThunk(
//   'activity/fetchAppUsage',
//   async ({ startDate, endDate, department = 'all' }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       let url = `/api/activity/app-usage?department=${department}`;
//       if (startDate && endDate) {
//         url += `&startDate=${startDate}&endDate=${endDate}`;
//       }
      
//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Slice
// const activitySlice = createSlice({
//   name: 'activity',
//   initialState: {
//     realtimeActivities: [],
//     dailySummaries: [],
//     employeeTimeline: [],
//     appUsage: [],
//     loading: false,
//     error: null,
//     pagination: {
//       page: 1,
//       limit: 20,
//       total: 0,
//       totalPages: 0
//     }
//   },
//   reducers: {
//     clearActivities: (state) => {
//       state.realtimeActivities = [];
//     },
//     updateActivityStatus: (state, action) => {
//       const { employeeId, status, currentApp } = action.payload;
//       const activity = state.realtimeActivities.find(a => a.employeeId === employeeId);
//       if (activity) {
//         activity.status = status;
//         if (currentApp) activity.lastApp = currentApp;
//         activity.lastTimestamp = new Date().toISOString();
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Realtime Activities
//       .addCase(fetchRealtimeActivities.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRealtimeActivities.fulfilled, (state, action) => {
//         state.loading = false;
//         state.realtimeActivities = action.payload.activities || [];
//       })
//       .addCase(fetchRealtimeActivities.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Fetch Daily Summaries
//       .addCase(fetchDailySummaries.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDailySummaries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.dailySummaries = action.payload.summaries || [];
//         state.pagination = action.payload.pagination || state.pagination;
//       })
//       .addCase(fetchDailySummaries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Fetch Employee Timeline
//       .addCase(fetchEmployeeTimeline.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployeeTimeline.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employeeTimeline = action.payload.activities || [];
//       })
//       .addCase(fetchEmployeeTimeline.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Fetch App Usage
//       .addCase(fetchAppUsage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAppUsage.fulfilled, (state, action) => {
//         state.loading = false;
//         state.appUsage = action.payload.appUsage || [];
//       })
//       .addCase(fetchAppUsage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { clearActivities, updateActivityStatus } = activitySlice.actions;
// export default activitySlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Async Thunks
export const fetchRealtimeActivities = createAsyncThunk(
  'activity/fetchRealtimeActivities',
  async ({ department = 'all', limit = 50 } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/activity/realtime-activities?department=${department}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllEmployeesStatus = createAsyncThunk(
  'activity/fetchAllEmployeesStatus',
  async ({ department = 'all' } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/activity/all-employees-status?department=${department}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDailySummaries = createAsyncThunk(
  'activity/fetchDailySummaries',
  async ({ date = null, page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      let url = `${API_BASE_URL}/activity/daily-summaries?page=${page}&limit=${limit}`;
      if (date) url += `&date=${date}`;
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchEmployeeTimeline = createAsyncThunk(
  'activity/fetchEmployeeTimeline',
  async ({ employeeId, date, limit = 100 } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      let url = `${API_BASE_URL}/activity/employee-timeline/${employeeId}?limit=${limit}`;
      if (date) url += `&date=${date}`;
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAppUsage = createAsyncThunk(
  'activity/fetchAppUsage',
  async ({ startDate, endDate, department = 'all', limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      let url = `${API_BASE_URL}/activity/app-usage?department=${department}&limit=${limit}`;
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const startEmployeeTracking = createAsyncThunk(
  'activity/startEmployeeTracking',
  async (employeeId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/activity/start-tracking`,
        { employeeId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const stopEmployeeTracking = createAsyncThunk(
  'activity/stopEmployeeTracking',
  async ({ employeeId, sessionId } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/activity/stop-tracking`,
        { employeeId, sessionId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProductivityReport = createAsyncThunk(
  'activity/fetchProductivityReport',
  async ({ employeeId, days = 30 } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/activity/productivity-report/${employeeId}?days=${days}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial State
const initialState = {
  realtimeActivities: [],
  allEmployees: [],
  dailySummaries: [],
  employeeTimeline: [],
  appUsage: [],
  productivityReport: null,
  loading: false,
  error: null,
  statistics: {
    totalEmployees: 0,
    activeEmployees: 0,
    idleEmployees: 0,
    trackingEmployees: 0,
    offlineEmployees: 0
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },
  socketConnected: false,
  lastUpdate: null
};

// Slice
const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    clearActivities: (state) => {
      state.realtimeActivities = [];
      state.allEmployees = [];
    },
    
    updateActivityStatus: (state, action) => {
      const { employeeId, status, currentApp } = action.payload;
      
      // Update in realtimeActivities
      const activityIndex = state.realtimeActivities.findIndex(a => a.employeeId === employeeId);
      if (activityIndex >= 0) {
        state.realtimeActivities[activityIndex].status = status;
        if (currentApp) state.realtimeActivities[activityIndex].currentApp = currentApp;
        state.realtimeActivities[activityIndex].lastActivityTime = new Date().toISOString();
      }
      
      // Update in allEmployees
      const employeeIndex = state.allEmployees.findIndex(e => e.employeeId === employeeId);
      if (employeeIndex >= 0) {
        state.allEmployees[employeeIndex].status = status;
        if (currentApp) state.allEmployees[employeeIndex].currentApp = currentApp;
        state.allEmployees[employeeIndex].lastActivityTime = new Date().toISOString();
      }
    },
    
    updateEmployeeTracking: (state, action) => {
      const { employeeId, isTracking } = action.payload;
      
      const employeeIndex = state.allEmployees.findIndex(e => e.employeeId === employeeId);
      if (employeeIndex >= 0) {
        state.allEmployees[employeeIndex].isTracking = isTracking;
      }
    },
    
    setSocketConnected: (state, action) => {
      state.socketConnected = action.payload;
    },
    
    addRealtimeActivity: (state, action) => {
      const activity = action.payload;
      const existingIndex = state.realtimeActivities.findIndex(a => a.employeeId === activity.employeeId);
      
      if (existingIndex >= 0) {
        state.realtimeActivities[existingIndex] = {
          ...state.realtimeActivities[existingIndex],
          ...activity,
          lastActivityTime: activity.timestamp || new Date().toISOString()
        };
      } else {
        state.realtimeActivities.push({
          ...activity,
          lastActivityTime: activity.timestamp || new Date().toISOString()
        });
      }
      
      // Update statistics
      state.statistics.activeEmployees = state.realtimeActivities.filter(a => a.status === 'active').length;
      state.statistics.idleEmployees = state.realtimeActivities.filter(a => a.status === 'idle').length;
      state.statistics.trackingEmployees = state.realtimeActivities.filter(a => a.isTracking).length;
    },
    
    resetActivityState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Fetch Realtime Activities
      .addCase(fetchRealtimeActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRealtimeActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.realtimeActivities = action.payload.activities || [];
        state.statistics = {
          totalEmployees: action.payload.total || 0,
          activeEmployees: action.payload.activeCount || 0,
          idleEmployees: action.payload.idleCount || 0,
          trackingEmployees: state.realtimeActivities.filter(a => a.isTracking).length,
          offlineEmployees: action.payload.offlineCount || 0
        };
        state.lastUpdate = new Date().toISOString();
      })
      .addCase(fetchRealtimeActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch All Employees Status
      .addCase(fetchAllEmployeesStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployeesStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmployees = action.payload.employees || [];
        state.statistics = action.payload.statistics || state.statistics;
        state.lastUpdate = new Date().toISOString();
      })
      .addCase(fetchAllEmployeesStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Daily Summaries
      .addCase(fetchDailySummaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailySummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.dailySummaries = action.payload.summaries || [];
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchDailySummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Employee Timeline
      .addCase(fetchEmployeeTimeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeTimeline = action.payload.activities || [];
      })
      .addCase(fetchEmployeeTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch App Usage
      .addCase(fetchAppUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.appUsage = action.payload.appUsage || [];
      })
      .addCase(fetchAppUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Productivity Report
      .addCase(fetchProductivityReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductivityReport.fulfilled, (state, action) => {
        state.loading = false;
        state.productivityReport = action.payload.report || null;
      })
      .addCase(fetchProductivityReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Start/Stop Tracking
      .addCase(startEmployeeTracking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startEmployeeTracking.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(startEmployeeTracking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(stopEmployeeTracking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(stopEmployeeTracking.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(stopEmployeeTracking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearActivities,
  updateActivityStatus,
  updateEmployeeTracking,
  setSocketConnected,
  addRealtimeActivity,
  resetActivityState
} = activitySlice.actions;

export default activitySlice.reducer;