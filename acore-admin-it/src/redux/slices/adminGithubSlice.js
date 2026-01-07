import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// ================================
// THUNKS
// ================================

// 1. Get Daily Commit Report
export const getDailyCommitReport = createAsyncThunk(
  "adminGithub/getDailyReport",
  async ({ date } = {}, { rejectWithValue }) => {
    try {
      const params = date ? { date } : {};
      const res = await axiosInstance.get("/api/admin/github/commit-report", { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 2. Get Employee Commit History
export const getEmployeeCommitHistory = createAsyncThunk(
  "adminGithub/getEmployeeHistory",
  async ({ employeeId, startDate, endDate }, { rejectWithValue }) => {
    try {
      const params = { employeeId };
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const res = await axiosInstance.get("/api/admin/github/employee-commit-history", { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 3. Get Exception Requests
export const getExceptionRequests = createAsyncThunk(
  "adminGithub/getExceptionRequests",
  async ({ status, date } = {}, { rejectWithValue }) => {
    try {
      const params = {};
      if (status) params.status = status;
      if (date) params.date = date;
      
      const res = await axiosInstance.get("/api/admin/github/exception-requests", { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 4. Approve/Reject Exception
export const updateExceptionStatus = createAsyncThunk(
  "adminGithub/updateExceptionStatus",
  async ({ requestId, action, rejectionReason }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/api/admin/github/exception/${requestId}`,
        { action, rejectionReason }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 5. Get Date Range Report
export const getDateRangeReport = createAsyncThunk(
  "adminGithub/getDateRangeReport",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/admin/github/date-range-report", {
        params: { startDate, endDate }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ================================
// INITIAL STATE
// ================================
const initialState = {
  // Loading states
  loading: {
    dailyReport: false,
    employeeHistory: false,
    exceptionRequests: false,
    updateException: false,
    dateRange: false,
  },
  
  // Data
  dailyReport: null,
  employeeHistory: null,
  exceptionRequests: null,
  dateRangeReport: null,
  
  // Filters
  filters: {
    date: new Date().toISOString().split('T')[0],
    status: 'all', // all, pending, approved, rejected
    employeeId: '',
    startDate: '',
    endDate: '',
  },
  
  // Errors
  errors: {
    dailyReport: null,
    employeeHistory: null,
    exceptionRequests: null,
    updateException: null,
    dateRange: null,
  },
  
  // Pagination
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// ================================
// SLICE
// ================================
const adminGithubSlice = createSlice({
  name: "adminGithub",
  initialState,
  reducers: {
    // Clear errors
    clearErrors: (state) => {
      state.errors = initialState.errors;
    },
    
    // Set filters
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    
    // Set pagination
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    
    // Reset state
    resetAdminGithubState: () => initialState,
    
    // Clear specific data
    clearDailyReport: (state) => {
      state.dailyReport = null;
    },
    
    clearEmployeeHistory: (state) => {
      state.employeeHistory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== DAILY REPORT ==========
      .addCase(getDailyCommitReport.pending, (state) => {
        state.loading.dailyReport = true;
        state.errors.dailyReport = null;
      })
      .addCase(getDailyCommitReport.fulfilled, (state, action) => {
        state.loading.dailyReport = false;
        state.dailyReport = action.payload;
        state.pagination.total = action.payload?.stats?.totalEmployees || 0;
      })
      .addCase(getDailyCommitReport.rejected, (state, action) => {
        state.loading.dailyReport = false;
        state.errors.dailyReport = action.payload;
      })
      
      // ========== EMPLOYEE HISTORY ==========
      .addCase(getEmployeeCommitHistory.pending, (state) => {
        state.loading.employeeHistory = true;
        state.errors.employeeHistory = null;
      })
      .addCase(getEmployeeCommitHistory.fulfilled, (state, action) => {
        state.loading.employeeHistory = false;
        state.employeeHistory = action.payload;
      })
      .addCase(getEmployeeCommitHistory.rejected, (state, action) => {
        state.loading.employeeHistory = false;
        state.errors.employeeHistory = action.payload;
      })
      
      // ========== EXCEPTION REQUESTS ==========
      .addCase(getExceptionRequests.pending, (state) => {
        state.loading.exceptionRequests = true;
        state.errors.exceptionRequests = null;
      })
      .addCase(getExceptionRequests.fulfilled, (state, action) => {
        state.loading.exceptionRequests = false;
        state.exceptionRequests = action.payload;
      })
      .addCase(getExceptionRequests.rejected, (state, action) => {
        state.loading.exceptionRequests = false;
        state.errors.exceptionRequests = action.payload;
      })
      
      // ========== UPDATE EXCEPTION ==========
      .addCase(updateExceptionStatus.pending, (state) => {
        state.loading.updateException = true;
        state.errors.updateException = null;
      })
      .addCase(updateExceptionStatus.fulfilled, (state, action) => {
        state.loading.updateException = false;
        // Update local state if needed
        if (state.exceptionRequests?.data) {
          const index = state.exceptionRequests.data.findIndex(
            req => req.id === action.payload.data.requestId
          );
          if (index !== -1) {
            state.exceptionRequests.data[index].status = action.payload.data.status;
          }
        }
      })
      .addCase(updateExceptionStatus.rejected, (state, action) => {
        state.loading.updateException = false;
        state.errors.updateException = action.payload;
      })
      
      // ========== DATE RANGE REPORT ==========
      .addCase(getDateRangeReport.pending, (state) => {
        state.loading.dateRange = true;
        state.errors.dateRange = null;
      })
      .addCase(getDateRangeReport.fulfilled, (state, action) => {
        state.loading.dateRange = false;
        state.dateRangeReport = action.payload;
      })
      .addCase(getDateRangeReport.rejected, (state, action) => {
        state.loading.dateRange = false;
        state.errors.dateRange = action.payload;
      });
  },
});

export const {
  clearErrors,
  setFilter,
  setPagination,
  resetAdminGithubState,
  clearDailyReport,
  clearEmployeeHistory,
} = adminGithubSlice.actions;

export default adminGithubSlice.reducer;