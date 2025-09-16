import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { asyncLogoutUser } from "../store/actions/userActions";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  return user ? (
    <div className="w-full h-full px-4 sm:px-10">
      <div className="w-full md:w-2/3 lg:w-2/3 mx-auto pt-10 sm:pt-20 flex flex-col gap-5 items-center">
        <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-full border border-zinc-800 overflow-hidden"></div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-[1.5rem] font-medium tracking-tight">
            {`${user.fullName.firstName} ${user.fullName.lastName}`}
          </h3>
          <h4 className="text-[1.25rem] font-normal tracking-tight opacity-80">
            {user.email}
          </h4>
          <h5 className="text-[1rem] font-normal tracking-tight opacity-80">
            Role : {user.role}
          </h5>
        </div>
        <div className="w-full pt-5 flex items-center justify-center gap-5">
          <button
            onClick={() => navigate("/edit-profile")}
            className="w-fit flex items-center justify-center gap-1 px-8 py-2 rounded-md bg-blue-500 hover:bg-blue-600 border-none outline-none cursor-pointer"
          >
            <i className="ri-pencil-line"></i>
            <span className="text-base font-normal tracking-tight">
              Edit Profile
            </span>
          </button>
          <button
            onClick={async () => {
              await dispatch(asyncLogoutUser());
              toast.success("User Logout Successfully");
            }}
            className="w-fit flex items-center justify-center gap-1 px-8 py-2 rounded-md bg-red-500 hover:bg-red-600 border-none outline-none cursor-pointer"
          >
            <i className="ri-logout-box-line"></i>
            <span className="text-base font-normal tracking-tight">Logout</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
