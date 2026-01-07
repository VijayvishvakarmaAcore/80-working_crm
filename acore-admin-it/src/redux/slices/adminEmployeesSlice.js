// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// const API_BASE = "http://localhost:5000/api/admin";


// // ================= EMPLOYEES LIST =================
// export const fetchEmployees = createAsyncThunk(
//   "admin/employees",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(`${API_BASE}/employees`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed to load employees");
//     }
//   }
// );


// // ================= ACTIVITY STATUS =================
// export const fetchActivityStatus = createAsyncThunk(
//   "admin/activityStatus",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(
//         `${API_BASE}/dashboard/activity-status`
//       );
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed to load activity");
//     }
//   }
// );



// const adminEmployeesSlice = createSlice({
//   name: "adminEmployees",
//   initialState: {
//     employees: [],
//     activitySummary: null,
//     activityList: [],
//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       // ***** EMPLOYEES *****
//       .addCase(fetchEmployees.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employees = action.payload?.data || [];
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ***** ACTIVITY STATUS *****
//       .addCase(fetchActivityStatus.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchActivityStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         state.activitySummary = action.payload?.summary || null;
//         state.activityList = action.payload?.detailedList || [];
//       })
//       .addCase(fetchActivityStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default adminEmployeesSlice.reducer;




// // adminEmployeesSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// const API_BASE = "http://localhost:5000/api/admin";

// // ================= EMPLOYEES LIST =================
// export const fetchEmployees = createAsyncThunk(
//   "admin/fetchEmployees",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(`${API_BASE}/employees`);
//       // Handle both { data: [...] } and direct [...] responses
//       return Array.isArray(res.data) ? res.data : res.data?.data || [];
//     } catch (err) {
//       const message =
//         err.response?.data?.message ||
//         err.response?.data?.error ||
//         err.message ||
//         "Failed to load employees";
//       return rejectWithValue(message);
//     }
//   }
// );

// // ================= ACTIVITY STATUS =================
// export const fetchActivityStatus = createAsyncThunk(
//   "admin/fetchActivityStatus",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(`${API_BASE}/dashboard/activity-status`);
//       return res.data;
//     } catch (err) {
//       const message =
//         err.response?.data?.message ||
//         err.response?.data?.error ||
//         err.message ||
//         "Failed to load activity data";
//       return rejectWithValue(message);
//     }
//   }
// );

// const adminEmployeesSlice = createSlice({
//   name: "adminEmployees",
//   initialState: {
//     // Employees
//     employees: [],
//     employeesLoading: false,
//     employeesError: null,

//     // Activity
//     activitySummary: null,
//     activityList: [],
//     activityLoading: false,
//     activityError: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ===== EMPLOYEES =====
//       .addCase(fetchEmployees.pending, (state) => {
//         state.employeesLoading = true;
//         state.employeesError = null;
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.employeesLoading = false;
//         state.employees = action.payload || [];
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.employeesLoading = false;
//         state.employeesError = action.payload; // always string now
//       })

//       // ===== ACTIVITY STATUS =====
//       .addCase(fetchActivityStatus.pending, (state) => {
//         state.activityLoading = true;
//         state.activityError = null;
//       })
//       .addCase(fetchActivityStatus.fulfilled, (state, action) => {
//         state.activityLoading = false;
//         state.activitySummary = action.payload?.summary || null;
//         state.activityList = action.payload?.detailedList || [];
//       })
//       .addCase(fetchActivityStatus.rejected, (state, action) => {
//         state.activityLoading = false;
//         state.activityError = action.payload; // always string
//       });
//   },
// });

// export default adminEmployeesSlice.reducer;



// adminEmployeesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

const API_BASE = "http://localhost:5000/api/admin";

// ================= EMPLOYEES LIST =================
export const fetchEmployees = createAsyncThunk(
  "admin/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${API_BASE}/employees`);
      // Handle both { data: [...] } and direct [...] responses
      return Array.isArray(res.data) ? res.data : res.data?.data || [];
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to load employees";
      return rejectWithValue(message);
    }
  }
);

// ================= ACTIVITY STATUS =================
export const fetchActivityStatus = createAsyncThunk(
  "admin/fetchActivityStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${API_BASE}/dashboard/activity-status`);
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to load activity data";
      return rejectWithValue(message);
    }
  }
);

const adminEmployeesSlice = createSlice({
  name: "adminEmployees",
  initialState: {
    // Employees
    employees: [],
    employeesLoading: false,
    employeesError: null,

    // Activity
    activitySummary: null,
    activityList: [],
    activityLoading: false,
    activityError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== EMPLOYEES =====
      .addCase(fetchEmployees.pending, (state) => {
        state.employeesLoading = true;
        state.employeesError = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employeesLoading = false;
        state.employees = action.payload || [];
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.employeesLoading = false;
        state.employeesError = action.payload; // always string now
      })

      // ===== ACTIVITY STATUS =====
      .addCase(fetchActivityStatus.pending, (state) => {
        state.activityLoading = true;
        state.activityError = null;
      })
      .addCase(fetchActivityStatus.fulfilled, (state, action) => {
        state.activityLoading = false;
        state.activitySummary = action.payload?.summary || null;
        state.activityList = action.payload?.detailedList || [];
      })
      .addCase(fetchActivityStatus.rejected, (state, action) => {
        state.activityLoading = false;
        state.activityError = action.payload; // always string
      });
  },
});

export default adminEmployeesSlice.reducer;