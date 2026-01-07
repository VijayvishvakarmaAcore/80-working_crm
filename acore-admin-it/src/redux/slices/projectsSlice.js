import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// 🔹 Get All Projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/projects");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to fetch projects");
    }
  }
);

// 🔹 Create Project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/projects", projectData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Project creation failed");
    }
  }
);

// 🔹 Get Single Project
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/projects/${projectId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Project not found");
    }
  }
);

// 🔹 UPDATE PROJECT (PUT)
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/api/projects/${projectId}`,
        updatedData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Update failed");
    }
  }
);

// 🔹 DELETE PROJECT
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/api/projects/${projectId}`);
      return { ...res.data, projectId };
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Delete failed");
    }
  }
);

// 🔹 Add Member
export const addProjectMember = createAsyncThunk(
  "projects/addMember",
  async ({ projectId, memberId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/api/projects/${projectId}/members`,
        { memberId }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add member");
    }
  }
);

// 🔹 Remove Member
export const removeProjectMember = createAsyncThunk(
  "projects/removeMember",
  async ({ projectId, memberId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(
        `/api/projects/${projectId}/members/${memberId}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to remove member");
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    selectedProject: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload?.data || [];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload?.data);
      })

      // GET SINGLE
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.selectedProject = action.payload?.data;
      })

      // UPDATE
      .addCase(updateProject.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        state.projects = state.projects.map((p) =>
          p._id === updated._id ? updated : p
        );
        state.selectedProject = updated;
      })

      // DELETE
      .addCase(deleteProject.fulfilled, (state, action) => {
        const id = action.payload.projectId;
        state.projects = state.projects.filter((p) => p._id !== id);
      })

      // ADD MEMBER
      .addCase(addProjectMember.fulfilled, (state, action) => {
        state.selectedProject = action.payload?.data;
      })

      // REMOVE MEMBER
      .addCase(removeProjectMember.fulfilled, (state, action) => {
        state.selectedProject = action.payload?.data;
      });
  },
});

export default projectsSlice.reducer;
