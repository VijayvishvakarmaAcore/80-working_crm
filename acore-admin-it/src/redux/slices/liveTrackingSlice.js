// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../services/axiosInstance";

// /* =====================================================
//    🔹 API – INITIAL LOAD (PAGE REFRESH CASE)
// ===================================================== */

// export const fetchLiveSessions = createAsyncThunk(
//   "liveTracking/fetchLiveSessions",
//   async (_, { rejectWithValue }) => {
//     try {
//       // 👉 API jo aaj ke WORKING sessions return kare
//       const res = await axios.get("/api/admin/live-sessions");
//       return res.data; // expected: array
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch live sessions"
//       );
//     }
//   }
// );

// /* =====================================================
//    🔹 SLICE
// ===================================================== */

// const liveTrackingSlice = createSlice({
//   name: "liveTracking",

//   initialState: {
//     employees: {}, // 🔑 employeeId → employee live data
//     loading: false,
//     error: null,
//   },

//   reducers: {
//     /* =================================================
//        🔥 SOCKET EVENT HANDLER
//     ================================================= */

//     liveUpdate: (state, action) => {
//       const data = action.payload;
//       const { employeeId, type } = data;

//       if (!employeeId) return;

//       // 🔴 Punch Out → remove from grid
//       if (type === "PUNCH_OUT") {
//         delete state.employees[employeeId];
//         return;
//       }

//       // 🟢 Punch In / 🔁 Update
//       state.employees[employeeId] = {
//         ...state.employees[employeeId], // keep old values
//         ...data,                        // override with latest
//       };
//     },

//     /* =================================================
//        🔄 CLEAR ALL (logout / admin switch)
//     ================================================= */
//     resetLiveTracking: (state) => {
//       state.employees = {};
//       state.loading = false;
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       /* ---------- 🔄 INITIAL LOAD ---------- */
//       .addCase(fetchLiveSessions.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchLiveSessions.fulfilled, (state, action) => {
//         state.loading = false;

//         /*
//           Expected API response format:
//           [
//             {
//               employeeId: {
//                 _id,
//                 name,
//                 employeeId,
//                 department
//               },
//               workSeconds,
//               idleSeconds,
//               startAt,
//               status
//             }
//           ]
//         */

//         action.payload.forEach((session) => {
//           const user = session.employeeId;

//           state.employees[user._id] = {
//             employeeId: user._id,
//             name: user.name,
//             empCode: user.employeeId,
//             department: user.department,
//             status: session.status || "WORKING",
//             workSeconds: session.workSeconds || 0,
//             idleSeconds: session.idleSeconds || 0,
//             startAt: session.startAt,
//           };
//         });
//       })

//       .addCase(fetchLiveSessions.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// /* =====================================================
//    🔹 EXPORTS
// ===================================================== */

// export const {
//   liveUpdate,
//   resetLiveTracking,
// } = liveTrackingSlice.actions;

// export default liveTrackingSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// /* =========================
//    INITIAL LOAD (PAGE REFRESH)
// ========================= */
// export const fetchLiveEmployees = createAsyncThunk(
//   "adminLiveTracking/fetchLiveEmployees",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/api/admin/live-tracking/today");
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch live employees"
//       );
//     }
//   }
// );

// const adminLiveTrackingSlice = createSlice({
//   name: "adminLiveTracking",

//   initialState: {
//     employees: {}, // 🔑 employeeId → data
//     loading: false,
//     error: null,
//   },

//   reducers: {
//     /* =========================
//        SOCKET EVENT HANDLER
//     ========================= */
//     liveTrackingUpdate: (state, action) => {
//       const { type, employeeId, ...data } = action.payload;

//       if (!employeeId) return;

//       // 🔴 Punch Out
//       if (type === "PUNCH_OUT") {
//         delete state.employees[employeeId];
//         return;
//       }

//       // 🟢 Punch In / 🔁 Update
//       state.employees[employeeId] = {
//         ...state.employees[employeeId],
//         ...data,
//         employeeId,
//       };
//     },

