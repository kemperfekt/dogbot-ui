import React from 'react';

function MessageBubble({ text, sender }) {
  const isUser = sender === 'user';
  const label = isUser ? '👤' : '🐕';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
        <div className="text-sm mb-1">{label}</div>
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;
