import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncAddNewMember,
  asyncDeleteProject,
  asyncGetProjectDetails,
  asyncRemoveMember,
} from "../store/actions/projectActions";
import { setProject } from "../store/reducers/projectSlice";
import Team from "../components/Team";
import Task from "../components/Task";
import Loading from "./Loading";
import { asyncFetchProjectTasks } from "../store/actions/taskActions";
import { setProjectTasks } from "../store/reducers/taskSlice";
import axios from "../util/axios";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResult = async () => {
    if (search === "") {
      return;
    }

    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `/auth/all-user?search=${search}`
      );
      if (data && status === 200) {
        setSearchResults(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchResult();

    return () => {
      setSearchResults([]);
    };
  }, [search]);

  useEffect(() => {
    if (projectId) {
      dispatch(asyncGetProjectDetails(projectId));
      dispatch(asyncFetchProjectTasks(projectId));
    }

    return () => {
      dispatch(setProject(null));
      dispatch(setProjectTasks([]));
    };
  }, [projectId, dispatch]);

  const { project } = useSelector((state) => state.projectReducer);
  const { projectTasks } = useSelector((state) => state.taskReducer);

  const addNewMemberHandler = async (userId) => {
    if (userId && project?._id) {
      await dispatch(asyncAddNewMember(project._id, userId));
      await dispatch(asyncGetProjectDetails(project._id));
    }
  };

  const removeMemberHandler = async (userId) => {
    if (userId && project?._id) {
      await dispatch(asyncRemoveMember(project._id, userId));
      await dispatch(asyncGetProjectDetails(project._id));
    }
  };

  return project ? (
    <div className="w-full h-full px-4 sm:px-10 py-3 sm:py-10 flex flex-col gap-10 overflow-y-auto">
      <div className="flex flex-col gap-3">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-medium tracking-tight leading-none">
          {project.name}
        </h1>
        <p className="text-base font-normal tracking-tight opacity-80 leading-tight">
          {project.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          voluptates natus laborum aspernatur labore dolor nesciunt mollitia ea,
          id placeat!
        </p>
        <div className="flex flex-col">
          <h3 className="text-base font-normal tracking-tight">
            Status : {project.status}
          </h3>
          <h3 className="text-base font-normal tracking-tight">
            Deadline : {new Date(project.deadline).toLocaleDateString()}
          </h3>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(`/update-project-deatils/${project._id}`)}
            className="w-fit px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 hover:scale-[.99] duration-300 cursor-pointer tracking-tight"
          >
            Update Project
          </button>
          <button
            onClick={async () => {
              await dispatch(asyncDeleteProject(project._id));
              await navigate("/projects");
            }}
            className="w-fit px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 hover:scale-[.99] duration-300 cursor-pointer tracking-tight"
          >
            Delete Project
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-normal tracking-tight leading-none">
          Created By
        </h3>
        <div className="w-full md:w-[48%] lg:w-[31.5%] p-4 hover:scale-[.99] hover:bg-zinc-800 duration-300 shadow flex flex-col items-center justify-center rounded-md border border-zinc-800">
          <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-zinc-800 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={project.createdBy.profileImage.url}
              alt=""
            />
          </div>
          <h1 className="text-xl font-normal tracking-tight">
            {`${project.createdBy.fullName.firstName} ${project.createdBy.fullName.lastName}`}
          </h1>
          <h3 className="text-base font-normal tracking-tight opacity-80">
            {project.createdBy.email}
          </h3>
          <h3 className="text-base font-normal tracking-tight opacity-80">
            Role : {project.createdBy.role}
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-normal tracking-tight leading-none">
          Members
        </h3>
        <div className="flex items-center gap-3 overflow-x-auto overflow-y-hidden">
          {project.members.length > 0
            ? project.members.map((member) => (
                <div
                  key={member._id}
                  className="w-28 sm:w-[46%] md:w-[30%] px-2 py-4 hover:bg-zinc-800 duration-300 cursor-pointer flex-shrink-0 flex flex-col items-center justify-center rounded-md border border-zinc-800 shadow"
                >
                  <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-zinc-800 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={member.profileImage.url}
                      alt=""
                    />
                  </div>
                  <h3 className="pt-1 text-xs sm:text-xl font-medium tracking-tight">
                    {`${member.fullName.firstName} ${member.fullName.lastName}`}
                  </h3>
                  <small className="text-xs tracking-tight opacity-60">
                    Role : {member.role}
                  </small>
                  <button
                    onClick={() => removeMemberHandler(member._id)}
                    className="mt-2 px-4 py-1 rounded hover:bg-red-600 duration-300 cursor-pointer bg-red-500 text-base font-normal tracking-tight"
                  >
                    Remove
                  </button>
                </div>
              ))
            : ""}
        </div>
        <div className="pt-5 flex items-center gap-2">
          <h1 className="whitespace-nowrap">Add Member</h1>
          <div className="w-full px-2 py-2 rounded-md flex items-center gap-2 border border-zinc-800">
            <i className="ri-search-line cursor-pointer"></i>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search User . . ."
              className="w-full outline-none border-none bg-transparent"
            />
            {search.trim() && (
              <i
                onClick={() => setSearch("")}
                className="ri-close-line cursor-pointer"
              ></i>
            )}
          </div>
        </div>
        <div className="w-full max-h-60 overflow-x-hidden overflow-y-auto">
          {searchResults.length > 0
            ? searchResults.map((user) => (
                <div
                  key={user._id}
                  className="w-full px-2 py-2 rounded-md hover:bg-zinc-800 duration-300 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 sm:w-14 h-10 sm:h-14 flex-shrink-0 rounded-full border border-zinc-800 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={user.profileImage.url}
                        alt=""
                      />
                    </div>
                    <h3 className="text-[1rem] md:text-[1.25rem] font-normal tracking-tight leading-none">
                      {`${user.fullName.firstName} ${user.fullName.lastName}`}
                    </h3>
                  </div>
                  <button
                    onClick={() => addNewMemberHandler(user._id)}
                    className="px-4 py-1 rounded hover:bg-green-600 duration-300 cursor-pointer bg-green-500 text-base font-normal tracking-tight"
                  >
                    Add Member
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-normal tracking-tight leading-none">
          Team
        </h3>
        <div className="w-full flex flex-wrap gap-5">
          {project.team ? (
            <Team team={project.team} />
          ) : (
            <h3 className="w-full text-center text-xs tracking-tight opacity-60">
              No team here.
            </h3>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-normal tracking-tight leading-none">
          Tasks
        </h3>
        <div className="w-full flex flex-wrap gap-5">
          {projectTasks?.length > 0 ? (
            projectTasks?.map((task) => <Task key={task._id} task={task} />)
          ) : (
            <h3 className="w-full text-center text-xs tracking-tight opacity-60">
              No tasks here.
            </h3>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ProjectDetails;
