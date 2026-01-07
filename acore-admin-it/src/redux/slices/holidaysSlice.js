// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../services/axiosInstance";

// // 🔹 GET ALL Holidays
// export const fetchHolidays = createAsyncThunk(
//   "holidays/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get("/api/holidays");
//       return data?.data || [];
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔹 ADD Holiday
// export const createHoliday = createAsyncThunk(
//   "holidays/create",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post("/api/holidays", payload);
//       return data?.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔹 DELETE Holiday
// export const deleteHoliday = createAsyncThunk(
//   "holidays/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`/api/holidays/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const holidaysSlice = createSlice({
//   name: "holidays",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//     successMessage: null,
//   },

//   reducers: {
//     clearMessages: (state) => {
//       state.successMessage = null;
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // FETCH
//       .addCase(fetchHolidays.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchHolidays.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload || [];
//       })
//       .addCase(fetchHolidays.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // CREATE
//       .addCase(createHoliday.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createHoliday.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list.push(action.payload);
//         state.successMessage = "Holiday created successfully";
//       })
//       .addCase(createHoliday.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // DELETE
//       .addCase(deleteHoliday.fulfilled, (state, action) => {
//         state.list = state.list.filter((h) => h._id !== action.payload);
//         state.successMessage = "Holiday deleted successfully";
//       })
//       .addCase(deleteHoliday.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearMessages } = holidaysSlice.actions;
// export default holidaysSlice.reducer;



// gpt slice




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

// 🔹 GET ALL Holidays
export const fetchHolidays = createAsyncThunk(
  "holidays/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/holidays");
      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      } else if (data.data && Array.isArray(data.data)) {
        return data.data;
      } else if (data.holidays && Array.isArray(data.holidays)) {
        return data.holidays;
      } else {
        return [];
      }
    } catch (err) {
      console.error("Fetch holidays error:", err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to fetch holidays",
        status: err.response?.status
      });
    }
  }
);

// 🔹 ADD/UPDATE Holiday
export const createHoliday = createAsyncThunk(
  "holidays/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/holidays", payload);
      return data.data || data;
    } catch (err) {
      console.error("Create holiday error:", err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to create holiday",
        status: err.response?.status
      });
    }
  }
);

// 🔹 DELETE Holiday
export const deleteHoliday = createAsyncThunk(
  "holidays/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/holidays/${id}`);
      return id;
    } catch (err) {
      console.error("Delete holiday error:", err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to delete holiday",
        status: err.response?.status
      });
    }
  }
);

const holidaysSlice = createSlice({
  name: "holidays",
  initialState: {
    list: [],
    loading: false,
    error: null,
    successMessage: null,
  },

  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
    // Optional: If you want to update holiday locally before API call
    updateHolidayLocally: (state, action) => {
      const index = state.list.findIndex(h => h._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // FETCH - PENDING
      .addCase(fetchHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      // FETCH - FULFILLED
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.map(holiday => ({
          ...holiday,
          // Ensure all holidays have required fields
          id: holiday._id || holiday.id,
          title: holiday.title || "",
          date: holiday.date || new Date().toISOString().split('T')[0],
          type: holiday.type || "Public Holiday",
          status: holiday.status || "Active",
          description: holiday.description || "",
          color: holiday.color || "#3b82f6"
        }));
      })
      
      // FETCH - REJECTED
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE - PENDING
      .addCase(createHoliday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      // CREATE - FULFILLED
      .addCase(createHoliday.fulfilled, (state, action) => {
        state.loading = false;
        const newHoliday = action.payload;
        
        // Check if holiday already exists (for updates)
        const existingIndex = state.list.findIndex(h => 
          h._id === newHoliday._id || h.id === newHoliday.id
        );
        
        if (existingIndex !== -1) {
          // Update existing holiday
          state.list[existingIndex] = {
            ...state.list[existingIndex],
            ...newHoliday
          };
          state.successMessage = "Holiday updated successfully";
        } else {
          // Add new holiday
          state.list.unshift(newHoliday);
          state.successMessage = "Holiday created successfully";
        }
      })
      
      // CREATE - REJECTED
      .addCase(createHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE - FULFILLED
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        state.list = state.list.filter((h) => 
          h._id !== action.payload && h.id !== action.payload
        );
        state.successMessage = "Holiday deleted successfully";
      })
      
      // DELETE - REJECTED
      .addCase(deleteHoliday.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMessages, updateHolidayLocally } = holidaysSlice.actions;
export default holidaysSlice.reducer;