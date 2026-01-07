import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

/* =========================
   THUNK: FETCH PERFORMANCE
========================= */

export const fetchEmployeePerformance = createAsyncThunk(
  "employeePerformance/fetch",
  async ({ employeeId, range }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/admin/employee-performance`,
        {
          params: { employeeId, range }
        }
      );

      if (res.data.success) {
        return res.data;
      }

      return rejectWithValue(res.data.message || "Failed to fetch performance");
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

/* =========================
   SLICE
========================= */

const employeePerformanceSlice = createSlice({
  name: "employeePerformance",

  initialState: {
    loading: false,
    error: null,

    employee: null,     // { id, name, email }
    range: "day",       // selected range
    performance: null,  // actual performance data
  },

  reducers: {
    clearPerformance: (state) => {
      state.loading = false;
      state.error = null;
      state.employee = null;
      state.performance = null;
      state.range = "day";
    },

    setRange: (state, action) => {
      state.range = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= FETCH =================
      .addCase(fetchEmployeePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEmployeePerformance.fulfilled, (state, action) => {
        state.loading = false;

        state.employee = action.payload.employee;
        state.range = action.payload.range;
        state.performance = action.payload.data;
      })

      .addCase(fetchEmployeePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load performance";
      });
  },
});

export const {
  clearPerformance,
  setRange,
} = employeePerformanceSlice.actions;

export default employeePerformanceSlice.reducer;
