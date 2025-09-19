import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../pages/Loading";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { asyncCreateProject } from "../store/actions/projectActions";

const CreateNewProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [team, setTeam] = useState("");

  const { user } = useSelector((state) => state.userReducer);

  const submitHandler = async (e) => {
    e.preventDefault();

    const projectData = {
      name,
      description,
      deadline,
      team,
    };

    try {
      await dispatch(asyncCreateProject(projectData));
      toast.success("Project created successfully");
      navigate("/projects");
    } catch (error) {
      toast.error("Project is not created !");
    }
  };

  return user ? (
    <div className="w-full h-full">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-4 sm:px-10 flex flex-col gap-5 pt-10 md:pt-20">
        <h1 className="text-2xl font-medium tracking-tight text-center">
          Create New Project
        </h1>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-3 tracking-tight"
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
              value={deadline}
              id="deadline"
              type="date"
              placeholder="Enter Project deadline"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            />
          </div>
          {user.teams.length > 0 && (
            <div className="flex flex-col gap-1">
              <label
                className="text-base font-normal opacity-80"
                htmlFor="team"
              >
                Team
              </label>
              <div
                id="team"
                className="flex flex-col gap-2 max-h-24 overflow-x-hidden overflow-y-auto"
              >
                {user.teams.map((team) => (
                  <div
                    onClick={() => setTeam(team._id)}
                    key={team._id}
                    className="w-full flex items-center justify-between px-2 py-2 rounded-md border border-zinc-800 cursor-pointer"
                  >
                    <h3>{team.name}</h3>
                    <h3>members : {team.members.length}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button className="w-full mt-3 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            Create Project
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CreateNewProject;
