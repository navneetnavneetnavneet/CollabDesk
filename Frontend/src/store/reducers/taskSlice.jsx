import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: null,
  tasks: [],
  projectTasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setProjectTasks: (state, action) => {
      state.projectTasks = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setProjectTasks, setTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
