import React, { useRef, useEffect } from 'react';

function Footer({ input, onInputChange, onKeyDown, onSend }) {
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
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t">
      <div className="w-full max-w-screen-xl mx-auto flex items-end gap-2 px-4 py-2">
        <textarea
          ref={textareaRef}
          rows={1}
          className="flex-1 p-2 border rounded-md resize-none focus:outline-none text-base text-black overflow-auto max-h-32"
          value={input}
          onChange={e => {
            onInputChange(e.target.value);
            autoResize();
          }}
          onInput={autoResize}
          onKeyDown={onKeyDown}
          placeholder="Schreib' hier..."
        />
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex-shrink-0"
          onClick={onSend}
        >
          Wuff
        </button>
      </div>
    </div>
  );
}

export default Footer;
