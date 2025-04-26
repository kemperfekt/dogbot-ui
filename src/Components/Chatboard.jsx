import React, { useEffect } from "react";
import useConversation from "../zustand store/useConversation";
import MessageInput from "./MessageInput";
import SelectUserPrompt from "./SelectUserPrompt";
import Chat from "./Chat";

const Chatboard = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return !selectedConversation ? (
    <SelectUserPrompt />
  ) : (
    <div className="flex flex-col  pt-2 bg-gray-800 h-screen ">
      <div className="text-gray-300 font-semibold mb-4 ml-4 text-lg">
        {`To: ${selectedConversation.name}`}
      </div>
      <Chat />
      <MessageInput />
    </div>
  );
};

export default Chatboard;
