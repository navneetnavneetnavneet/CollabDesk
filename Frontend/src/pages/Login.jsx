import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full h-full px-4 py-2 flex items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex flex-col gap-5 px-4 py-5 bg-white text-black rounded-xl shadow">
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full border border-zinc-600"></div>
          <h1 className="text-2xl font-medium tracking-tight">Login Account</h1>
          <p className="text-sm tracking-tight leading-none opacity-60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum minus
            quasi laboriosam vero et officiis voluptatibus. Lorem ipsum dolor
            sit amet.
          </p>
        </div>
        <form className="w-full flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-sm" id="email" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              className="w-full px-2 py-1 rounded-md outline-none border border-zinc-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm" id="password" htmlFor="password">
              Password
            </label>
            <div className="w-full flex items-center px-2 py-1 rounded-md outline-none border border-zinc-400">
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
          <button className="w-full flex items-center justify-center gap-1 px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            Login
          </button>
        </form>
        <p className="text-sm tracking-tight leading-none text-center">
          Don't have an account ?
          <Link to="/register" className="text-blue-600">
            Create New Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
