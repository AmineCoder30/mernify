import { IoMdNotificationsOutline, IoMdArrowDropright } from "react-icons/io";

const ToastMessage = ({ from, text }) => (
  <div className="flex items-center bg-white  gap-3  max-w-md  ">
    <div className="w-14 h-14 bg-gray-100 rounded-lg text-[#2176ff] flex justify-center items-center ">
      <IoMdNotificationsOutline size={28} />
    </div>
    <div className="flex-grow">
      <div className="font-medium text-lg text-[#2176ff]">@{from}</div>
      <div className="text-gray-600 flex">
        <IoMdArrowDropright size={24} color="orange" /> "{text}"
      </div>
    </div>
  </div>
);

export default ToastMessage;
