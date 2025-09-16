import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { asyncLoginUser } from "../store/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      await dispatch(asyncLoginUser(data));
      toast.success("User Login Successfully");

      reset();
    } catch (error) {
      toast.error(error);
    }
  };

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
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label
              className="text-base font-normal opacity-80"
              id="email"
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
              {...register("email", { required: "This field is required" })}
            />
            {errors?.email && (
              <span className="text-xs -mt-1 text-red-500">
                {errors.email.message}
              </span>
            )}
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
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Password must be at most 15 characters",
                  },
                })}
              />
              <i
                onClick={() => setShow(!show)}
                className={`ri-eye${show ? "" : "-off"}-line cursor-pointer`}
              ></i>
            </div>
            {errors?.password && (
              <span className="text-xs -mt-1 text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <button className="w-full flex items-center justify-center gap-1 mt-3 px-2 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
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
