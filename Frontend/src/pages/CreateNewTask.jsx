import React from "react";

const CreateNewTask = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-4 sm:px-10 flex flex-col gap-5 pt-10 md:pt-20">
        <h1 className="text-2xl font-medium tracking-tight text-center">
          Create New Task
        </h1>
        <form className="w-full flex flex-col gap-3 tracking-tight">
          <div className="flex flex-col gap-1">
            <label className="text-base font-normal opacity-80" htmlFor="title">
              Task Title
            </label>
            <input
              id="title"
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
              id="description"
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
              id="deadline"
              type="date"
              placeholder="Enter Project deadline"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-normal opacity-80"
              id="role"
              htmlFor="firstName"
            >
              Select Role
            </label>
            <select className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400">
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
