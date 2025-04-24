import React, { useState, useEffect, useRef } from 'react';
import SlotMachine from './SlotMachine';
import '../styles/ChatUI.css';

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, from: 'human' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      const response = await fetch('http://localhost:8000/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.response, from: 'dog' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Fehler beim Abrufen:', error);
      const botMessage = { text: 'Da ist was schiefgelaufen 🐾', from: 'dog' };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="avatar-container">
        <SlotMachine side="left" isThinking={isThinking} />
      </div>

      <div className="chat-box">
        

        <div className="messages-area">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                msg.from === 'human' ? 'chat-bubble-human' : 'chat-bubble-dog'
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="input-box-container">
          <textarea
            className="input-box"
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Was beschäftigt euch?"
          />
          <button onClick={handleSend}>Wuff</button>
        </div>
      </div>

      <div className="avatar-container">
        <SlotMachine side="right" isThinking={isThinking} />
      </div>
    </div>
  );
}

export default ChatUI;
