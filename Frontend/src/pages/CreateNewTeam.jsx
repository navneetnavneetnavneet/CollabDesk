import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateTeam } from "../store/actions/teamActions";

const CreateNewTeam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const teamName = name.trim();

    if (!teamName) {
      return toast.warning("Team name is required !");
    }

    try {
      await dispatch(asyncCreateTeam(teamName));
      toast.success("Team is created successfully");
      navigate("/teams");
    } catch (error) {
      toast.error("Failed to create team !");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-4 sm:px-10 flex flex-col gap-5 pt-10 md:pt-20">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-normal tracking-tight opacity-80 text-center">
          Project New Team
        </h1>
        <div className="-mt-4 w-full h-[1px] bg-zinc-800"></div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-3 tracking-tight"
        >
          <div className="flex flex-col gap-1">
            <label className="text-base font-normal opacity-80" htmlFor="name">
              Team Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              type="text"
              placeholder="Enter Team Name"
              className="w-full px-2 py-2 rounded-md outline-none border border-zinc-800"
            />
          </div>
          <button className="w-full mt-3 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer">
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewTeam;
