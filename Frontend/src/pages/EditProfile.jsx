import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncEditUser } from "../store/actions/userActions";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  const [preview, setPreview] = useState(null);
  const [firstName, setFirstName] = useState(
    user ? user.fullName.firstName : ""
  );
  const [lastName, setLastName] = useState(user ? user.fullName.lastName : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [role, setRole] = useState(user ? user.role : "");
  const [profileImage, setProfileImage] = useState(
    user ? user.profileImage : ""
  );

  const profileImageRef = useRef();

  const profileImageHandler = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      return toast.error("Only image allowed!");
    }

    if (file.size > 15 * 1024 * 1024) {
      return toast.error("File size must be less than 15MB!");
    }

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      fullName: { firstName, lastName },
      email,
      role,
      profileImage,
    };

    try {
      await dispatch(asyncEditUser(userData));
      toast.success("User Profile Updated");
      navigate("/profile");
      setPreview(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Updated Profile");
    }
  };

  return (
    <div className="w-full h-full px-4 sm:px-10 text-white">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto pt-10 sm:pt-20 flex flex-col gap-5 items-center">
        <div className="relative w-20 sm:w-28 h-20 sm:h-28 flex items-center justify-center rounded-full border border-zinc-800">
          {preview ? (
            !preview ? (
              <i className="ri-image-line text-3xl sm:text-5xl font-thin"></i>
            ) : (
              <img
                className="w-full h-full object-cover rounded-full"
                src={preview}
                alt=""
              />
            )
          ) : (
            <img
              className="w-full h-full object-cover rounded-full"
              src={user?.profileImage?.url}
              alt=""
            />
          )}
          <div
            onClick={() => {
              profileImageRef?.current?.click();
            }}
            className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-zinc-700 flex items-center justify-center cursor-pointer"
          >
            <i className="ri-pencil-line"></i>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-normal tracking-tight opacity-80">
            User Information
          </h1>
          <div className="w-full h-[2px] bg-zinc-800"></div>
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col gap-3 pt-3"
          >
            <input
              ref={profileImageRef}
              onChange={profileImageHandler}
              type="file"
              hidden={true}
              accept="image/*"
            />
            <div className="w-full flex gap-3">
              <div className="w-1/2 flex flex-col gap-1">
                <label
                  className="text-base font-normal opacity-80"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
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
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                onChange={(e) => setRole(e.target.value)}
                value={role}
                name="role"
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
