import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import teamSlice from "./reducers/teamSlice";
import projectSlice from "./reducers/projectSlice";
import taskSlice from "./reducers/taskSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    teamReducer: teamSlice,
    projectReducer: projectSlice,
    taskReducer: taskSlice,
  },
});
