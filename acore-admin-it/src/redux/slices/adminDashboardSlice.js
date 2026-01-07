import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// ---------- FETCH ALL 4 DASHBOARD APIs ----------
export const fetchAdminDashboard = createAsyncThunk(
  "adminDashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const [
        overallRes,
        deptRes,
        activityRes,
        weeklyRes
      ] = await Promise.all([
        axiosInstance.get("/api/admin/dashboard/overall-status"),
        axiosInstance.get("/api/admin/dashboard/department-distribution"),
        axiosInstance.get("/api/admin/dashboard/activity-status"),
        axiosInstance.get("/api/admin/dashboard/weekly-target-analysis"),
      ]);

      return {
        overall: overallRes.data?.data || {},
        department: deptRes.data?.data || [],
        activity: {
          summary: activityRes.data?.summary || {},
          list: activityRes.data?.detailedList || []
        },
        weekly: weeklyRes.data || {}
      };

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Dashboard loading failed"
      );
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    loading: false,
    error: null,

    overall: null,
    department: [],
    activity: { summary: {}, list: [] },
    weekly: {}
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.overall = payload.overall;
        state.department = payload.department;
        state.activity = payload.activity;
        state.weekly = payload.weekly;
      })
      .addCase(fetchAdminDashboard.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default adminDashboardSlice.reducer;
