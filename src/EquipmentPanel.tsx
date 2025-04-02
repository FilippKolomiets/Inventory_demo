import React from 'react';

const EquipmentPanel: React.FC = () => {
  const equipmentSlots = ['Верхняя одежда', 'Штаны', 'Аксессуары'];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100px'
      }}
    >
      {equipmentSlots.map((slot, index) => (
        <div
          key={index}
          style={{
            height: '60px',
            border: '2px solid gray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {slot}
        </div>
      ))}
    </div>
  );
};

export default EquipmentPanel;
