import React from "react";

const Team = () => {
  return (
    <div className="w-full sm:w-[47%] md:w-[30%] lg:w-[23%] px-4 py-8 hover:bg-zinc-800 duration-300 hover:scale-[.99] flex flex-col items-center justify-center gap-2 rounded-md border border-zinc-800 shadow-md">
      <h1 className="text-[1.5rem] font-medium tracking-tight leading-none">
        Team Name
      </h1>
      <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
        Tasks : 6
      </h4>
      <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
        Projects : 3
      </h4>
    </div>
  );
};

export default Team;
