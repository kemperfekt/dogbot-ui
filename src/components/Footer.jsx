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
    <div className="bg-[#FBEED5] text-[#184567] px-4 py-2 border-t border-[#ddd]">
      <div className="flex items-end gap-2">
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
      <div className="text-xs mt-2 w-full text-center space-x-4">
        <a href="/public/datenschutz.html" className="underline hover:text-[#10304f]">Datenschutz</a>
        <a href="/public/impressum.html" className="underline hover:text-[#10304f]">Impressum</a>
      </div>
    </div>
  );
}

export default Footer;
