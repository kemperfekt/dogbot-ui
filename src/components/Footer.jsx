import React, { useRef, useEffect } from 'react';

function Footer({ input, onInputChange, onKeyDown, onSend, inputRef }) {
  const textareaRef = useRef(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 128) + 'px';
    }
  };

  useEffect(() => {
    autoResize();
  }, [input]);

  return (
    <div className="footer-fixed" style={{ bottom: 0 }}>
      <div className="footer-inner">
        <textarea
          ref={(el) => {
            textareaRef.current = el;
            if (inputRef) inputRef.current = el;
          }}
          rows={1}
          inputMode="text"
          value={input}
          onChange={(e) => {
            onInputChange(e.target.value);
            autoResize();
          }}
          onKeyDown={onKeyDown}
          placeholder="Schreib' hier..."
          style={{ fontSize: '16px' }}
        />
        <button type="button" onClick={onSend}>
          Wuff
        </button>
      </div>
    </div>
  );
}

export default Footer;
