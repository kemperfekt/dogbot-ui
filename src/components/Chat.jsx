import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");

    // Hier kannst du später den Hund antworten lassen
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "dog", text: "Wuff! 🐾" }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-muted text-foreground">
      {/* Chatverlauf */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-3 rounded-2xl ${
              msg.from === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-secondary text-secondary-foreground"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Eingabefeld */}
      <div className="p-4 bg-background flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-3 rounded-xl bg-muted text-foreground placeholder-muted-foreground focus:outline-none"
          placeholder="Nachricht an deinen Hund..."
        />
        <button
          onClick={handleSend}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:bg-primary/80"
        >
          Senden
        </button>
      </div>
    </div>
  );
}
