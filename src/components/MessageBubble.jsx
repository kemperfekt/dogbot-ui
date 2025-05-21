import React from 'react';
import hundIcon from '../assets/hund_icon_free.png';

function MessageBubble({ text, sender }) {
  // Convert sender to lowercase for consistent comparison
  const senderLower = sender && sender.toLowerCase();
  
  // Check sender types
  const isUser = senderLower === 'user';
  const isError = senderLower === 'error';
  const isDog = senderLower === 'dog';
  const isTyping = senderLower === 'typing';
  const isCoach = senderLower === 'coach';
  const isCompanion = senderLower === 'companion';
  const isSystem = senderLower === 'system';

  // Neue Label-Komponente
  const renderLabel = () => {
    if (isDog || isTyping) {
      return <img src={hundIcon} alt="Hund" className="w-9 h-9 rounded-full" />;
    }

    const label = isUser ? '👣'
      : isError ? '⚠️'
      : isCoach ? '👨🏽‍⚕️'
      : isCompanion ? '🧚🏼'
      : isSystem ? '🔧'
      : '❓';

    return <span>{label}</span>;
  };

  // Tailwind classes for label (emoji)
  const labelStyle = "w-9 h-9 rounded-full text-xl flex items-center justify-center flex-shrink-0" +
    (isUser ? " bg-blue-200 ml-2" : " bg-blue-100 mr-2");

  // Tailwind classes for message bubble
  const bubbleClass = `px-3 py-2 rounded-xl max-w-[80%] text-sm break-words ${
    isUser ? 'bg-primary text-background' :
    isError ? 'bg-red-500 text-white' :
    'bg-gray-100 text-gray-900 border border-gray-200'
  }`;

  return (
    <div
      className="message-row flex items-start mb-2 px-3"
      style={{
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      {!isUser && (
        <div className={labelStyle}>
          {renderLabel()}
        </div>
      )}
      {isTyping ? (
        <div
          className="px-3 py-2 rounded-xl max-w-[80%] text-sm break-words bg-primary text-white flex items-center gap-2 min-h-[32px] z-10"
          aria-label="Antwort wird geschrieben"
        >
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" />
        </div>
      ) : (
        <div className={bubbleClass}>
          {(typeof text === 'string' ? text : '')}
        </div>
      )}
      {isUser && (
        <div className={labelStyle}>
          {renderLabel()}
        </div>
      )}
    </div>
  );
}

export default MessageBubble;