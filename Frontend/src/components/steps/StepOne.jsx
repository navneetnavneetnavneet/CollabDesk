import React from "react";

const StepOne = () => {
  return (
    <>
      <small className="text-sm font-medium opacity-60">Step-1/3</small>
      <h1 className="text-xl font-medium tracking-tight text-center opacity-80">
        Personal Information
      </h1>
      <div className="tracking-tight flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="text-sm" id="firstName" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter First Name"
            className="w-full px-2 py-1 rounded-md outline-none border border-zinc-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm" id="lastName" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter First Name"
            className="w-full px-2 py-1 rounded-md outline-none border border-zinc-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm" id="role" htmlFor="firstName">
            Select Role
          </label>
          <select className="w-full px-2 py-1 rounded-md outline-none border border-zinc-400">
            <option value="member" className="text-sm tracking-tight">
              Member
            </option>
            <option value="admin" className="text-sm tracking-tight">
              Admin
            </option>
            <option value="manager" className="text-sm tracking-tight">
              Manager
            </option>
          </select>
        </div>
        <button className="w-full flex items-center justify-center gap-1 px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
          <span>Next</span>
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </>
  );
};

export default StepOne;
