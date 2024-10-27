import React, { useState, useEffect } from "react";
import { SearchBar, Contact } from "../components";
import { HiUserAdd } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, setConversation } from "../actions/conversations";
import { fetchMessages } from "../actions/messages";
function ContactList({
  setshowListOfUsers,
  showContactList,
  setshowContactList,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredConvers, setFilteredConvers] = useState([]);
  const dispatch = useDispatch();

  const { conversations } = useSelector((state) => state.conversations);
  const { currentConversation } = useSelector((state) => state.conversations);
  const { onlineUsers } = useSelector((state) => state.auth);
  const profile = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (profile?.result?._id) {
      dispatch(fetchConversations(profile.result._id));
    }
  }, []);
  useEffect(() => {
    if (conversations) {
      setFilteredConvers(
        conversations.filter((conversation) =>
          conversation.participants[0]?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, conversations]);

  const handleUpdatConve = (convers) => {
    dispatch(setConversation(convers));
    dispatch(fetchMessages(convers._id));
    setshowContactList(false);
  };

  return (
    <div
      className={`min-w-80 max-w-80 text-gray-800 bg-white ${
        showContactList
          ? " translate-x-0"
          : " -translate-x-[1000px] md:translate-x-0"
      } duration-150  h-screen p-4 border-r absolute md:static z-[10000] left-0 top-0 `}
    >
      <div className="w-full flex justify-between items-center mb-3 relative">
        {currentConversation._id !== "" && (
          <div className="absolute cursor-pointer -right-[57px] top-0 block md:hidden bg-slate-50 p-2">
            <RxCross2
              className="font-bold text-2xl"
              onClick={() => setshowContactList(false)}
            />
          </div>
        )}
        <h2 className="text-2xl font-bold">
          {" "}
          <span className=" capitalize  bg-gradient-to-r from-[#3886fe] via-orange-300 to-[#fb6307] inline-block text-transparent bg-clip-text">
            mernify
          </span>
        </h2>

        <button
          onClick={() => setshowListOfUsers(true)}
          className="text-gray-900 text-2xl
          "
        >
          <HiUserAdd />
        </button>
      </div>
      <SearchBar
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-2 mt-3 ">
        {filteredConvers.map((convers) => (
          <li
            key={convers._id}
            onClick={() => handleUpdatConve(convers)}
            className="flex items-center justify-between p-2 cursor-pointer rounded hover:text-white hover:bg-gray-700 transition duration-200"
          >
            <Contact
              name={convers.participants[0].name}
              image={convers.participants[0].profilePic}
              status={
                onlineUsers.includes(convers.participants[0].userId)
                  ? "online"
                  : "offline"
              }
              lastmessage={convers?.lastMessage}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
