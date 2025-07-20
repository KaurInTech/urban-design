// components/SearchInput.jsx
import React, { useRef, useEffect } from 'react';

export default function SearchInput({ onSubmit, message }) {
  const inputRef = useRef();

  useEffect(() => {
    if (message && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [message]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Ask something like: show residential buildings with 10+ levels"
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          zIndex: 10,
          width: '60%',
          backgroundColor: '#fff',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && typeof onSubmit === 'function') {
            onSubmit(e.target.value);
          }
        }}
      />
      {message && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: message.type === 'success' ? '#f0fff4' : '#fff1f0',
            border: message.type === 'success' ? '1px solid #52c41a' : '1px solid #ff4d4f',
            color: message.type === 'success' ? '#237804' : '#a8071a',
            padding: '6px 12px',
            borderRadius: '5px',
            zIndex: 11,
            fontSize: '14px',
          }}
        >
          {message.text}
        </div>
      )}
    </>
  );
}
