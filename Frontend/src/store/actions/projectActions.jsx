import axios from "../../util/axios";
import { setProject } from "../reducers/projectSlice";

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
