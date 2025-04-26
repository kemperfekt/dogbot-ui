import React, { useEffect } from "react";
import useConversation from "../zustand store/useConversation";
import { jwtDecode } from "jwt-decode";
import useListenMessages from "../hooks/useListenMessages";
import formatTimestamp from "../utils/formatTimestamp";

const Message = ({ message }) => {
  useListenMessages();

  const authToken = localStorage.getItem("token");
  let userId;

  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken);
      userId = decodedToken.user.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("No authentication token found.");
  }

  const fromMe = message.senderId === userId;

  return (
    <>
      <div
        className={`flex flex-col ${
          fromMe ? "items-end mr-6" : "items-start ml-6"
        } my-3`}
      >
        <div
          className={`max-w-xs md:max-w-md lg:max-w-lg  p-2 rounded-lg ${
            fromMe ? "bg-blue-600" : "bg-violet-800"
          } text-white`}
        >
          <p>{message.message}</p>
        </div>
        <p className="mt-1 text-gray-400 text-xs">
          {formatTimestamp(message.createdAt)}
        </p>
      </div>
    </>
  );
};

export default Message;
