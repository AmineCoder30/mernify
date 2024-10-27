import React from "react";

import Loader from "./Loader";
function Message({ message, time, profileImage, isSender, showLoader }) {
  return (
    <div>
      <div
        className={`flex items-start ${
          !isSender ? "flex-row" : "flex-row-reverse"
        } gap-2`}
      >
        <div
          className={` max-w-80 min-w-24  rounded-lg px-2 pt-3 ${
            !isSender
              ? "bg-[#2176FF] text-white isNot  "
              : "bg-[#e4f2ff] text-gray-900 isSender  "
          } `}
        >
          <p className="w-full">{message}</p>
          {profileImage && (
            <div className=" w-60 relative ">
              {showLoader ? (
                <div className="absolute bg-transparent inset-0 flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                ""
              )}
              <img
                src={profileImage}
                alt="iamge"
                className={`w-full object-cover mb-1 rounded-md  ${
                  showLoader ? "blur-[2px]" : ""
                }  `}
              />
            </div>
          )}
          {/* info */}
          <span
            className={`w-full  font-light text-xs block  ${
              isSender
                ? "text-right text-[#b8b8b8] "
                : "text-left text-[#d6d6d6] "
            }`}
          >
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Message;
