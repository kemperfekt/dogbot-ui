// Header.jsx
import React from 'react';
import { Phone, Github } from 'lucide-react';

function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
        <div>
          <div className="font-semibold text-lg">Nasenblick Pfotenfunk</div>
          <div className="text-sm text-gray-500">Der direkte Draht zu deinem Hund.</div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="https://github.com/kemperfekt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-gray-500 hover:text-black"
        >
          <Github size={20} />
        </a>
        <a
          href="tel:+491713022065"
          className="text-blue-500 hover:text-blue-700"
          aria-label="Anrufen"
        >
          <Phone size={20} />
        </a>
      </div>
    </div>
  );
}

export default Header;
