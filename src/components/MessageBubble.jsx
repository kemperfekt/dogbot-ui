import React from 'react';

function MessageBubble({ text, sender }) {
  const isUser = sender === 'user';
  const isError = sender === 'error';
  const isDog = sender === 'dog'; // <<< NEU: explizit Hund erkennen
  const label = isUser ? '👤' : isError ? '⚠️' : isDog ? '🐾' : '🐕';
  const labelClass = sender === 'bot' || isDog ? 'animate-pulse' : '';

  let bubbleStyle = 'px-4 py-2 rounded-lg max-w-xs';
  if (isUser) {
    bubbleStyle += ' bg-blue-500 text-white';
  } else if (isError) {
    bubbleStyle += ' bg-red-500 text-white';
  } else {
    bubbleStyle += ' bg-gray-300 text-gray-800';
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start mb-2`}>
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-sm flex items-center justify-center mr-2">
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
