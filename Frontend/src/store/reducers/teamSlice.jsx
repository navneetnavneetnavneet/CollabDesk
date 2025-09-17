import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [],
  team: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { setTeams, setTeam } = teamSlice.actions;
export default teamSlice.reducer;
