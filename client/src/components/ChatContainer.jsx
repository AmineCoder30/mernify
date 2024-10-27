import React, { useState, useEffect, useRef } from "react";
import { Contact, Message, SendMessage, ImageContainer } from "../components";
import { FaInfoCircle } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { useSelector } from "react-redux";

function ChatContainer({ setshowContactList, setshowContactInfo }) {
  // State to manage the current message being typed
  const [message, setmessage] = useState("");
  const [laoding, setlaoding] = useState(false);
  // State to manage the selected image for sending
  const [selectedImage, setSelectedImage] = useState(null);

  // Reference to the message container for scrolling
  const messageContainerRef = useRef(null);

  // Get the current conversation from the Redux store
  const { currentConversation } = useSelector((state) => state.conversations);

  // Get the user profile from local storage
  const profile = JSON.parse(localStorage.getItem("profile"));

  // Get the messages from the Redux store
  const { messages } = useSelector((state) => state.messages);

  // Function to format the timestamp of messages
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Function to scroll the message container to the bottom
  const scrollToBottom = () => {
    messageContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll to the bottom whenever messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center  h-full w-full relative   bg-gray-100 ">
      <header className="w-full border-b   p-4 bg-white z-50 text-gray-800  text-center flex justify-between items-center">
        <div>
          <Contact
            name={currentConversation.participants[0].name}
            image={currentConversation.participants[0].profilePic}
          />
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 block md:hidden  p-2 rounded-lg text-xl bg-slate-100 hover:bg-[#E4F2FF] hover:text-[#2176FF]">
            {" "}
            <PiUserListBold onClick={() => setshowContactList(true)} />{" "}
          </button>
          <button className="h-9 w-9 block lg:hidden  p-2 rounded-lg text-xl bg-slate-100 hover:bg-[#E4F2FF] hover:text-[#2176FF]">
            {" "}
            <FaInfoCircle onClick={() => setshowContactInfo(true)} />{" "}
          </button>
        </div>
      </header>
      <main className="flex flex-col w-full flex-1  bg-white  overflow-hidden   ">
        <div className="flex flex-col h-full min-h-[600px] max-h-[600px] p-4 w-full overflow-y-auto  ">
          {/* Chat messages will go here */}
          {messages.length > 0 ? (
            messages.map((message, index) => {
              return (
                <div
                  className={`flex  ${
                    message?.sender?.id !== profile.result._id
                      ? "justify-start"
                      : "justify-end"
                  } mb-4`}
                  ref={messageContainerRef}
                >
                  <Message
                    sender={message?.sender?.name}
                    message={message?.content}
                    time={formatTime(message?.timestamp)}
                    isSender={message?.sender?.id === profile.result._id}
                    profileImage={message?.image}
                    // laoding={laoding}
                    showLoader={
                      laoding &&
                      messages.length === index + 1 &&
                      message?.sender?.id === profile.result._id
                    }
                  />
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="  text-gray-800 font-bold text-2xl">
                No message yet !!
              </h1>
            </div>
          )}
        </div>
        {selectedImage && (
          <ImageContainer
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        )}
      </main>
      <SendMessage
        message={message}
        setmessage={setmessage}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setlaoding={setlaoding}
      />
    </div>
  );
}

export default ChatContainer;
