import React from 'react';

function MessageBubble({ text, sender }) {
  const isUser = sender === 'user';
  const isError = sender === 'error';
  const isDog = sender === 'dog';
  const label = isUser ? '👤' : isError ? '⚠️' : isDog ? '🐾' : '🐕';
  const labelClass = sender === 'bot' || isDog ? 'animate-pulse' : '';

  let bubbleStyle = 'px-4 py-2 rounded-2xl max-w-[80%] text-sm';
  if (isUser) {
    bubbleStyle += ' bg-blue-500 text-white';
  } else if (isError) {
    bubbleStyle += ' bg-red-500 text-white';
  } else {
    bubbleStyle += ' bg-white text-gray-800 border';
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start mb-2`}>
      {!isUser && (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-xs flex items-center justify-center mr-2">
          <span className={labelClass}>{label}</span>
        </div>
      )}
      <div className={bubbleStyle}>
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;
