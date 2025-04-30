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
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const res = await fetch(
        `${apiUrl}/${sessionId ? 'diagnose_continue' : 'diagnose_start'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            sessionId
              ? { session_id: sessionId, answer: input }
              : { symptom_input: input }
          ),
        }
      );
      const data = await res.json();
      if (!sessionId) setSessionId(data.session_id);

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
    } catch (err) {
      console.error('Error fetching response:', err);
      setSessionId(null);
      setMessages(prev => [
        ...prev,
        { text: 'Serverfehler. Bitte später erneut versuchen.', sender: 'error' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex justify-center bg-gray-100 text-black min-h-[100dvh] overflow-x-hidden">
      <div className="flex flex-col w-full max-w-screen-xl bg-white">
        <Header />
        <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col-reverse">
          <div ref={bottomRef} />
          {loading && (
            <div className="flex justify-start mb-2 px-4">
              <div className="flex px-4 py-2 rounded-2xl max-w-[80%] bg-gray-200 justify-center">
                <div className="typing-indicator flex items-center gap-1">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
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
