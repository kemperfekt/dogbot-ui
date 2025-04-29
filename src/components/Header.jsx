import React from 'react';
import { Phone } from 'lucide-react';

function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
        <div>
          <div className="font-semibold text-base">Nasenblick Pfotenfunk</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Direkter Draht zu deinem Hund</div>
        </div>
      </div>
      <a
        href="tel:+491713022065"
        className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
        aria-label="Anrufen"
      >
        <Phone size={20} />
      </a>
    </div>
  );
}

export default Header;
