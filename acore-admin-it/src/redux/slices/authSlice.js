import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/login", {
        email,
        password,
      });
      
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set current user from localStorage on app load
    setUserFromStorage: (state) => {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      if (userData && token) {
        state.currentUser = JSON.parse(userData);
        state.isAuthenticated = true;
      }
    },
    
    // Logout user
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { setUserFromStorage, logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;