//     resetLiveTracking: (state) => {
//       state.employees = {};
//       state.loading = false;
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLiveEmployees.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(fetchLiveEmployees.fulfilled, (state, action) => {
//         state.loading = false;

//         action.payload.forEach((emp) => {
//           state.employees[emp.employeeId] = {
//             employeeId: emp.employeeId,
//             name: emp.name,
//             empCode: emp.empCode,
//             department: emp.department,
//             status: emp.status || "WORKING",
//             workSeconds: emp.workSeconds || 0,
//             idleSeconds: emp.idleSeconds || 0,
//             startAt: emp.startAt,
//             lastActiveAt: emp.lastActiveAt,
//           };
//         });
//       })

//       .addCase(fetchLiveEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { liveTrackingUpdate, resetLiveTracking } =
//   adminLiveTrackingSlice.actions;

// export default adminLiveTrackingSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// /* =========================
//    FETCH LIVE EMPLOYEES
// ========================= */
// export const fetchLiveEmployees = createAsyncThunk(
//   "adminLiveTracking/fetchLiveEmployees",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/api/admin/live-tracking/today");
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch live employees"
//       );
//     }
//   }
// );

// const adminLiveTrackingSlice = createSlice({
//   name: "adminLiveTracking",
//   initialState: {
//     employees: [], // ✅ CHANGED TO ARRAY
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     /* =========================
//        SOCKET EVENT HANDLER
//     ========================= */
//     liveTrackingUpdate: (state, action) => {
//       const { type, employeeId, ...data } = action.payload;
      
//       if (!employeeId) return;

//       const existingIndex = state.employees.findIndex(
//         emp => emp.employeeId === employeeId || emp.id === employeeId
//       );

//       // 🔴 PUNCH OUT - Remove employee
//       if (type === "PUNCH_OUT") {
//         if (existingIndex !== -1) {
//           state.employees.splice(existingIndex, 1);
//         }
//         return;
//       }

//       // 🟢 PUNCH IN or 🔁 UPDATE
//       const updatedEmployee = {
//         id: employeeId,
//         employeeId: employeeId,
//         name: data.name || state.employees[existingIndex]?.name || "Unknown",
//         empId: data.empCode || data.employeeId || "N/A",
//         department: data.department || state.employees[existingIndex]?.department || "Unknown",
//         status: data.status || "WORKING",
//         workSeconds: data.workSeconds || 0,
//         idleSeconds: data.idleSeconds || 0,
//         startAt: data.startAt || state.employees[existingIndex]?.startAt,
//         lastActiveAt: data.lastActiveAt || new Date().toISOString(),
//       };

//       if (existingIndex !== -1) {
//         // Update existing employee
//         state.employees[existingIndex] = {
//           ...state.employees[existingIndex],
//           ...updatedEmployee
//         };
//       } else {
//         // Add new employee
//         state.employees.push(updatedEmployee);
//       }
//     },

//     resetLiveTracking: (state) => {
//       state.employees = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLiveEmployees.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLiveEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         // ✅ Transform backend data to array format
//         state.employees = action.payload.map(emp => ({
//           id: emp.employeeId,
//           employeeId: emp.employeeId,
//           name: emp.name || "Unknown",
//           empId: emp.empCode || emp.employeeId || "N/A",
//           department: emp.department || "Unknown",
//           status: emp.status || "WORKING",
//           workSeconds: emp.workSeconds || 0,
//           idleSeconds: emp.idleSeconds || 0,
//           startAt: emp.startAt,
//           lastActiveAt: emp.lastActiveAt || new Date().toISOString(),
//         }));
//       })
//       .addCase(fetchLiveEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { liveTrackingUpdate, resetLiveTracking } =
//   adminLiveTrackingSlice.actions;

// export default adminLiveTrackingSlice.reducer;



//  adding empl id 



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

/* =========================
   FETCH LIVE EMPLOYEES
========================= */
export const fetchLiveEmployees = createAsyncThunk(
  "adminLiveTracking/fetchLiveEmployees",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔄 Fetching live employees from API...");
      
      // ✅ Try multiple possible endpoints
      let res;
      let endpointUsed = "";
      
      try {
        // First try: New admin endpoint
        endpointUsed = "/api/work-session/admin/today";
        res = await axiosInstance.get(endpointUsed);
        console.log(`✅ Success with endpoint: ${endpointUsed}`, res.data.length);
      } catch (err1) {
        console.log(`❌ First endpoint failed (${endpointUsed}):`, err1.message);
        
        try {
          // Second try: Original endpoint
          endpointUsed = "/api/admin/live-tracking/today";
          res = await axiosInstance.get(endpointUsed);
          console.log(`✅ Success with endpoint: ${endpointUsed}`, res.data.length);
        } catch (err2) {
          console.log(`❌ Second endpoint failed (${endpointUsed}):`, err2.message);
          
          // Return empty array if both endpoints fail
          console.log("⚠️ Both endpoints failed, returning empty array");
          return [];
        }
      }
      
      // Ensure response data is an array
      if (!Array.isArray(res.data)) {
        console.warn("⚠️ API response is not an array:", res.data);
        return [];
      }
      
      console.log(`✅ Received ${res.data.length} live employees`);
      return res.data;
      
    } catch (err) {
      console.error("❌ fetchLiveEmployees error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        url: err.config?.url
      });
      
      return rejectWithValue(
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        "Failed to fetch live employees"
      );
    }
  }
);

