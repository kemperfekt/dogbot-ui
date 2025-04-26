import React, { useEffect, useRef } from "react";

import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";

const Chat = () => {
  const { messages, loading } = useGetMessages();

  const lastMessage = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 10);
  }, [messages]);

  return (
    <div
      className="
bg-gray-900 rounded-sm shadow-md overflow-y-scroll scrollbar-track-[#0a1122] scrollbar-thumb-slate-700 scrollbar-thin flex-auto  "
    >
      {messages.map((msg, index) => (
        <div ref={lastMessage} key={index}>
          <Message message={msg} />
        </div>
      ))}
    </div>
  );
};

export default Chat;
