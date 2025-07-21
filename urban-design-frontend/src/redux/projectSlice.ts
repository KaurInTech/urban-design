// src/redux/projectSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id?: number;
  username: string;
  project_name: string;
  query: string;
  filter: any;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

interface SaveProjectPayload {
  username: string;
  project_name: string;
  query: string;
  filter: any;
}

export const saveProject = createAsyncThunk(
  'projects/saveProject',
  async (payload: SaveProjectPayload, thunkAPI) => {
    const res = await fetch('http://localhost:5000/api/save_project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to save project');
    }

    const data = await res.json();
    return {
      ...payload,
      id: data.id, // optional if backend returns ID
    };
  }
);


// 🌀 Async thunk to fetch projects from the backend
export const fetchProjects = createAsyncThunk<Project[], string>(
  'project/fetchProjects',
  async (username, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:5000/api/load_projects/${username}`);
      const data = await res.json();
      return data; // assumes data is Project[]
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch projects");
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    clearProjects: (state) => {
      state.projects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(saveProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(saveProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProjects, addProject, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
