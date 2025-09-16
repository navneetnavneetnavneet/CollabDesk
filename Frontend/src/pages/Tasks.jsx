import React from "react";
import { useNavigate } from "react-router-dom";
import Task from "../components/Task";

const Tasks = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-x-hidden overflow-y-auto">
      <div className="sm:sticky top-0 left-0 z-[99] bg-zinc-900 w-full px-4 sm:px-10 py-3 sm:border-b border-zinc-800 flex items-center justify-between">
        <h1 className="text-[1.5rem] font-medium tracking-tight leading-none">
          Tasks
        </h1>
        <button
          onClick={() => navigate("/create-new-task")}
          className="px-4 py-2 rounded-md border border-zinc-800 hover:bg-zinc-800 duration-300 hover:scale-[.99] cursor-pointer"
        >
          Add New Task
        </button>
      </div>
      <div className="w-full px-4 sm:px-10 py-5 flex flex-wrap gap-5 lg:gap-8 justify-start">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};

export default Tasks;
