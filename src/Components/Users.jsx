import React from "react";
import useConversation from "../zustand store/useConversation";
import { useSocketContext } from "../context/SocketContext";

const Users = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex items-center p-4 hover:bg-blue-800 cursor-pointer border-b border-t border-gray-300 ${
          isSelected ? "bg-blue-800" : ""
        }
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <img
          src={conversation.profilePic}
          alt={`${conversation.name}'s avatar`}
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-4">
          <p className="text-gray-100 font-medium">{conversation.name}</p>
          <p className="text-gray-300 text-sm">{conversation.email}</p>
        </div>
      </div>
    </>
  );
};

export default Users;
