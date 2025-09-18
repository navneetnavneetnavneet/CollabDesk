import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Project from "../components/Project";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchAllProject } from "../store/actions/projectActions";
import { setProjects } from "../store/reducers/projectSlice";
import Loading from "../pages/Loading";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchAllProject());

    return () => {
      dispatch(setProjects([]));
    };
  }, []);

  const { projects } = useSelector((state) => state.projectReducer);

  return projects ? (
    <div className="relative w-full overflow-x-hidden overflow-y-auto">
      <div className="sm:sticky top-0 left-0 z-[99] bg-zinc-900 w-full px-4 sm:px-10 py-3 sm:border-b border-zinc-800 flex items-center justify-between">
        <h1 className="text-[1.5rem] font-medium tracking-tight leading-none">
          Projects
        </h1>
        <button
          onClick={() => navigate("/create-new-project")}
          className="px-4 py-2 rounded-md border border-zinc-800 hover:bg-zinc-800 duration-300 hover:scale-[.99] cursor-pointer"
        >
          Add New Project
        </button>
      </div>
      <div className="w-full px-4 sm:px-10 py-5 flex flex-wrap gap-5 lg:gap-8 justify-start">
        <Project />
        {projects.length > 0 ? (
          projects.map((project) => (
            <Project key={project._id} project={project} />
          ))
        ) : (
          <h3 className="w-full text-center text-xs tracking-tight opacity-60">
            No project here.
          </h3>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Projects;
