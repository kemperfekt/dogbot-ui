// src/components/MessageInput.jsx
import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState(""); // Eingabetext-Zustand

  const handleSubmit = (e) => {
    e.preventDefault(); // Verhindert Seiten-Reload
    onSend(text); // Text an Elternkomponente übergeben
    setText(""); // Eingabefeld leeren
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex border-t">
      <input
        className="flex-1 border rounded-l px-4 py-2 focus:outline-none"
        type="text"
        placeholder="Nachricht eingeben..."
        value={text}
        onChange={(e) => setText(e.target.value)} // Eingabe aktualisieren
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
        Senden
      </button>
    </form>
  );
};

export default MessageInput;
