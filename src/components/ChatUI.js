// === ChatUI.js ===
import React, { useState, useEffect, useRef } from "react";

function ChatUI({ userImage, dogImage, setIsThinking }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "human" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("https://dein-agent-url.com/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      const botMessage = { text: data.response || "Keine Antwort", sender: "dog" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Fehler beim Abrufen der Antwort.", sender: "dog" },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="avatar-container">
        <img src={userImage} alt="User" />
      </div>

      <div className="chat-box">
        <div className="messages-area">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble chat-bubble-${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="input-box-container">
          <textarea
            className="input-box"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Was möchtest du deinem Hund sagen?"
          />
          <button onClick={sendMessage}>Wuff</button>
        </div>
      </div>

      <div className="avatar-container">
        <img src={dogImage} alt="Dog" />
      </div>
    </div>
  );
}

export default ChatUI;