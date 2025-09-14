import React from "react";

const EditProfile = () => {
  return (
    <div className="w-full h-full px-4 sm:px-10 text-white">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto pt-10 sm:pt-20 flex flex-col gap-5 items-center">
        <div className="relative w-20 sm:w-28 h-20 sm:h-28 flex items-center justify-center rounded-full border border-zinc-800">
          <i class="ri-image-line text-3xl sm:text-5xl font-thin"></i>
          <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-zinc-700 flex items-center justify-center cursor-pointer">
            <i className="ri-pencil-line"></i>
          </div>
          {/* <img
            className="w-full h-full object-cover rounded-full"
            src=""
            alt=""
          /> */}
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-normal tracking-tight opacity-80">
            User Information
          </h1>
          <div className="w-full h-[2px] bg-zinc-800"></div>
          <form className="w-full flex flex-col gap-3 pt-3">
            <div className="w-full flex gap-3">
              <div className="w-1/2 flex flex-col gap-1">
                <label
                  className="text-base font-normal opacity-80"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400"
                />
              </div>
              <div className="w-1/2 flex flex-col gap-1">
                <label
                  className="text-base font-normal opacity-80"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-base font-normal opacity-80"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-base font-normal opacity-80"
                htmlFor="role"
              >
                Select Role
              </label>
              <select
                id="role"
                className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400"
              >
                <option
                  value="member"
                  className="text-base font-normal opacity-80 text-black tracking-tight"
                >
                  Member
                </option>
                <option
                  value="admin"
                  className="text-base font-normal opacity-80 text-black tracking-tight"
                >
                  Admin
                </option>
                <option
                  value="manager"
                  className="text-base font-normal opacity-80 text-black tracking-tight"
                >
                  Manager
                </option>
              </select>
            </div>
            <button className="w-full mt-3 px-2 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
