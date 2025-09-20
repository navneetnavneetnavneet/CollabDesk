import axios from "../../util/axios";
import { setProjectTasks, setTask, setTasks } from "../reducers/taskSlice";

export const asyncFetchAllTasks = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/task/my");

    if (data && status === 200) {
      await dispatch(setTasks(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncFetchProjectTasks =
  (projectId) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.get(`/task/${projectId}`);

      if (data && status === 200) {
        await dispatch(setProjectTasks(data));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncGetTaskDetails = (taskId) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get(`/task/details/${taskId}`);

    if (data && status === 200) {
      await dispatch(setTask(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncCreateTask =
  ({ title, description, deadline, status, project }) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/task/create", {
        title,
        description,
        deadline,
        status,
        project,
      });

      if (data) {
        await dispatch(asyncFetchAllTasks());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncUpdateTask =
  (taskId, { title, description, deadline, status }) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.put(`/task/update/${taskId}`, {
        title,
        description,
        status,
        deadline,
      });

      if (data) {
        await dispatch(asyncFetchAllTasks());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncDeleteTask = (taskId) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.delete(`/task/delete/${taskId}`);

    if (data && status) {
      await dispatch(asyncFetchAllTasks());
      await dispatch(setTask(null));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
