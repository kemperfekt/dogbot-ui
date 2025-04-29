import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import logo from '../assets/logo-nasenblick-favicon.png';
import Header from './components/Header';


function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!sessionId) {
      setMessages([]);
    }

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
      if (!sessionId) {
        setSessionId(data.session_id);
      }

      const botMessage = {
        text: data.message,
        sender: data.message.startsWith('Fehler') ? 'error' : 'bot',
      };
      setMessages(prev => [...prev, botMessage]);

      if (data.done || botMessage.sender === 'error') {
        setSessionId(null);
        setMessages(prev => [
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
      setMessages(prev => [
        ...prev,
        { text: 'Serverfehler. Bitte später erneut versuchen.', sender: 'error' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    const welcomeText = 'Wuff! Schön, dass du hier bist. Ich helfe dir gern!';
    const welcomeMessage = { text: welcomeText, sender: 'dog' };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col w-full h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
          <div>
            <div className="font-semibold">Nasenblick Pfotenfunk</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Der direkte Draht zu deinem Hund</div>
          </div>
        </div>
        <a href="tel:+491234567890" className="text-blue-500 hover:text-blue-700 text-xl">📞</a>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col-reverse px-4 py-2">
        <div ref={bottomRef} />
        {loading && (
          <div className="flex justify-start mb-2">
            <div className="px-4 py-2 rounded-lg max-w-xs bg-gray-300 text-gray-800">
              <div className="flex space-x-1 animate-pulse">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              </div>
            </div>
          </div>
        )}
        {[...messages].reverse().map((msg, idx) => (
          <MessageBubble key={idx} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      <div className="p-2 border-t flex bg-white dark:bg-gray-800">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-md focus:outline-none break-words"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Schreib' hier..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          Wuff
        </button>
      </div>
    </div>
  );
}

export default Chat;
