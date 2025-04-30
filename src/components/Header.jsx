import React from 'react';
import { Phone, Github } from 'lucide-react';

function Header() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-10 bg-white border-b"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="px-4 py-2 md:px-8 md:py-3 max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 min-w-0 overflow-hidden">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex flex-col truncate">
            <span className="font-bold text-lg truncate">
              Nasenblick Pfotenfunk
            </span>
            <span className="text-xs text-gray-500 truncate">
              Der direkte Draht zu deinem Hund.
            </span>
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
