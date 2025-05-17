import React from 'react';
import { Phone, Github } from 'lucide-react';

function Header() {
  return (
    <div className="header-fixed" style={{ top: 0 }}>
      <div className="header-inner">
        <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, gap: '0.5rem', flexGrow: 1, overflow: 'hidden' }}>
          <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40, borderRadius: '9999px', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Nasenblick Wuffchat</span>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Der direkte Draht zu deinem Hund.
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
