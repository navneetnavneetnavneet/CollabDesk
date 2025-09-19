import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncGetProjectDetails,
  asyncUpdateProject,
} from "../store/actions/projectActions";
import Loading from "./Loading";
import { toast } from "react-toastify";

const UpdateProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const { project } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    dispatch(asyncGetProjectDetails(projectId));
  }, [projectId]);

  const [name, setName] = useState(project ? project?.name : "");
  const [description, setDescription] = useState(
    project ? project?.description : ""
  );
  const [deadline, setDeadline] = useState(project ? project?.deadline : "");
  const [status, setStatus] = useState(project ? project?.status : "");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const projectData = {
      name,
      description,
      deadline,
      status,
    };

    try {
      await dispatch(asyncUpdateProject(projectId, projectData));
      navigate(-1);
    } catch (error) {
      toast.error("Project is not updated !");
    }
  };

  return project ? (
    <div className="w-full h-full px-4 sm:px-10 text-white">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto pt-5 sm:pt-10 flex flex-col gap-5 items-center">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-normal tracking-tight opacity-80">
          Project Information
        </h1>
        <div className="-mt-4 w-full h-[1px] bg-zinc-800"></div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-3 pt-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-base font-normal opacity-80" htmlFor="name">
              Project Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              type="text"
              placeholder="Enter Project Name"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-normal opacity-80"
              htmlFor="description"
            >
              Project Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              type="text"
              placeholder="Enter Project Description"
              className="w-full px-2 py-2 rounded-md resize-none outline-none border border-zinc-800"
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-normal opacity-80"
              htmlFor="deadline"
            >
              Project Deadline
            </label>
            <input
              onChange={(e) => setDeadline(e.target.value)}
              value={formatDate(deadline)}
              id="deadline"
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
              Project Status
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              name="status"
              id="status"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            >
              <option
                value="not-started"
                className="text-base font-normal opacity-80 text-black tracking-tight"
              >
                Not-Started
              </option>
              <option
                value="in-progress"
                className="text-base font-normal opacity-80 text-black tracking-tight"
              >
                In-Progress
              </option>
              <option
                value="completed"
                className="text-base font-normal opacity-80 text-black tracking-tight"
              >
                Completed
              </option>
              <option
                value="on-hold"
                className="text-base font-normal opacity-80 text-black tracking-tight"
              >
                On-Hold
              </option>
            </select>
          </div>
          <button className="w-full mt-3 px-2 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            Update Project
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default UpdateProjectDetails;
