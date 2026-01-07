// admin-dashboard/src/redux/slices/adminEarlyLeaveSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaves';

// ✅ ADMIN APIs only
export const getPendingEarlyLeaves = createAsyncThunk(
  'adminEarlyLeave/getPending',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/pending-early`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const approveEarlyLeave = createAsyncThunk(
  'adminEarlyLeave/approve',
  async ({ leaveId, status, approvedBy }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/admin/approve-early/${leaveId}`,
        { status, approvedBy },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Slice
const adminEarlyLeaveSlice = createSlice({
  name: 'adminEarlyLeave',
  initialState: {
    pendingLeaves: [],
    loading: false,
    error: null,
    success: false,
    stats: {
      total: 0,
      approved: 0,
      rejected: 0,
      pending: 0
    }
  },
  reducers: {
    resetAdminEarlyLeave: (state) => {
      state.pendingLeaves = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    updateStats: (state) => {
      const total = state.pendingLeaves.length;
      const approved = state.pendingLeaves.filter(l => l.status === 'approved').length;
      const rejected = state.pendingLeaves.filter(l => l.status === 'rejected').length;
      const pending = state.pendingLeaves.filter(l => l.status === 'pending').length;
      
      state.stats = { total, approved, rejected, pending };
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Pending Early Leaves
      .addCase(getPendingEarlyLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingEarlyLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingLeaves = action.payload.data || [];
        // Update stats
        const total = action.payload.data?.length || 0;
        const pending = action.payload.data?.filter(l => l.status === 'pending').length || 0;
        state.stats = { 
          total, 
          approved: 0, 
          rejected: 0, 
          pending 
        };
      })
      .addCase(getPendingEarlyLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch pending leaves';
      })
      
      // Approve Early Leave
      .addCase(approveEarlyLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveEarlyLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        // Update the leave in pending list
        const updatedLeave = action.payload.data;
        state.pendingLeaves = state.pendingLeaves.map(leave =>
          leave._id === updatedLeave._id ? updatedLeave : leave
        );
        
        // Update stats
        const approved = state.pendingLeaves.filter(l => l.status === 'approved').length;
        const rejected = state.pendingLeaves.filter(l => l.status === 'rejected').length;
        const pending = state.pendingLeaves.filter(l => l.status === 'pending').length;
        
        state.stats = {
          total: state.pendingLeaves.length,
          approved,
          rejected,
          pending
        };
      })
      .addCase(approveEarlyLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to approve early leave';
      });
  }
});

export const { resetAdminEarlyLeave, updateStats } = adminEarlyLeaveSlice.actions;
export default adminEarlyLeaveSlice.reducer;