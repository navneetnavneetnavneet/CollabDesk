import React from "react";

const CreateNewProject = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full md:w-2/3 mx-auto px-4 sm:px-10 flex flex-col gap-5 pt-10 md:pt-20">
        <h1 className="text-2xl font-medium tracking-tight text-center">
          Create New Project
        </h1>
        <form className="w-full flex flex-col gap-3 tracking-tight">
          <div className="flex flex-col gap-1">
            <label className="text-base font-normal opacity-80" htmlFor="name">
              Project Name
            </label>
            <input
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
              id="deadline"
              type="date"
              placeholder="Enter Project deadline"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            />
          </div>
          <button className="w-full mt-3 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProject;
