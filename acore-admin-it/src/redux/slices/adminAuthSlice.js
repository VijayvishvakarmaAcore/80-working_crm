// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// // ================= LOGIN =================
// export const adminLogin = createAsyncThunk(
//   "adminAuth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/api/users/login", {
//         email,
//         password
//       });

//       if (!res.data?.data?.token) {
//         return rejectWithValue("Token not received from server");
//       }

//       localStorage.setItem("admin_token", res.data.data.token);

//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Admin Login Failed"
//       );
//     }
//   }
// );

// const adminAuthSlice = createSlice({
//   name: "adminAuth",

//   initialState: {
//     adminUser: null,
//     token: localStorage.getItem("admin_token") || null,
//     loading: false,
//     error: null,
//   },

//   reducers: {
//     adminLogout: (state) => {
//       state.adminUser = null;
//       state.token = null;
//       localStorage.removeItem("admin_token");
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(adminLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(adminLogin.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.adminUser = payload?.user || null;
//         state.token = payload?.token || null;
//       })

//       .addCase(adminLogin.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload;
//       });
//   },
// });

// export const { adminLogout } = adminAuthSlice.actions;
// export default adminAuthSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// // LOGIN API CALL
// export const loginAdmin = createAsyncThunk(
//   "adminAuth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/users/login", {
//         email,
//         password,
//       });

//       // Save Token
//       if (res?.data?.data?.token) {
//         localStorage.setItem("adminToken", res.data.data.token);
//       }

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// const adminAuthSlice = createSlice({
//   name: "adminAuth",
//   initialState: {
//     user: null,
//     token: localStorage.getItem("adminToken") || null,
//     loading: false,
//     error: null,
//     success: false,
//   },

//   reducers: {
//     logoutAdmin: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("adminToken");
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(loginAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(loginAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.user = action.payload?.data?.user || null;
//         state.token = action.payload?.data?.token || null;
//       })
//       .addCase(loginAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       });
//   },
// });

// export const { logoutAdmin } = adminAuthSlice.actions;
// export default adminAuthSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const loginAdmin = createAsyncThunk(
  "adminAuth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/users/login", {
        email,
        password,
      });

      if (res?.data?.data?.token) {
        localStorage.setItem("adminToken", res.data.data.token);
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    user: null,
     currentUser: null,
    token: localStorage.getItem("adminToken") || null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    logoutAdmin: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload?.data?.user || null;
        state.token = action.payload?.data?.token || null;
        state.currentUser = action.payload?.data?.user || null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
