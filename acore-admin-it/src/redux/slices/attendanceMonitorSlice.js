// acore-admin-it/src/redux/slices/attendanceMonitorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAttendanceService } from '../../services/adminAttendanceService';

// Async thunks
export const fetchLiveAttendance = createAsyncThunk(
  'attendanceMonitor/fetchLive',
  async (_, { rejectWithValue }) => {
    try {
      return await adminAttendanceService.getLiveAttendance();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTodaySummary = createAsyncThunk(
  'attendanceMonitor/fetchTodaySummary',
  async (_, { rejectWithValue }) => {
    try {
      return await adminAttendanceService.getTodaySummary();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCompletedSessions = createAsyncThunk(
  'attendanceMonitor/fetchCompleted',
  async (limit, { rejectWithValue }) => {
    try {
      return await adminAttendanceService.getCompletedSessions(limit);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const attendanceMonitorSlice = createSlice({
  name: 'attendanceMonitor',
  initialState: {
    liveData: [],
    completedData: [],
    summary: {
      present: 0,
      absent: 0,
      leave: 0,
      halfDay: 0,
      late: 0
    },
    loading: {
      live: false,
      summary: false,
      completed: false
    },
    error: {
      live: null,
      summary: null,
      completed: null
    },
    autoRefresh: true,
    lastUpdated: null
  },
  
  reducers: {
    toggleAutoRefresh: (state) => {
      state.autoRefresh = !state.autoRefresh;
    },
    clearErrors: (state) => {
      state.error = {
        live: null,
        summary: null,
        completed: null
      };
    },
    setLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    }
  },
  
  extraReducers: (builder) => {
    // Live Attendance
    builder
      .addCase(fetchLiveAttendance.pending, (state) => {
        state.loading.live = true;
        state.error.live = null;
      })
      .addCase(fetchLiveAttendance.fulfilled, (state, action) => {
        state.loading.live = false;
        state.liveData = action.payload.data || [];
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchLiveAttendance.rejected, (state, action) => {
        state.loading.live = false;
        state.error.live = action.payload;
      })
    
    // Today Summary
    builder
      .addCase(fetchTodaySummary.pending, (state) => {
        state.loading.summary = true;
        state.error.summary = null;
      })
      .addCase(fetchTodaySummary.fulfilled, (state, action) => {
        state.loading.summary = false;
        state.summary = action.payload.data || {};
      })
      .addCase(fetchTodaySummary.rejected, (state, action) => {
        state.loading.summary = false;
        state.error.summary = action.payload;
      })
    
    // Completed Sessions
    builder
      .addCase(fetchCompletedSessions.pending, (state) => {
        state.loading.completed = true;
        state.error.completed = null;
      })
      .addCase(fetchCompletedSessions.fulfilled, (state, action) => {
        state.loading.completed = false;
        state.completedData = action.payload.data || [];
      })
      .addCase(fetchCompletedSessions.rejected, (state, action) => {
        state.loading.completed = false;
        state.error.completed = action.payload;
      });
  }
});

export const {
  toggleAutoRefresh,
  clearErrors,
  setLastUpdated
} = attendanceMonitorSlice.actions;

export default attendanceMonitorSlice.reducer;