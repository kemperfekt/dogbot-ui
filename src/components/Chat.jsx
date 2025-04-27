import React, { useState } from 'react';
import MessageBubble from './MessageBubble';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [diagnosisDone, setDiagnosisDone] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (diagnosisDone) {
      setMessages([]);
      setDiagnosisDone(false);
    }

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let response;
      if (!sessionId) {
        response = await fetch('http://localhost:8000/diagnose_start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symptom_input: input }),
        });
      } else {
        response = await fetch('http://localhost:8000/diagnose_continue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, answer: input }),
        });
      }

      const data = await response.json();
      if (!sessionId) {
        setSessionId(data.session_id);
      }

      const botMessage = { text: data.message, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

      if (data.done) {
        setSessionId(null);
        setDiagnosisDone(true);
        setMessages(prev => [...prev, { text: "Diagnosis completed. Please enter a new symptom to start again.", sender: 'system' }]);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md h-[90vh] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} text={msg.text} sender={msg.sender} />
        ))}
        {loading && <MessageBubble text="DogBot is thinking..." sender="bot" />}
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
