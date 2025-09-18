import axios from "../../util/axios";
import { setTeam, setTeams } from "../reducers/teamSlice";

export const asyncFetchAllTeam = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/team/my");

    if (data && status === 200) {
      await dispatch(setTeams(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncGetTeamDetails = (teamId) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get(`/team/details/${teamId}`);

    if (data && status === 200) {
      await dispatch(setTeam(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncCreateTeam = (name) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.post("/team/create", { name });

    if (data && status === 201) {
      await dispatch(asyncFetchAllTeam());
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
