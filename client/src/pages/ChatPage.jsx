import React, { useEffect, useState } from "react";
import socket from "../socketio/socket";
import { GET_ONLINE_USERS } from "../constants/actionTypes";
import {
  ContactList,
  ContactInfoSideBar,
  ChatContainer,
  ListOfUsers,
  NoConversation,
  DeleteConversationCard,
} from "../components";
import { useDispatch, useSelector } from "react-redux";

function ChatPage() {
  const dispatch = useDispatch();
  const [showListOfUsers, setshowListOfUsers] = useState(false);
  const [showContactInfo, setshowContactInfo] = useState(false);
  const [showContactList, setshowContactList] = useState(true);
  const [showDeleteConverCard, setshowDeleteConverCard] = useState(false);
  const profile = JSON.parse(localStorage.getItem("profile"));
  const { currentConversation } = useSelector((state) => state.conversations);
  useEffect(() => {
    if (profile?.result?._id) {
      socket.emit("add-user", profile.result._id);
    }
    socket.on("online-users", (data) => {
      dispatch({ type: GET_ONLINE_USERS, payload: data });
    });
  }, [showContactList]);

  return (
    <div className="flex w-full gap-0 overflow-x-hidden">
      <ListOfUsers
        showListOfUsers={showListOfUsers}
        setshowListOfUsers={setshowListOfUsers}
      />
      <ContactList
        setshowListOfUsers={setshowListOfUsers}
        showContactList={showContactList}
        setshowContactList={setshowContactList}
      />

      {currentConversation.participants.length > 0 ? (
        <ChatContainer
          setshowContactList={setshowContactList}
          setshowContactInfo={setshowContactInfo}
        />
      ) : (
        <h1 className="w-full h-screen grid place-content-center">
          <NoConversation />
        </h1>
      )}
      {currentConversation.participants.length > 0 && (
        <ContactInfoSideBar
          setshowContactInfo={setshowContactInfo}
          showContactInfo={showContactInfo}
          setshowDeleteConverCard={setshowDeleteConverCard}
        />
      )}
      <DeleteConversationCard
        showDeleteConverCard={showDeleteConverCard}
        setshowDeleteConverCard={setshowDeleteConverCard}
      />
    </div>
  );
}

export default ChatPage;
