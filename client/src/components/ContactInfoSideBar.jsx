import React from "react";
import { IoIosNotificationsOff } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdDelete, MdBlock } from "react-icons/md";
import { FileFilter } from "../components";
import { useSelector, useDispatch } from "react-redux";
function ContactInfoSideBar({
  showContactInfo,
  setshowContactInfo,
  setshowDeleteConverCard,
}) {
  const { currentConversation } = useSelector((state) => state.conversations);
  const { onlineUsers } = useSelector((state) => state.auth);

  return (
    <div
      className={`border-l min-w-80 bg-white max-w-80 p-4  h-screen ${
        showContactInfo
          ? " translate-x-0"
          : " -translate-x-[1000px] lg:translate-x-0"
      } absolute lg:sticky z-[10000] right-0 top-0`}
    >
      <div className="flex flex-col border-b items-center  py-6">
        <div className="absolute cursor-pointer left-0 top-0 block lg:hidden bg-slate-50 p-2">
          <RxCross2
            className="font-bold text-2xl"
            onClick={() => setshowContactInfo(false)}
          />
        </div>

        <img
          src={currentConversation.participants[0].profilePic}
          alt="User Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="w-full text-center">
          <h2 className="text-xl font-bold">
            {currentConversation.participants[0].name}
          </h2>
          <p className="text-green-600">
            {onlineUsers.includes(currentConversation.participants[0].userId)
              ? "online"
              : "offline"}
          </p>
        </div>
        <ul className="flex  justify-center gap-4 mt-4">
          <li className="text-gray-800 text-lg cursor-pointer flex flex-col items-center justify-center gap-1">
            <div className="p-3 bg-gray-100  rounded-full hover:bg-[#E4F2FF] hover:text-[#2176FF]">
              <IoIosNotificationsOff />
            </div>
            <p className="text-sm text-gray-900">mute</p>
          </li>
          <li className="text-gray-800 text-lg cursor-pointer flex flex-col items-center justify-center gap-1">
            <div className=" p-3 bg-gray-100  rounded-full hover:bg-[#E4F2FF] hover:text-[#2176FF]">
              <MdDelete onClick={() => setshowDeleteConverCard(true)} />
            </div>
            <p className="text-sm text-gray-900">clear chat</p>
          </li>
          <li className="text-gray-800 text-lg cursor-pointer flex flex-col items-center justify-center gap-1">
            <div className="p-3 bg-gray-100  rounded-full hover:bg-[#E4F2FF] hover:text-[#2176FF]">
              <MdBlock />
            </div>
            <p className="text-sm text-gray-900">Block</p>
          </li>
        </ul>
      </div>
      {/* <div className="p-2 border-b flex justify-between text-gray-900 text-lg font-medium">
        <p className="p-0">costumize chat</p>

        <button className="p-2 bg-gray-100 rounded-lg hover:bg-[#E4F2FF] hover:text-[#2176FF]">
          <FaAngleDown />{" "}
        </button>
      </div> */}
      <div className="p-2">
        <div className="mb-4  flex justify-between text-gray-900 text-lg font-medium">
          <p className="p-0"> Media and Links:</p>

          {/* <button className="p-2 bg-gray-100 rounded-lg hover:bg-[#E4F2FF] hover:text-[#2176FF]">
            <FaAngleDown />{" "}
          </button> */}
        </div>

        <FileFilter />
      </div>
    </div>
  );
}

export default ContactInfoSideBar;
