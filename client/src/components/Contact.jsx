import React from "react";
import { useSelector } from "react-redux";
function Contact({ name, status, image, lastmessage }) {
  const { onlineUsers } = useSelector((state) => state.auth);
  const { currentConversation } = useSelector((state) => state.conversations);
  return (
    <div className="flex items-center gap-2 text-gray-900 text-inherit ">
      <div className="relative">
        <div className="w-11 h-11 bg-gray-200 rounded-full">
          <img
            src={image}
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />
        </div>
        <div
          className={`w-2 h-2 absolute top-[1px] -right-1 bg-green-500 rounded-full ${
            status === "online" ? "block" : "hidden"
          } mr-2`}
        ></div>
      </div>
      <div className=" flex flex-col justify-start">
        <span className="font-bold">{name}</span>
        {lastmessage ? (
          <span className="text-sm text-gray-400 text-start -mt-1">
            {lastmessage}
          </span>
        ) : (
          <span className="text-sm text-gray-400 text-start -mt-1">
            {status
              ? status
              : onlineUsers.includes(
                  currentConversation.participants[0]?.userId
                )
              ? "online"
              : "offline"}
          </span>
        )}
      </div>
    </div>
  );
}

export default Contact;
