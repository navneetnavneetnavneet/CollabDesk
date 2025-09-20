import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Team from "../components/Team";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchAllTeam } from "../store/actions/teamActions";
import { setTeams } from "../store/reducers/teamSlice";
import Loading from "../pages/Loading";

const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { teams } = useSelector((state) => state.teamReducer);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(asyncFetchAllTeam());

    return () => {
      dispatch(setTeams([]));
    };
  }, []);

  return user && teams ? (
    <div className="relative w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="sm:sticky top-0 left-0 z-[99] bg-zinc-900 w-full px-4 sm:px-10 py-3 sm:border-b border-zinc-800 flex items-center justify-between">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-medium tracking-tight leading-none">
          Teams
        </h1>
        {(user.role === "admin" || user.role === "manager") && (
          <button
            onClick={() => navigate("/create-new-team")}
            className="px-4 py-2 rounded-md border border-zinc-800 hover:bg-zinc-800 duration-300 hover:scale-[.99] cursor-pointer"
          >
            Add New Team
          </button>
        )}
      </div>
      <div className="w-full px-4 sm:px-10 py-5 flex flex-wrap gap-5 lg:gap-8 justify-start">
        {teams.length > 0 ? (
          teams.map((team) => <Team key={team._id} team={team} />)
        ) : (
          <h3 className="w-full text-center text-xs tracking-tight opacity-60">
            No teams here.
          </h3>
        )}
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Teams;
