import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_MESSAGE, UPDATE_CONVERSATION } from "../constants/actionTypes";
import { MdEmojiEmotions, MdOutlinePermMedia, MdSend } from "react-icons/md";
import { createMessage } from "../actions/messages";
import EmojiPicker from "emoji-picker-react";
import socket from "../socketio/socket";
import { ToastOptions } from "../constants/toastOptions";
import { toast } from "react-toastify";
import ToastMessage from "./ToastMessage";
import song from "../assets/new-notification-7-210334.mp3";

function SendMessage({
  message,
  setmessage,
  selectedImage,
  setSelectedImage,
  setlaoding,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imgDis, setimgDis] = useState(null);
  const profile = JSON.parse(localStorage.getItem("profile"));
  const audioRef = useRef();
  const currentConversation = useSelector(
    (state) => state.conversations.currentConversation
  );
  const dispatch = useDispatch();

  const handleEmojiClick = (e) => {
    setmessage((prevMessage) => prevMessage + e.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setimgDis(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSendMessage = async () => {
    if (!message.trim() && !selectedImage) return;

    const formData = new FormData();
    formData.append(
      "sender",
      JSON.stringify({ name: profile.result.username, id: profile.result._id })
    );
    formData.append("recipient", currentConversation.participants[0].userId);
    formData.append("content", message);
    formData.append("conversationId", currentConversation._id);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      dispatch(createMessage(formData, setlaoding));

      const payload = {
        sender: { name: profile.result.username, id: profile.result._id },
        recipient: currentConversation.participants[0].userId,
        content: message,
        conversationId: currentConversation._id,
        timestamp: new Date().getTime(),
        image: imgDis,
      };

      dispatch({ type: CREATE_MESSAGE, payload });

      dispatch({
        type: UPDATE_CONVERSATION,
        payload: {
          lastMessage: !selectedImage ? message : "photo",
          conversationId: currentConversation._id,
        },
      });

      setmessage("");
      setSelectedImage(null);
      setimgDis(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    socket.on("msg-recieve", (msg) => {
      if (msg.conversationId === currentConversation._id) {
        dispatch({ type: CREATE_MESSAGE, payload: msg });
      } else {
        toast.info(
          <ToastMessage from={msg.sender.name} text={msg.content} />,
          ToastOptions
        );
        audioRef.current.play();
      }
      dispatch({
        type: UPDATE_CONVERSATION,
        payload: {
          lastMessage: !msg.image ? msg.content : "photo",
          conversationId: msg.conversationId,
        },
      });
    });

    return () => {
      socket.off("msg-recieve");
    };
  }, [dispatch, currentConversation]);

  return (
    <div className="w-full  z-50 bg-white">
      <audio src={song} ref={audioRef} className="hidden"></audio>
      <div className="relative flex p-4 gap-1 border-t">
        <button
          className="ml-2 px-3 bg-gray-100 rounded-lg text-[#2176ff] hover:bg-[#E4F2FF] hover:text-[#2176FF]"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <MdEmojiEmotions />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-14 left-0 z-10">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              emojiStyle="facebook"
            />
          </div>
        )}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          className="ml-2 px-3 bg-gray-100 rounded-lg text-[#2176ff] hover:bg-[#E4F2FF] hover:text-[#2176FF]"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <MdOutlinePermMedia />
        </button>
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        {(message.length > 0 || selectedImage) && (
          <button
            onClick={handleSendMessage}
            className={`ml-2  px-3 relative bg-gray-100 rounded-lg hover:bg-[#E4F2FF] hover:text-[#2176FF] `}
          >
            <MdSend />
          </button>
        )}
      </div>
    </div>
  );
}

export default SendMessage;
