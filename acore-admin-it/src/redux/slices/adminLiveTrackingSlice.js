import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

/* ===============================
   API CALL – INITIAL LOAD
================================ */
export const fetchAdminLiveTracking = createAsyncThunk(
  "adminLiveTracking/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/admin/live-tracking");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "API Error");
    }
  }
);

/* ===============================
   SLICE
================================ */
const adminLiveTrackingSlice = createSlice({
  name: "adminLiveTracking",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },

  reducers: {
    // 🔹 SOCKET: punch-in
    addEmployeeLive: (state, action) => {
      state.employees.push(action.payload);
    },

    // 🔹 SOCKET: active / idle / completed
    updateEmployeeLive: (state, action) => {
      const index = state.employees.findIndex(
        (e) => e.employeeId === action.payload.employeeId
      );

      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...action.payload,
        };
      }
    },

    // 🔹 RESET (optional)
    resetLiveTracking: (state) => {
      state.employees = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminLiveTracking.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminLiveTracking.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchAdminLiveTracking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addEmployeeLive,
  updateEmployeeLive,
  resetLiveTracking,
} = adminLiveTrackingSlice.actions;

export default adminLiveTrackingSlice.reducer;
