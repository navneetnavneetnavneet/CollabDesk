import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncLogoutUser } from "../../store/actions/userActions";
import { toast } from "react-toastify";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [width, setWidth] = useState(0);

  const { user } = useSelector((state) => state.userReducer);

  return (
    user && (
      <>
        <nav className="w-full px-4 h-[10vh] flex flex-shrink-0 sm:hidden items-center justify-between border-b border-zinc-800 overflow-hidden">
          <div className="flex items-center gap-1">
            <i
              onClick={() => setWidth(50)}
              className="ri-menu-line text-[1.5rem] cursor-pointer"
            ></i>
            <h1 className="text-[1.5rem] font-medium tracking-tight leading-none">
              Collb<span className="text-red-500">Desk</span>
            </h1>
          </div>
          <div
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full border border-zinc-800 overflow-hidden cursor-pointer"
          >
            <img
              className="w-full h-full object-cover"
              src={user.profileImage.url}
              alt=""
            />
          </div>
        </nav>
        <aside
          onClick={() => setWidth(0)}
          style={{ width: `${width}%` }}
          className={`${
            width === 0 ? "hidden" : "flex"
          } flex sm:hidden flex-col duration-300 border-r border-zinc-800 absolute top-0 left-0 h-full bg-zinc-900 z-10`}
        >
          <div className="w-full px-4 h-[10vh] border-b border-zinc-800 flex items-center justify-between">
            <i className="ri-menu-line text-[1.5rem] cursor-pointer"></i>
            <i
              onClick={() => setWidth(0)}
              className="ri-close-line text-[1.5rem] cursor-pointer"
            ></i>
          </div>
          <Link
            to="/"
            className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-1 cursor-pointer"
          >
            <i className="ri-home-line text-[1.5rem]"></i>
            <h4 className="text-[1.5rem] font-normal tracking-tight">
              Dashbard
            </h4>
          </Link>
          <Link
            to="/projects"
            className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-1 cursor-pointer"
          >
            <i className="ri-folder-line text-[1.5rem]"></i>
            <h4 className="text-[1.5rem] font-normal tracking-tight">
              Projects
            </h4>
          </Link>
          <Link
            to="/teams"
            className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-1 cursor-pointer"
          >
            <i className="ri-group-line text-[1.5rem]"></i>
            <h4 className="text-[1.5rem] font-normal tracking-tight">Teams</h4>
          </Link>
          <Link
            to="/tasks"
            className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-1 cursor-pointer"
          >
            <i className="ri-task-line text-[1.5rem]"></i>
            <h4 className="text-[1.5rem] font-normal tracking-tight">Tasks</h4>
          </Link>
          <div className="w-full px-4 py-3 hover:bg-zinc-800 duration-300 border-b border-zinc-800 flex items-center gap-1 cursor-pointer">
            <i className="ri-chat-1-line text-[1.5rem]"></i>
            <h4 className="text-[1.5rem] font-normal tracking-tight">Chats</h4>
          </div>
          <div className="w-full px-4 absolute bottom-4 left-0">
            <button
              onClick={async () => {
                await dispatch(asyncLogoutUser());
                toast.success("User Logout Successfully");
              }}
              className="w-full px-4 py-2 rounded-md bg-red-500 hover:bg-red-800 duration-300 text-white font-medium tracking-tight cursor-pointer"
            >
              Logout
            </button>
          </div>
        </aside>
      </>
    )
  );
};

export default MobileNavbar;
