import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPenToSquare,
  faEllipsis,
  faRightFromBracket,
  faMagnifyingGlass,
  // faSpinnerThird,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import useGetConversations from "../hooks/useGetConversations";
import Users from "./Users";
import SearchComponent from "./Sidebar/SearchComponent";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Chatlists = () => {
  let navigate = useNavigate();

  const { loading, conversations } = useGetConversations();
  // console.log(conversations);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <>
      <div className=" bg-gray-700 h-full">
        {/* Chats Bar */}
        <div className="chats-bar flex justify-around items-center space-x-6 text-white p-2">
          {/* Three Bars */}
          <div className="hover:bg-gray-600 rounded-lg h-7 w-7 flex justify-center items-center">
            <FontAwesomeIcon icon={faBars} />
          </div>

          {/*Chats  */}
          <div className="font-semibold text-lg">Chats</div>
          {/* Edit */}
          <div
            className="hover:bg-gray-600 rounded-lg h-7 w-7 flex justify-center items-center "
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
          {/* Three dots */}
          <div className="hover:bg-gray-600 rounded-lg h-7 w-7 flex justify-center items-center">
            {" "}
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>

        <SearchComponent />
        {/* Users */}
        <div className="bg-gray-700 rounded-lg shadow-md overflow-y-scroll mt-2 max-h-[34rem] scrollbar scrollbar-track-[#0a1122] scrollbar-thumb-slate-700">
          {conversations.map((conversation) => (
            <Users key={conversation._id} conversation={conversation} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Chatlists;
