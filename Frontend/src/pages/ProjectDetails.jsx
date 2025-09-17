import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncGetProjectDetails } from "../store/actions/projectActions";
import { setProject } from "../store/reducers/projectSlice";
import Team from "../components/Team";
import Task from "../components/Task";
import Loading from "./Loading";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(asyncGetProjectDetails(projectId));

    return () => {
      dispatch(setProject(null));
    };
  }, [projectId]);

  const { project } = useSelector((state) => state.projectReducer);

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
          {project.tasks.length > 0 ? (
            project.tasks.map((task) => <Task key={task._id} task={task} />)
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
