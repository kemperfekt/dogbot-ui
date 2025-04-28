import React, { useEffect, useState } from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [fullMessage, setFullMessage] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await fetch('/api/welcome');
        const data = await response.json();
        setFullMessage(data.message);
      } catch (error) {
        console.error('Fehler beim Laden der Willkommensnachricht:', error);
      }
    };

    fetchWelcomeMessage();
  }, []);

  useEffect(() => {
    if (fullMessage.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedMessage((prev) => prev + fullMessage[index]);
      index++;
      if (index >= fullMessage.length) {
        clearInterval(interval);
      }
    }, 50); // 50ms pro Buchstabe

    return () => clearInterval(interval);
  }, [fullMessage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Begrüßungsnachricht vom Hund */}
      {displayedMessage && (
        <div className="flex items-start space-x-2 mb-6">
          <span className="text-2xl animate-pulse">🐾</span>
          <div className="bg-white rounded-xl p-4 shadow min-h-[50px] w-full max-w-md">
            {displayedMessage}
          </div>
        </div>
      )}

      {/* Dein bestehender Chat */}
      <Chat />
    </div>
  );
}

export default App;
