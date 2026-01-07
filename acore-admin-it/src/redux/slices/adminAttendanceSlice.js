// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// // 1️⃣ Daily Overview
// export const fetchDailyAttendance = createAsyncThunk(
//   "adminAttendance/fetchDaily",
//   async (date, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/admin/attendance/overview?date=${date}`
//       );
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue("Failed to load daily attendance");
//     }
//   }
// );

// // 2️⃣ Weekly Stats Summary
// export const fetchWeeklyStats = createAsyncThunk(
//   "adminAttendance/fetchWeeklyStats",
//   async ({ startDate, endDate }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/admin/attendance/weekly-stats?startDate=${startDate}&endDate=${endDate}`
//       );
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue("Failed to load weekly stats");
//     }
//   }
// );

// // 3️⃣ Weekly Trend Graph
// export const fetchWeeklyTrends = createAsyncThunk(
//   "adminAttendance/fetchWeeklyTrends",
//   async ({ startDate, endDate }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/admin/attendance/weekly-trends?startDate=${startDate}&endDate=${endDate}`
//       );
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue("Failed to load weekly trends");
//     }
//   }
// );

// // 4️⃣ Monthly Overview
// export const fetchMonthlyOverview = createAsyncThunk(
//   "adminAttendance/fetchMonthly",
//   async ({ month, year }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(
//         `/api/admin/attendance/monthly-overview?month=${month}&year=${year}`
//       );
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue("Failed to load monthly overview");
//     }
//   }
// );

// const adminAttendanceSlice = createSlice({
//   name: "adminAttendance",
//   initialState: {
//     daily: null,
//     weeklyStats: null,
//     weeklyTrends: [],
//     monthly: null,

//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       // DAILY
//       .addCase(fetchDailyAttendance.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDailyAttendance.fulfilled, (state, action) => {
//         state.loading = false;
//         state.daily = action.payload;
//       })
//       .addCase(fetchDailyAttendance.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // WEEKLY STATS
//       .addCase(fetchWeeklyStats.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWeeklyStats.fulfilled, (state, action) => {
//         state.loading = false;
//         state.weeklyStats = action.payload;
//       })
//       .addCase(fetchWeeklyStats.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // WEEKLY TRENDS
//       .addCase(fetchWeeklyTrends.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWeeklyTrends.fulfilled, (state, action) => {
//         state.loading = false;
//         state.weeklyTrends = action.payload;
//       })
//       .addCase(fetchWeeklyTrends.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // MONTHLY
//       .addCase(fetchMonthlyOverview.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMonthlyOverview.fulfilled, (state, action) => {
//         state.loading = false;
//         state.monthly = action.payload;
//       })
//       .addCase(fetchMonthlyOverview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default adminAttendanceSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// 1️⃣ Daily Overview
export const fetchDailyAttendance = createAsyncThunk(
  "adminAttendance/fetchDaily",
  async (date, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/admin/attendance/overview?date=${date}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to load daily attendance");
    }
  }
);

// 2️⃣ Employee Attendance List
export const fetchAttendanceList = createAsyncThunk(
  "adminAttendance/fetchAttendanceList",
  async (date, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/admin/attendance/list?date=${date}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to load attendance list");
    }
  }
);

// 3️⃣ Weekly Stats Summary
export const fetchWeeklyStats = createAsyncThunk(
  "adminAttendance/fetchWeeklyStats",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/admin/attendance/weekly-stats?startDate=${startDate}&endDate=${endDate}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to load weekly stats");
    }
  }
);

// 4️⃣ Weekly Trend Graph
export const fetchWeeklyTrends = createAsyncThunk(
  "adminAttendance/fetchWeeklyTrends",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/admin/attendance/weekly-trends?startDate=${startDate}&endDate=${endDate}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to load weekly trends");
    }
  }
);

// 5️⃣ Monthly Overview
export const fetchMonthlyOverview = createAsyncThunk(
  "adminAttendance/fetchMonthly",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/admin/attendance/monthly-overview?month=${month}&year=${year}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to load monthly overview");
    }
  }
);

const adminAttendanceSlice = createSlice({
  name: "adminAttendance",
  initialState: {
    daily: null,
    attendanceList: [],
    weeklyStats: null,
    weeklyTrends: [],
    monthly: null,
    loading: false,
    listLoading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // DAILY OVERVIEW
      .addCase(fetchDailyAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDailyAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.daily = action.payload;
      })
      .addCase(fetchDailyAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ATTENDANCE LIST
      .addCase(fetchAttendanceList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchAttendanceList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.attendanceList = action.payload;
      })
      .addCase(fetchAttendanceList.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload;
      })

      // WEEKLY STATS
      .addCase(fetchWeeklyStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeeklyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyStats = action.payload;
      })
      .addCase(fetchWeeklyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // WEEKLY TRENDS
      .addCase(fetchWeeklyTrends.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeeklyTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyTrends = action.payload;
      })
      .addCase(fetchWeeklyTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // MONTHLY
      .addCase(fetchMonthlyOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlyOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.monthly = action.payload;
      })
      .addCase(fetchMonthlyOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminAttendanceSlice.reducer;