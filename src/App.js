// ------------------------------------------
// DogBot Mobile Chat - React Frontend (App.js)
// ------------------------------------------
// Aufgaben:
// - Chatverlauf mit sanfter Einblendung neuer Nachrichten
// - Symptom senden und Rückfragen beantworten
// - Ladeanimation während GPT denkt (pulsierende Punkte)

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // für Animationen!
import './App.css'; // unser Stylesheet
import avatarHund from './assets/images/avatar_hund.png';
import avatarMensch from './assets/images/avatar_mensch.png';


function App() {
  // -------------------
  // State-Management
  // -------------------
  const [messages, setMessages] = useState([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const bottomRef = useRef(null); // für Scrollen ans Ende

  // -------------------
  // Scrollt automatisch zum Ende
  // -------------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // -------------------
  // Diagnose starten
  // -------------------
  async function startDiagnosis() {
    setLoading(true);

    const response = await fetch('http://localhost:8000/diagnose_start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptom_input: symptomInput }),
    });

    const data = await response.json();
    setSessionId(data.session_id);

    // erste Begrüßung + erste Rückfrage
    setMessages([
      { sender: 'dogbot', text: 'Okay, ich helfe dir. Lass uns anfangen!' },
      { sender: 'dogbot', text: data.message },
    ]);

    setLoading(false);
  }

  // -------------------
  // Antwort senden
  // -------------------
  async function sendAnswer() {
    setLoading(true);

    // Nutzerantwort zur Liste hinzufügen
    setMessages((prev) => [...prev, { sender: 'user', text: answerInput }]);

    const response = await fetch('http://localhost:8000/diagnose_continue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, answer: answerInput }),
    });

    const data = await response.json();

    // Antwort von DogBot ergänzen
    setMessages((prev) => [...prev, { sender: 'dogbot', text: data.message }]);
    setAnswerInput('');
    setIsDone(data.done);
    setLoading(false);
  }

  return (
    <div className="app-container">
      <h1>DogBot 🐶💬</h1>

      {/* ------------------- */}
      {/* Chatverlauf          */}
      {/* ------------------- */}
      <div className="chat-container">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`message ${msg.sender}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={msg.sender === 'dogbot' ? avatarHund : avatarMensch}
              alt={msg.sender === 'dogbot' ? 'Hund' : 'Mensch'}
              className="avatar"
            />
            <div className="bubble">{msg.text}</div>
          </motion.div>
        ))}

        {/* Ladeanimation während GPT denkt */}
        {loading && (
          <div className="message dogbot">
            <div className="avatar dog">🐶</div>
            <div className="bubble loading">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        {/* Scrollziel */}
        <div ref={bottomRef}></div>
      </div>

      {/* ------------------- */}
      {/* Eingabebereich       */}
      {/* ------------------- */}
      {!sessionId ? (
        <div className="input-container">
          <textarea
            placeholder="Beschreibe hier dein Symptom..."
            value={symptomInput}
            onChange={(e) => setSymptomInput(e.target.value)}
          />
          <button onClick={startDiagnosis} disabled={!symptomInput}>
            Wuff!
          </button>
        </div>
      ) : !isDone ? (
        <div className="input-container">
          <input
            placeholder="Deine Antwort..."
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
          />
          <button onClick={sendAnswer} disabled={!answerInput}>
            Antwort absenden
          </button>
        </div>
      ) : (
        <div className="input-container">
          <p>🎉 Fertig! Danke für deine Antworten!</p>
        </div>
      )}
    </div>
  );
}

export default App;
