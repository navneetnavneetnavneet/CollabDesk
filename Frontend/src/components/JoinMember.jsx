import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncJoinTeam } from "../store/actions/teamActions";
import { toast } from "react-toastify";

const JoinMember = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useParams();

  const { team } = useSelector((state) => state.teamReducer);

  const joinTeamHandler = async () => {
    try {
      await dispatch(asyncJoinTeam(token));
      toast.success("Member join successfully");
      navigate("/teams");
    } catch (error) {
      toast.error("Failed to join member !");
    }
  };

  return (
    team && (
      <div className="w-full h-full py-4 sm:py-10 z-[999] bg-zinc-900 absolute top-0 left-0">
        <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-4 sm:px-10 flex flex-col gap-5">
          <h1 className="text-center text-[1.5rem] sm:text-[2rem] font-medium tracking-tight leading-none">
            Invite New Member
          </h1>
          <div className="w-full py-10 rounded-md border border-zinc-800 hover:bg-zinc-800 duration-300 cursor-pointer flex flex-col items-center gap-2">
            <h1 className="text-[1.5rem] font-medium tracking-tight leading-none">
              {team.name}
            </h1>
            <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
              Members : {team.members.length}
            </h4>
            <h4 className="text-base font-normal tracking-tight leading-none opacity-60">
              Projects : {team.projects.length}
            </h4>
            <div className="pt-5 w-full flex items-center justify-center gap-5">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-2 rounded-md border border-zinc-800 bg-zinc-700 hover:scale-[.99] duration-300 cursor-pointer"
              >
                Cancle
              </button>
              <button
                onClick={joinTeamHandler}
                className="px-8 py-2 rounded-md border border-zinc-800 bg-green-500 duration-300 hover:scale-[.99] cursor-pointer"
              >
                Join Team
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default JoinMember;
