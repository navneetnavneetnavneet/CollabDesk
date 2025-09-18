import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  return (
    task && (
      <Link
        to={`/task/details/${task._id}`}
        className="w-full sm:w-[100%] md:w-[48%] lg:w-[31.5%] px-4 py-8 hover:bg-zinc-800 duration-300 hover:scale-[.99] flex flex-col items-center justify-center gap-2 rounded-md border border-zinc-800 shadow-md"
      >
        <h1 className="text-[1.5rem] font-medium tracking-tight leading-none text-center">
          {task.title}
        </h1>
        <h3 className="text-[1.25rem] font-normal tracking-tight leading-none opacity-60 text-center">
          Create By :{" "}
          {` ${task.createdBy.fullName.firstName} ${task.createdBy.fullName.lastName}`}
        </h3>
        <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
          Status : {task.status}
        </h4>
        <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
          Deadline : {new Date(task.deadline).toLocaleDateString()}
        </h4>
      </Link>
    )
  );
};

export default Task;
