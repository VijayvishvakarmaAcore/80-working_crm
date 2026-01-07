// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// // ================= GET ALL TASKS =================
// export const fetchTasks = createAsyncThunk(
//   "tasks/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/api/tasks");
//       return res.data.data || [];
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Failed to fetch tasks");
//     }
//   }
// );

// // ================= CREATE TASK =================
// export const createTask = createAsyncThunk(
//   "tasks/create",
//   async (taskData, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/api/tasks", taskData);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Task creation failed");
//     }
//   }
// );

// // ================= UPDATE STATUS =================
// export const updateTaskStatus = createAsyncThunk(
//   "tasks/updateStatus",
//   async ({ id, status }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.put(`/api/tasks/${id}/status`, { status });
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Status update failed");
//     }
//   }
// );

// // ================= DELETE TASK =================
// export const deleteTask = createAsyncThunk(
//   "tasks/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axiosInstance.delete(`/api/tasks/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Delete failed");
//     }
//   }
// );

// // ================= SLICE =================
// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     tasks: [],
//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       // ------ FETCH ------
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tasks = action.payload;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ------ CREATE ------
//       .addCase(createTask.fulfilled, (state, action) => {
//         state.tasks.push(action.payload);
//       })

//       // ------ UPDATE STATUS ------
//       .addCase(updateTaskStatus.fulfilled, (state, action) => {
//         state.tasks = state.tasks.map((task) =>
//           task._id === action.payload._id ? action.payload : task
//         );
//       })

//       // ------ DELETE ------
//       .addCase(deleteTask.fulfilled, (state, action) => {
//         state.tasks = state.tasks.filter((task) => task._id !== action.payload);
//       });
//   },
// });

// export default tasksSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// ================= GET ALL TASKS =================
export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tasks");
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch tasks");
    }
  }
);

// ================= CREATE TASK =================
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/tasks", taskData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Task creation failed");
    }
  }
);

// ================= UPDATE STATUS =================
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}/status`, { status });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Status update failed");
    }
  }
);

// ================= DELETE TASK =================
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// ================= SLICE =================
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ------ FETCH ------
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ------ CREATE ------
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // ------ UPDATE STATUS ------
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })

      // ------ DELETE ------
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