const adminLiveTrackingSlice = createSlice({
  name: "adminLiveTracking",
  initialState: {
    employees: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    /* =========================
       SOCKET EVENT HANDLER
    ========================= */
    liveTrackingUpdate: (state, action) => {
      const { type, employeeId, ...data } = action.payload;
      
      if (!employeeId) {
        console.warn("⚠️ liveTrackingUpdate: No employeeId in payload", action.payload);
        return;
      }

      const existingIndex = state.employees.findIndex(
        emp => emp.employeeId === employeeId || emp.id === employeeId
      );

      console.log(`📡 Socket update received:`, {
        type,
        employeeId,
        existingIndex,
        dataLength: state.employees.length
      });

      // 🔴 PUNCH OUT - Remove employee
      if (type === "PUNCH_OUT") {
        if (existingIndex !== -1) {
          console.log(`🔴 Removing employee ${employeeId} from list`);
          state.employees.splice(existingIndex, 1);
        } else {
          console.log(`ℹ️ Employee ${employeeId} not found for punch out`);
        }
        return;
      }

      // 🟢 PUNCH IN or 🔁 UPDATE
      const updatedEmployee = {
        id: employeeId,
        employeeId: employeeId,
        name: data.name || state.employees[existingIndex]?.name || "Unknown",
        empId: data.empCode || data.employeeId || employeeId || "N/A",
        department: data.department || state.employees[existingIndex]?.department || "Unknown",
        status: data.status || "WORKING",
        workSeconds: data.workSeconds || state.employees[existingIndex]?.workSeconds || 0,
        idleSeconds: data.idleSeconds || state.employees[existingIndex]?.idleSeconds || 0,
        startAt: data.startAt || state.employees[existingIndex]?.startAt,
        lastActiveAt: data.lastActiveAt || new Date().toISOString(),
        // Additional fields that might come from socket
        email: data.email || state.employees[existingIndex]?.email || '',
        phone: data.phone || state.employees[existingIndex]?.phone || '',
        role: data.role || state.employees[existingIndex]?.role || 'Employee',
      };

      if (existingIndex !== -1) {
        // Update existing employee
        console.log(`🔄 Updating existing employee ${employeeId} at index ${existingIndex}`);
        state.employees[existingIndex] = {
          ...state.employees[existingIndex],
          ...updatedEmployee
        };
      } else {
        // Add new employee
        console.log(`🟢 Adding new employee ${employeeId} to list`);
        state.employees.push(updatedEmployee);
      }
      
      // Update timestamp
      state.lastUpdated = new Date().toISOString();
    },

    resetLiveTracking: (state) => {
      console.log("🔄 Resetting live tracking state");
      state.employees = [];
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
    },
    
    // New reducer for manual updates
    updateEmployee: (state, action) => {
      const { employeeId, updates } = action.payload;
      const index = state.employees.findIndex(emp => 
        emp.employeeId === employeeId || emp.id === employeeId
      );
      
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updates
        };
        state.lastUpdated = new Date().toISOString();
      }
    },
    
    // Add employee manually (for testing)
    addTestEmployee: (state) => {
      const testEmployee = {
        id: "test-" + Date.now(),
        employeeId: "test-" + Date.now(),
        name: "Test User",
        empId: "TEST001",
        department: "Testing",
        status: "WORKING",
        workSeconds: 7200,
        idleSeconds: 900,
        startAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        email: "test@example.com",
        phone: "1234567890",
        role: "Tester"
      };
      
      state.employees.push(testEmployee);
      console.log("🧪 Test employee added:", testEmployee);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveEmployees.pending, (state) => {
        console.log("⏳ fetchLiveEmployees pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveEmployees.fulfilled, (state, action) => {
        console.log("✅ fetchLiveEmployees fulfilled:", action.payload.length);
        state.loading = false;
        state.error = null;
        state.lastUpdated = new Date().toISOString();
        
        // ✅ Transform backend data to array format
        if (Array.isArray(action.payload)) {
          state.employees = action.payload.map(emp => ({
            id: emp.employeeId || emp._id || emp.id,
            employeeId: emp.employeeId || emp._id || emp.id,
            name: emp.name || "Unknown Employee",
            empId: emp.empCode || emp.employeeId || emp.empId || "N/A",
            department: emp.department || "Unknown",
            status: emp.status || "WORKING",
            workSeconds: emp.workSeconds || 0,
            idleSeconds: emp.idleSeconds || 0,
            startAt: emp.startAt,
            lastActiveAt: emp.lastActiveAt || new Date().toISOString(),
            // Include additional fields if available
            email: emp.email || '',
            phone: emp.phone || '',
            role: emp.role || 'Employee',
            totalSeconds: emp.totalSeconds || ((emp.workSeconds || 0) + (emp.idleSeconds || 0))
          }));
          
          console.log(`✅ Transformed ${state.employees.length} employees`);
        } else {
          console.warn("⚠️ Action payload is not an array:", action.payload);
          state.employees = [];
        }
      })
      .addCase(fetchLiveEmployees.rejected, (state, action) => {
        console.error("❌ fetchLiveEmployees rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
        
        // Add a test employee if API fails (for development)
        if (process.env.NODE_ENV === 'development') {
          console.log("🧪 Adding test data for development");
          state.employees = [{
            id: "dev-test-1",
            employeeId: "dev-test-1",
            name: "Development User",
            empId: "DEV001",
            department: "Development",
            status: "WORKING",
            workSeconds: 14400,
            idleSeconds: 1800,
            startAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
            email: "dev@example.com",
            phone: "9876543210",
            role: "Developer"
          }];
          state.error = null; // Clear error for development
        }
      });
  },
});

export const { 
  liveTrackingUpdate, 
  resetLiveTracking, 
  updateEmployee,
  addTestEmployee 
} = adminLiveTrackingSlice.actions;

export default adminLiveTrackingSlice.reducer;