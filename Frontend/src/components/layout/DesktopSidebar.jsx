import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DesktopSidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="relative w-72 h-full hidden sm:flex flex-col border-r border-zinc-800">
      <div className="w-full px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <h1 className="text-[1.5rem] font-medium tracking-tight leading-none">
          Collb<span className="text-red-500">Desk</span>
        </h1>
        <div
          onClick={() => navigate("/profile")}
          className="w-10 h-10 rounded-full border border-zinc-800 overflow-hidden cursor-pointer"
        ></div>
      </div>
      <Link
        to="/projects"
        className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-2"
      >
        <i className="ri-folder-line text-xl"></i>
        <h4 className="text-xl font-normal tracking-tight">Projects</h4>
      </Link>
      <Link
        to="/teams"
        className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-2"
      >
        <i className="ri-group-line text-xl"></i>
        <h4 className="text-xl font-normal tracking-tight">Teams</h4>
      </Link>
      <Link
        to="/tasks"
        className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-2"
      >
        <i className="ri-task-line text-xl"></i>
        <h4 className="text-xl font-normal tracking-tight">Tasks</h4>
      </Link>
      <div className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-2">
        <i className="ri-chat-1-line text-xl"></i>
        <h4 className="text-xl font-normal tracking-tight">Chats</h4>
      </div>
      <button className="absolute bottom-2 left-4 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 duration-300 text-white font-medium tracking-tight cursor-pointer">
        Logout
      </button>
    </aside>
  );
};

export default DesktopSidebar;
