import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncGetTaskDetails,
  asyncUpdateTask,
} from "../store/actions/taskActions";
import Loading from "./Loading";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateTaskDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();

  const { task } = useSelector((state) => state.taskReducer);

  useEffect(() => {
    dispatch(asyncGetTaskDetails(taskId));
  }, [taskId]);

  const [title, setTitle] = useState(task ? task?.title : "");
  const [description, setDescription] = useState(task ? task?.description : "");
  const [deadline, setDeadline] = useState(task ? task?.deadline : "");
  const [status, setStatus] = useState(task ? task?.status : "");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      deadline,
      status,
    };

    try {
      await dispatch(asyncUpdateTask(taskId, taskData));
      await dispatch(asyncGetTaskDetails(taskId));
      navigate(-1);
    } catch (error) {
      toast.error("Task is not updated !");
    }
  };

  return task ? (
    <div className="w-full h-full px-4 sm:px-10 text-white">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto pt-5 sm:pt-10 flex flex-col gap-5 items-center">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-normal tracking-tight opacity-80">
          Task Information
        </h1>
        <div className="-mt-4 w-full h-[1px] bg-zinc-800"></div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-3 pt-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-base font-normal opacity-80" htmlFor="title">
              Task Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="title"
              type="text"
              placeholder="Enter Task Title"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-normal opacity-80"
              htmlFor="description"
            >
              Task Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              type="text"
              placeholder="Enter Task Description"
              className="w-full px-2 py-2 rounded-md resize-none outline-none border border-zinc-800"
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-normal opacity-80"
              htmlFor="deadline"
            >
              Task Deadline
            </label>
            <input
              onChange={(e) => setDeadline(e.target.value)}
              value={formatDate(deadline)}
              id="deadline"
              type="date"
              placeholder="Enter Task deadline"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-normal opacity-80"
              htmlFor="status"
            >
              Task Status
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              title="status"
              id="status"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            >
              <option
                value="todo"
                className="text-base font-normal opacity-80 text-black tracking-tight"
              >
                Todo
              </option>
              <option
                value="in-progress"
                className="text-base font-normal opacity-80 text-black tracking-tight"
              >
                In-Progress
              </option>
              <option
                value="done"
                className="text-base font-normal opacity-80 text-black tracking-tight"
              >
                Done
              </option>
            </select>
          </div>
          <button className="w-full mt-3 px-2 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            Update Task
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default UpdateTaskDetails;
