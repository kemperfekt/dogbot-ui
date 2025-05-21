import React from 'react';
import { Phone, Github } from 'lucide-react';
import logo from '../assets/logo_icon.png';

function Header() {
  return (
    <div className="bg-[#456880] text-[#FBEED5] px-4 py-2 shadow-md" style={{ top: 0 }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center min-w-0 gap-2 flex-grow overflow-hidden">
          <img src={logo} alt="Logo" style={{ width: 40, height: 40, flexShrink: 0 }} />
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold text-lg truncate">Wuffchat</span>
            <span className="text-sm text-gray-500 truncate">Der direkte Draht zu deinem Hund.</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/kemperfekt" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={22} color="#4b5563" />
          </a>
          <a href="tel:+491713022065" aria-label="Anrufen">
            <Phone size={22} color="#3b82f6" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
