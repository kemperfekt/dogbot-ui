import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import Header from './Header';
import Footer from './Footer';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [agentStep, setAgentStep] = useState(0); // 0=Hund, 1=Coach, 2=Companion
  const bottomRef = useRef(null);

  // Initialer Begrüßungsaufruf bei Mount
  useEffect(() => {
    const fetchIntro = async () => {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      try {
        const res = await fetch(`${apiUrl}/flow_intro`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data.session_id) setSessionId(data.session_id);
        if (data.messages) setMessages(data.messages);
      } catch (err) {
        console.error('Intro fetch failed:', err);
        setMessages([
          {
            text: 'Willkommen! Leider konnte die Begrüßung nicht geladen werden.',
            sender: 'error',
          },
        ]);
      }
    };

    fetchIntro();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(
        sessionId ? `${apiUrl}/flow_continue` : `${apiUrl}/flow_start`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            sessionId
              ? { session_id: sessionId, answer: input }
              : { symptom: input }
          ),
        }
      );

      const data = await response.json();

      if (!sessionId && data.session_id) {
        setSessionId(data.session_id);
      }

      const newMessages = data.messages || [];
      const nextMessage = newMessages[0]; // nur eine Antwort pro Schritt

      if (nextMessage) {
        setMessages((prev) => [...prev, nextMessage]);
      }

      setAgentStep((prev) => prev + 1);

      if (
        data.done ||
        nextMessage?.sender === 'error' ||
        agentStep >= 3
      ) {
        setSessionId(null);
        setAgentStep(0);
        setMessages((prev) => [
          ...prev,
          { text: 'Bitte gib ein neues Symptom ein, um neu zu starten.', sender: 'system' },
        ]);
      }
    } catch (err) {
      console.error('Error fetching response:', err);
      setSessionId(null);
      setAgentStep(0);
      setMessages((prev) => [
        ...prev,
        { text: 'Serverfehler. Bitte später erneut versuchen.', sender: 'error' },
      ]);
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
        <div style={{ paddingTop: 88, paddingBottom: 88, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column-reverse' }}>
          <div ref={bottomRef} />
          {loading && <MessageBubble text="" sender="typing" />}
          {[...messages].reverse().map((msg, i) => (
            <MessageBubble key={i} text={msg.text} sender={msg.sender} />
          ))}
        </div>
        <Footer input={input} onInputChange={setInput} onKeyDown={handleKeyDown} onSend={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;