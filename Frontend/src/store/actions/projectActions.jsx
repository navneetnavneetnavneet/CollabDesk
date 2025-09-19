import axios from "../../util/axios";
import { setProject, setProjects } from "../reducers/projectSlice";

export const asyncFetchAllProject = () => async (dispatch, getState) => {
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

export const asyncCreateProject =
  ({ name, description, deadline, team }) =>
  async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/project/create", {
        name,
        description,
        deadline,
        team,
      });

      if (data && status === 201) {
        await dispatch(asyncFetchAllProject());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncAddNewMember =
  (projectId, userId) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post(
        `/project/${projectId}/add-member`,
        { userId }
      );

      if (data && status === 200) {
        await dispatch(asyncFetchAllProject());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncRemoveMember =
  (projectId, userId) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.delete(
        `/project/${projectId}/remove-member/${userId}`,
        { userId }
      );

      if (data && status === 200) {
        await dispatch(asyncFetchAllProject());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
