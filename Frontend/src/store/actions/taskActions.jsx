import axios from "../../util/axios";
import { setTasks, setTask } from "../reducers/taskSlice";

export const asyncFetchAllTask = (projectId) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get(`/task/${projectId}`);

    if (data && status === 200) {
      await dispatch(setTasks(data));
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
