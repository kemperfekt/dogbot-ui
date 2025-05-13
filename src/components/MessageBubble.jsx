import React from 'react';

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

  // Determine emoji label based on sender type
  const label = (() => {
    if (isUser) return '👣';
    if (isError) return '⚠️';
    if (isCoach) return '👨🏽‍⚕️';
    if (isCompanion) return '🧚🏼';
    if (isTyping) return '🐶';
    if (isDog) return '🐶';
    if (isSystem) return '🔧';
    return '❓'; // Fallback for unknown sender types
  })();

  // Style für das Emoji (kleinerer Hintergrund)
  const labelStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '9999px',
    fontSize: '1.5rem',
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
          {(typeof text === 'string' ? text : '')}
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