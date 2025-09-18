import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: null,
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks, setTask } = taskSlice.actions;
export default taskSlice.reducer;
