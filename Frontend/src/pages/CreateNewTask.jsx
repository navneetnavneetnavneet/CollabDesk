import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncCreateTask } from "../store/actions/taskActions";

const CreateNewTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "todo",
    project: projectId,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const { title, description, deadline, status, project } = formData;

    if (!title || !description || !deadline || !status || !project) {
      return toast.warning("All fields are required !");
    }

    try {
      await dispatch(asyncCreateTask(formData));
      toast.success("New task is created");
      navigate("/tasks");
    } catch (error) {
      toast.error("New task is not created !");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-4 sm:px-10 flex flex-col gap-5 pt-10 md:pt-20">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-normal tracking-tight opacity-80 text-center">
          Add New Task
        </h1>
        <div className="-mt-4 w-full h-[1px] bg-zinc-800"></div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-3 tracking-tight"
        >
          <div className="flex flex-col gap-1">
            <label className="text-base font-normal opacity-80" htmlFor="title">
              Task Title
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.title}
              id="title"
              name="title"
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
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.description}
              id="description"
              name="description"
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
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.deadline}
              id="deadline"
              name="deadline"
              type="date"
              placeholder="Enter Project deadline"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-normal opacity-80"
              htmlFor="status"
            >
              Select Role
            </label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.status}
              id="status"
              name="status"
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
          <button className="w-full mt-3 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewTask;
