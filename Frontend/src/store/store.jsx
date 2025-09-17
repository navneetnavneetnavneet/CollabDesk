import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import teamSlice from "./reducers/teamSlice";
import projectSlice from "./reducers/projectSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    teamReducer: teamSlice,
    projectReducer: projectSlice,
  },
});
