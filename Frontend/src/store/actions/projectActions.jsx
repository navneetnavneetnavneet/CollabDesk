import axios from "../../util/axios";
import { setProject, setProjects } from "../reducers/projectSlice";

export const asyncFetchAllProjects = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/project/my-projects");

    if (data && status === 200) {
      await dispatch(setProjects(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncGetProjectDetails =
  (projectId) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.get(`/project/details/${projectId}`);

      if (data && status === 200) {
        await dispatch(setProject(data));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
