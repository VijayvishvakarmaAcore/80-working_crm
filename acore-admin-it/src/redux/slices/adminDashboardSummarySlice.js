import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

/* =========================
   FETCH DASHBOARD SUMMARY
========================= */
export const fetchDashboardSummary = createAsyncThunk(
  "adminDashboardSummary/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        "/api/admin/dashboard-summary"
      );

      if (res.data?.success) {
        return res.data.data;
      }

      return rejectWithValue("Failed to load summary");
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

const adminDashboardSummarySlice = createSlice({
  name: "adminDashboardSummary",

  initialState: {
    loading: false,
    error: null,
    summary: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })

      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminDashboardSummarySlice.reducer;
