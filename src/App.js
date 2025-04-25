import { useState } from 'react';

function App() {
  const [symptomInput, setSymptomInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  async function startDiagnosis() {
    setLoading(true);
    setIsDone(false);

    const response = await fetch('http://localhost:8000/diagnose_start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptom_input: symptomInput }),
    });

    const data = await response.json();
    setSessionId(data.session_id);
    setCurrentMessage(data.message);
    setLoading(false);
  }

  async function sendAnswer() {
    setLoading(true);

    const response = await fetch('http://localhost:8000/diagnose_continue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId, answer: answerInput }),
    });

    const data = await response.json();
    setCurrentMessage(data.message);
    setIsDone(data.done);
    setAnswerInput('');
    setLoading(false);
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>DogBot 🐾</h1>

      {loading ? (
        <div>
          {/* Hier läuft deine Slotmachine! */}
          <p>DogBot denkt nach...</p>
          {/* Slotmachine-Animation könnte hier eingebettet sein */}
        </div>
      ) : (
        <>
          {!sessionId && (
            <>
              <textarea
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder="Beschreibe hier das Symptom..."
                rows="4"
                cols="50"
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <button onClick={startDiagnosis}>Wuff!</button>
            </>
          )}

          {sessionId && !isDone && (
            <>
              <h2>Frage:</h2>
              <p>{currentMessage}</p>
              <input
                type="text"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                placeholder="Deine Antwort..."
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <button onClick={sendAnswer}>Antwort absenden</button>
            </>
          )}

          {isDone && (
            <>
              <h2>Diagnose:</h2>
              <p>{currentMessage}</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
