import React from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Chat />
      </div>
    </div>
  );
}

export default App;
