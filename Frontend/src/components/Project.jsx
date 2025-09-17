import React from "react";
import { Link } from "react-router-dom";

const Project = ({ project }) => {
  return (
    project && (
      <Link
        to={`/project/details/${project._id}`}
        className="w-full sm:w-[100%] md:w-[48%] lg:w-[31.5%] px-4 py-8 hover:bg-zinc-800 duration-300 hover:scale-[.99] flex flex-col items-center justify-center gap-2 rounded-md border border-zinc-800 shadow-md"
      >
        <h1 className="text-[1.5rem] font-medium tracking-tight leading-none text-center">
          {project.name}
        </h1>
        <h3 className="text-[1.25rem] font-normal tracking-tight leading-none opacity-60 text-center">
          Created By : Navneet Singh
        </h3>
        <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
          Tasks : {project.tasks.length}
        </h4>
        <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
          Status : {project.status}
        </h4>
      </Link>
    )
  );
};

export default Project;
