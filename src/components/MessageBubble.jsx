import React from 'react';

function MessageBubble({ text, sender }) {
  const isUser = sender === 'user';
  const isError = sender === 'error';
  const label = isUser ? '👤' : isError ? '⚠️' : '🐕';
  const labelClass = sender === 'bot' ? 'animate-pulse' : '';

  let bubbleStyle = 'px-4 py-2 rounded-lg max-w-xs';
  if (isUser) {
    bubbleStyle += ' bg-blue-500 text-white';
  } else if (isError) {
    bubbleStyle += ' bg-red-500 text-white';
  } else {
    bubbleStyle += ' bg-gray-300 text-gray-800';
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={bubbleStyle}>
        <div className={`text-sm mb-1 ${labelClass}`}>{label}</div>
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;
