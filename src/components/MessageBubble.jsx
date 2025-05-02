// src/components/MessageBubble.jsx

import React from 'react';

function MessageBubble({ text, sender }) {
  const isUser = sender === 'user';
  const isError = sender === 'error';
  const isDogOrBot = sender === 'dog' || sender === 'bot';
  const isTyping = sender === 'typing';
  const isCoach = sender === 'coach';
  const isMentor = sender === 'mentor';

  // Emojis für die jeweiligen Sender
  const label = isUser
    ? '👣'
    : isDogOrBot || isTyping
    ? '🐾'
    : isError
    ? '⚠️'
    : isCoach
    ? '🚀'  // Emoji für den Coach
    : isMentor
    ? '🔮'  // Emoji für den Mentor
    : '';

  // Style für das Emoji
  const labelStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '9999px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: isUser ? '#bfdbfe' : '#dbeafe',
    marginLeft: isUser ? '8px' : '0',
    marginRight: !isUser ? '8px' : '0',
  };

  // Style für die Message Bubble
  const bubbleStyle = {
    padding: '8px 12px',
    borderRadius: '16px',
    maxWidth: '80%',
    fontSize: '0.875rem',
    wordBreak: 'break-word',
    backgroundColor: isUser
      ? '#3b82f6'
      : isError
      ? '#ef4444'
      : '#f3f4f6',
    color: isUser || isError ? '#fff' : '#111827',
    border: !isUser && !isError ? '1px solid #e5e7eb' : 'none',
  };

  return (
    <div
      className="message-row"
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        marginBottom: '8px',
        padding: '0 12px',
      }}
    >
      {!isUser && (
        <div style={labelStyle}>
          <span>{label}</span>
        </div>
      )}
      {isTyping ? (
        <div
          style={{
            ...bubbleStyle,
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            minHeight: '2.25rem', // gleiche Höhe wie Text mit Großbuchstabe
          }}
        >
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      ) : (
        <div style={bubbleStyle}>
          {text}
        </div>
      )}
      {isUser && (
        <div style={labelStyle}>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
