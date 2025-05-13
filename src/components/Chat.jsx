import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import Header from './Header';
import Footer from './Footer';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const bottomRef = useRef(null);

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
        if (data.messages) {
          // Don't normalize sender to lowercase, keep original value
          setMessages(data.messages);
        }
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
      const url = !hasStarted ? `${apiUrl}/flow_start` : `${apiUrl}/flow_continue`;
      const body = !hasStarted
        ? JSON.stringify({ symptom: input, session_id: sessionId })
        : JSON.stringify({ session_id: sessionId, answer: input });

      console.log("📨 Sende Nachricht an:", url);
      console.log("📨 Payload:", body);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      console.log('Fetch response:', response);
      console.log('Status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (!sessionId && data.session_id) {
        setSessionId(data.session_id);
      }

      if (!hasStarted) {
        setHasStarted(true);
      }

      const newMessages = data.messages || [];
      console.log('🔍 New messages:', newMessages);
      if (newMessages.length > 0) {
        let delay = 0;
        const readingSpeed = 100;

        newMessages.forEach((msg) => {
          const textLength = msg.text?.length || 0;
          const baseDelayMs = Math.max(textLength * (1000 / readingSpeed), 1000);

          setTimeout(() => {
            setMessages((prev) => [...prev, msg]);
          }, delay);

          delay += baseDelayMs;
        });
      }

      if (data.done) {
        setSessionId(null);
        setHasStarted(false);
        setMessages((prev) => [
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
      setHasStarted(false);
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
        <div
          style={{
            paddingTop: 88,
            paddingBottom: 88,
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <div ref={bottomRef} />
          {loading && <MessageBubble text="" sender="typing" />}
          {[...messages].reverse().map((msg, i) => (
            <MessageBubble key={i} text={msg.text} sender={msg.sender} />
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