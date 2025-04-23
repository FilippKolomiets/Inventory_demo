import React from 'react';

const ActiveItemsPanel: React.FC = () => {
  const count = 3;
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            width: 60, height: 60,
            backgroundColor: '#e3c08f',
            border: '2px solid #000',
            borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Jersey', fontSize: 12,
          }}
        >
          Актив {i + 1}
        </div>
      ))}
    </div>
  );
};

export default ActiveItemsPanel;
