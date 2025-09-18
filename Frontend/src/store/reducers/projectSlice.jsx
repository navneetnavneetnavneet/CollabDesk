import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  project: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { setProjects, setProject } = projectSlice.actions;
export default projectSlice.reducer;
