import React from 'react';

function MessageBubble({ text, sender }) {
  const isUser = sender === 'user';
  const isError = sender === 'error';
  const isDogOrBot = sender === 'dog' || sender === 'bot';
  const isTyping = sender === 'typing';
  const isCoach = sender === 'coach';

  // Emojis für die jeweiligen Sender
  const label = isUser
    ? '👣'
    : isDogOrBot || isTyping
    ? '🐶'
    : isError
    ? '⚠️'
    : isCoach
    ? '👨🏽‍⚕️'
    : '';

  // Style für das Emoji (kleinerer Hintergrund)
  const labelStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '9999px',
    fontSize: '1.25rem',
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
            minHeight: '2.25rem',
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
