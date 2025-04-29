import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!sessionId) setMessages([]);

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      let response;

      if (!sessionId) {
        response = await fetch(`${apiUrl}/diagnose_start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symptom_input: input }),
        });
      } else {
        response = await fetch(`${apiUrl}/diagnose_continue`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, answer: input }),
        });
      }

      const data = await response.json();
      if (!sessionId) setSessionId(data.session_id);

      const botMessage = { text: data.message, sender: data.message.startsWith('Fehler') ? 'error' : 'bot' };
      setMessages(prev => [...prev, botMessage]);

      if (data.done || botMessage.sender === 'error') {
        setSessionId(null);
        setMessages(prev => [...prev, { text: "Bitte gib ein neues Symptom ein, um neu zu starten.", sender: 'system' }]);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setSessionId(null);
      setMessages(prev => [...prev, { text: "Serverfehler. Bitte später erneut versuchen.", sender: 'error' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    const welcomeText = "Wuff! Schön, dass du hier bist. Ich helfe dir gern!";
    setMessages([{ text: welcomeText, sender: 'dog' }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-md h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} text={msg.text} sender={msg.sender} />
        ))}
        {loading && (
          <div className="flex justify-start mb-2">
            <div className="px-4 py-2 rounded-lg max-w-xs bg-gray-300 text-gray-800">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="p-2 bg-white border-t flex">
        <input
          type="text"
          className="flex-1 p-3 border rounded-l-full focus:outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Schreib' hier..."
        />
        <button
          className="p-3 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 text-sm"
          onClick={sendMessage}
        >
          Wuff
        </button>
      </div>
    </div>
  );
}

export default Chat;
