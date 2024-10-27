import React from "react";
import convers from "../assets/conversation.svg";
function NoConversation() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img className="w-48 mb-3" src={convers} alt="coversation" />
      <h2 className="capitalize font-bold text-gray-600 text-xl">
        {" "}
        Select a conversation to start chat..
      </h2>
    </div>
  );
}

export default NoConversation;
