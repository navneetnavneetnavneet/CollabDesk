import React, { useState } from "react";

const StepTwo = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <small className="text-sm font-medium opacity-60">Step-2/3</small>
      <h1 className="text-xl font-medium tracking-tight text-center opacity-80">
        Contact Information
      </h1>
      <div className="tracking-tight flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-base font-normal opacity-80" htmlFor="email">
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
            htmlFor="password"
          >
            Password
          </label>
          <div className="w-full flex items-center px-2 py-2 rounded-md outline-none border border-zinc-400">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full outline-none bg-transparent"
            />
            <i
              onClick={() => setShow(!show)}
              class={`ri-eye${show ? "" : "-off"}-line cursor-pointer`}
            ></i>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <button className="w-full flex items-center justify-center gap-1 px-2 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-600 duration-300 cursor-pointer">
            <i className="ri-arrow-left-line"></i>
            <span>Back</span>
          </button>
          <button className="w-full flex items-center justify-center gap-1 px-2 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            <span>Next</span>
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
