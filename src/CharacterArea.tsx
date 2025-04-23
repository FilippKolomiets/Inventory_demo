
import React from 'react';

const CharacterArea: React.FC = () => (
  <div
    style={{
      width: 300,
      height: 500,
      border: '4px solid #000',               
      borderRadius: 4,
      background: 'radial-gradient(circle at center, #d2b48c, #a17a53)',
      boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      imageRendering: 'pixelated',
    }}
  >
    <div
      style={{
        animation: 'pulse 3s infinite ease-in-out',
        fontSize: 24,
        color: 'rgba(0,0,0,0.3)',
        userSelect: 'none',
      }}
    >
      Character Model
    </div>
  </div>
);

export default CharacterArea;
