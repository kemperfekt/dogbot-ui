import React from 'react';
import { Phone, Github } from 'lucide-react';

function Header() {
  return (
    <div className="w-full border-b bg-white fixed top-0 z-10">
      <div className="max-w-screen-md mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <span className="font-bold text-lg">Nasenblick Pfotenfunk</span>
            <span className="text-xs text-gray-500">Der direkte Draht zu deinem Hund.</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/kemperfekt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="text-gray-600 hover:text-black" size={22} />
          </a>
          <a href="tel:+491713022065" aria-label="Anrufen">
            <Phone className="text-blue-500 hover:text-blue-700" size={22} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
