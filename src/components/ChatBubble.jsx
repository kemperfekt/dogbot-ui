// src/components/ChatBubble.jsx
const ChatBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2 px-2`}>
      <div className={`px-4 py-2 rounded-2xl max-w-xs break-words ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
