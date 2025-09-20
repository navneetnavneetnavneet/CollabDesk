import { useDispatch, useSelector } from "react-redux";
import axios from "../util/axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { asyncSendInvitationLink } from "../store/actions/teamActions";

const InviteMember = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResult = async () => {
    if (search === "") {
      return;
    }

    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `/auth/all-user?search=${search}`
      );
      if (data && status === 200) {
        setSearchResults(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchResult();

    return () => {
      setSearchResults([]);
    };
  }, [search]);

  const { team } = useSelector((state) => state.teamReducer);

  const sendInvitationLinkHanlder = async (email) => {
    try {
      const data = await dispatch(
        asyncSendInvitationLink({ teamId: team?._id, email: email })
      );

      if (data) {
        navigate(`/teams/join/${data?.invite?.token}`);
      }
    } catch (error) {
      toast.error("Failed to invitation !");
    }
  };

  return (
    <div className="w-full h-full py-4 sm:py-10 z-[9] bg-zinc-900 absolute top-0 left-0">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-4 sm:px-10 flex flex-col gap-5">
        <h1 className="text-center text-[1.5rem] sm:text-[2rem] font-medium tracking-tight leading-none">
          Invite New Member
        </h1>
        <div className="w-full flex items-center gap-2 px-2 py-2 rounded-md outline-none border border-zinc-800">
          <i className="ri-search-line"></i>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            id="name"
            type="text"
            placeholder="Search Users . . ."
            className="w-full outline-none border-none bg-transparent"
          />
          {search.trim() && (
            <i onClick={() => setSearch("")} className="ri-close-line"></i>
          )}
        </div>
        <div className="w-full max-h-60 overflow-x-hidden overflow-y-auto">
          {searchResults.length > 0
            ? searchResults.map((user) => (
                <div
                  key={user._id}
                  className="w-full px-2 py-2 rounded-md hover:bg-zinc-800 duration-300 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 sm:w-14 h-10 sm:h-14 flex-shrink-0 rounded-full border border-zinc-800"></div>
                    <h3 className="text-[1rem] md:text-[1.25rem] font-normal tracking-tight leading-none">
                      {`${user.fullName.firstName} ${user.fullName.lastName}`}
                    </h3>
                  </div>
                  <button
                    onClick={() => sendInvitationLinkHanlder(user.email)}
                    className="px-4 py-1 rounded hover:scale-[.99] hover:bg-green-600 duration-300 cursor-pointer bg-green-500 text-base font-normal tracking-tight"
                  >
                    invite
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default InviteMember;
