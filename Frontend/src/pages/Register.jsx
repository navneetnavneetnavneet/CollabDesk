import React, { useState } from "react";
import StepOne from "../components/steps/StepOne";
import StepTwo from "../components/steps/StepTwo";
import StepThree from "../components/steps/StepThree";
import { Link } from "react-router-dom";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="w-full h-full px-4 py-2 flex items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex flex-col gap-5 px-4 py-5 bg-white text-black rounded-xl shadow">
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full border border-zinc-600"></div>
          <h1 className="text-2xl font-medium tracking-tight">
            Create New Account
          </h1>
          <p className="text-sm tracking-tight leading-none opacity-60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum minus
            quasi laboriosam vero et officiis voluptatibus. Lorem ipsum dolor
            sit amet.
          </p>
        </div>
        <div className="flex justify-around md:justify-evenly">
          <h1
            className={`${
              currentStep === 1 ? "bg-sky-500" : "bg-sky-300"
            } duration-300 w-fit px-6 sm:px-8 py-1 rounded-full text-white font-medium`}
          >
            Step 1
          </h1>
          <h1
            className={`${
              currentStep === 2 ? "bg-sky-500" : "bg-sky-300"
            } duration-300 w-fit px-6 sm:px-8 py-1 rounded-full text-white font-medium`}
          >
            Step 2
          </h1>
          <h1
            className={`${
              currentStep === 3 ? "bg-sky-500" : "bg-sky-300"
            } duration-300 w-fit px-6 sm:px-8 py-1 rounded-full text-white font-medium`}
          >
            Step 3
          </h1>
        </div>
        <div className="w-full">
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
        </div>
        <p className="text-sm tracking-tight leading-none text-center">
          Already have an account ?
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
