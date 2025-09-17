import React from "react";
import { Link } from "react-router-dom";

const Team = ({ team }) => {
  return (
    team && (
      <Link
        to={`/team/details/${team._id}`}
        className="w-full sm:w-[100%] md:w-[48%] lg:w-[31.5%] px-4 py-8 hover:bg-zinc-800 duration-300 hover:scale-[.99] flex flex-col items-center justify-center gap-2 rounded-md border border-zinc-800 shadow-md"
      >
        <h1 className="text-[1.5rem] font-medium tracking-tight leading-none">
          {team.name}
        </h1>
        <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
          Members : {team.members.length}
        </h4>
        <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
          Projects : {team.projects.length}
        </h4>
      </Link>
    )
  );
};

export default Team;
