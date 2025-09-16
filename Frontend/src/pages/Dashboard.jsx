import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);

  return (
    user && (
      <div className="w-full h-screen sm:px-4 md:px-10 overflow-x-hidden overflow-y-auto">
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-medium tracking-tight leading-none text-center">
            Hello, {`${user.fullName.firstName} ${user.fullName.lastName}`} !
          </h1>
          <h5 className="text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] font-normal italic tracking-tight text-center opacity-60">
            Let's <span className="text-red-500 font-medium">start</span> your
            project.
          </h5>
        </div>
      </div>
    )
  );
};

export default Dashboard;
