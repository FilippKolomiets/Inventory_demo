import React from 'react';

const slots = ['Верхняя одежда', 'Штаны', 'Аксессуары'];

const EquipmentPanel: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    {slots.map((label, idx) => (
      <div
        key={idx}
        style={{
          width: 120, height: 60,
          backgroundColor: '#e3c08f',  
          border: '2px solid #000',    
          borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Jersey', fontSize: 14,
        }}
      >
        {label}
      </div>
    ))}
  </div>
);

export default EquipmentPanel;
