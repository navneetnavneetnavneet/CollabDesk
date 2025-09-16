import React from "react";

const Task = () => {
  return (
    <div className="w-full sm:w-[47%] md:w-[30%] lg:w-[23%] px-4 py-8 hover:bg-zinc-800 duration-300 hover:scale-[.99] flex flex-col items-center justify-center gap-2 rounded-md border border-zinc-800 shadow-md">
      <h1 className="text-[1.5rem] font-medium tracking-tight leading-none text-center">
        Task Title
      </h1>
      <h3 className="text-[1.25rem] font-normal tracking-tight leading-none opacity-60 text-center">
        Create By : Username
      </h3>
      <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
        Status : Completed
      </h4>
      <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
        Deadline : 12-04-2026
      </h4>
    </div>
  );
};

export default Task;
