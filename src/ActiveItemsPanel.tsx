import React from 'react';

const ActiveItemsPanel: React.FC = () => {
  const activeSlots = Array(3).fill(null);
  const slotWidth = 60;
  const slotHeight = 60;
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {activeSlots.map((_, index) => (
        <div
          key={index}
          style={{
            width: slotWidth,
            height: slotHeight,
            border: '2px solid blue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {`Актив ${index + 1}`}
        </div>
      ))}
    </div>
  );
};

export default ActiveItemsPanel;
