import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteMessages } from "../actions/messages";
function DeleteConversationCard({
  showDeleteConverCard,
  setshowDeleteConverCard,
}) {
  const { currentConversation } = useSelector((state) => state.conversations);

  const dispatch = useDispatch();
  const handleClearChat = () => {
    dispatch(deleteMessages(currentConversation._id));
    setshowDeleteConverCard(false);
  };
  return (
    <div
      className={`absolute inset-0 ${
        showDeleteConverCard ? "opacity-100" : "opacity-0 hidden"
      } duration-150 flex justify-center items-center z-[9999999999] bg-[#0000001a]`}
    >
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-bold text-gray-900">Delete Conversation</h2>
        <p className="text-gray-600">
          Are you sure you want to delete this conversation?
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setshowDeleteConverCard(false)}
            className="px-4 py-2 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleClearChat}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConversationCard;
