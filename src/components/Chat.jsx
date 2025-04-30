import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import Header from './Header';
import Footer from './Footer';

function Chat() {
  const [messages, setMessages] = useState([
    {
      text: 'Wuff! Schön, dass du hier bist. Beschreibe ein Verhalten und ich erkläre es Dir!',
      sender: 'dog',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!sessionId) setSessionId(null);

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/${sessionId ? 'diagnose_continue' : 'diagnose_start'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionId ? { session_id: sessionId, answer: input } : { symptom_input: input }),
      });

      const data = await response.json();
      if (!sessionId) setSessionId(data.session_id);

      const botMessage = {
        text: data.message,
        sender: data.message.startsWith('Fehler') ? 'error' : 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);

      if (data.done || botMessage.sender === 'error') {
        setSessionId(null);
        setMessages((prev) => [
          ...prev,
          {
            text: 'Bitte gib ein neues Symptom ein, um neu zu starten.',
            sender: 'system',
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setSessionId(null);
      setMessages((prev) => [...prev, { text: 'Serverfehler. Bitte später erneut versuchen.', sender: 'error' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <Header />
        <div
          style={{
            paddingTop: '72px',
            paddingBottom: '88px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <div ref={bottomRef} />
          {loading && (
            <div style={{ display: 'flex', padding: '0.5rem 1rem' }}>
              <div className="typing-indicator" style={{ display: 'flex', gap: '4px' }}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          {[...messages].reverse().map((msg, idx) => (
            <MessageBubble key={idx} text={msg.text} sender={msg.sender} />
          ))}
        </div>
        <Footer
          input={input}
          onInputChange={setInput}
          onKeyDown={handleKeyDown}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
