import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/auth";
import { RxCross2 } from "react-icons/rx";
import { BsChatTextFill } from "react-icons/bs";
import { createConversation, setConversation } from "../actions/conversations";
import { SearchBar } from "../components";
function ListOfUsers({ setshowListOfUsers, showListOfUsers }) {
  const users = useSelector((state) => state.auth.users);
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const startConversation = (consversation) => {
    dispatch(createConversation({ participants: [consversation] }));

    setshowListOfUsers(false);
  };

  return (
    <div
      className={`absolute h-full w-full left-0 top-0 z-[999999] bg-[#0000009c]  place-items-center ${
        showListOfUsers ? "grid" : "hidden"
      }`}
    >
      <div className=" w-80 flex flex-col  pb-3 bg-white rounded-sm overflow-hidden">
        <button className="w-full flex justify-between text-white items-center mb-4 p-2  bg-orange-500">
          <h2 className=" font-bold  text-lg capitalize">new conversation</h2>
          <RxCross2
            className="font-bold text-2xl"
            onClick={() => setshowListOfUsers(false)}
          />
        </button>
        <div className="px-2 w-full">
          <SearchBar
            placeholder="Search conversation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="mt-4 h-[500px] overflow-auto px-2">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`w-full  justify-between  items-center py-3 px-2  capitalize rounded-md shadow-sm ${
                profile?.result?._id === user._id ? "hidden" : "flex"
              } `}
            >
              <div className="flex items-center gap-1 text-gray-600  ">
                <img
                  className="h-11 w-11 rounded-full object-cover"
                  src={user.image}
                  alt={user.username}
                />
                {user.username}
              </div>
              <button
                title="Start Conversation"
                className="flex items-center gap-1 cursor-pointer bg-[#2176ff] p-2 text-white rounded-md hover:bg-[#2176ffde] "
                onClick={() =>
                  startConversation([
                    {
                      userId: user._id,
                      name: user.username,
                      profilePic: user.image,
                    },
                    {
                      userId: profile.result._id,
                      name: profile.result.username,
                      profilePic: profile.result.image,
                    },
                  ])
                }
              >
                chat
                <BsChatTextFill />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListOfUsers;
