import React from "react";

const StepThree = () => {
  return (
    <>
      <small className="text-sm font-medium opacity-60">Step-3/3</small>
      <h1 className="text-xl font-medium tracking-tight text-center opacity-80">
        OTP Verification
      </h1>
      <div className="tracking-tight flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="text-sm" id="otp" htmlFor="otp">
            OTP
          </label>
          <input
            id="otp"
            name="otp"
            type="number"
            placeholder="Enter OTP"
            className="w-full px-2 py-1 rounded-md outline-none border border-zinc-400"
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <button className="w-full flex items-center justify-center gap-1 px-2 py-1 rounded-md text-white bg-gray-500 hover:bg-gray-600 duration-300 cursor-pointer">
            <i className="ri-arrow-left-line"></i>
            <span>Back</span>
          </button>
          <button className="w-full flex items-center justify-center gap-1 px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            <span>Next</span>
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default StepThree;
