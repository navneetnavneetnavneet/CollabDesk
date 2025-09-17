import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Project from "../components/Project";
import { asyncGetTeamDetails } from "../store/actions/teamActions";
import { setTeam } from "../store/reducers/teamSlice";

const TeamDetails = () => {
  const dispatch = useDispatch();
  const { teamId } = useParams();

  const { user } = useSelector((state) => state.userReducer);
  const { team } = useSelector((state) => state.teamReducer);

  useEffect(() => {
    dispatch(asyncGetTeamDetails(teamId));

    return () => setTeam(null);
  }, [teamId]);

  console.log(team);

  return user && team ? (
    <div className="w-full h-full px-4 sm:px-10 py-3 sm:py-10 overflow-y-auto">
      <h1 className="text-[1.5rem] sm:text-[2rem] font-medium tracking-tight leading-none">
        {team.name}
      </h1>
      <div className="pt-5 flex flex-col gap-2">
        <h1 className="text-xl tracking-tight">Members</h1>
        {(user.role === "admin" || user.role === "manager") && (
          <div className="flex items-center justify-between sm:justify-start gap-5">
            <button className="px-4 py-2 rounded-md border border-zinc-800 hover:bg-zinc-800 duration-300 cursor-pointer">
              Add New Member
            </button>
            <button className="px-4 py-2 rounded-md border border-zinc-800 hover:bg-zinc-800 duration-300 cursor-pointer">
              Remove Member
            </button>
          </div>
        )}
        <div className="flex gap-6 flex-wrap">
          {team.members.length > 0 ? (
            team.members.map((member) => (
              <div
                key={member._id}
                className="w-24 sm:w-[46%] md:w-[30%] px-2 py-4 hover:bg-zinc-800 duration-300 cursor-pointer flex-shrink-0 flex flex-col items-center justify-center rounded-md border border-zinc-800 shadow"
              >
                <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-zinc-800 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={member.profileImage.url}
                    alt=""
                  />
                </div>
                <h3 className="pt-1 text-xs sm:text-xl font-medium tracking-tight">
                  {member.fullName.firstName}
                </h3>
                <small className="text-xs tracking-tight opacity-60">
                  role: {member.role}
                </small>
              </div>
            ))
          ) : (
            <h3 className="w-full text-center text-xs tracking-tight opacity-60">
              No members here.
            </h3>
          )}
        </div>
      </div>
      <div className="pt-5 flex flex-col gap-2">
        <h1 className="text-xl tracking-tight">Projects</h1>
        <div className="flex gap-5 flex-wrap">
          {team.projects.length > 0 ? (
            team.projects.map((project) => (
              <Project key={project._id} project={project} />
            ))
          ) : (
            <h3 className="w-full text-center text-xs tracking-tight opacity-60">
              No projects here.
            </h3>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TeamDetails;
