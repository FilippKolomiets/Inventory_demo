import React from 'react';

const CharacterArea: React.FC = () => {
  return (
    <div
      style={{
        width: '300px',
        height: '500px',
        border: '2px dashed gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Character Model
    </div>
  );
};

export default CharacterArea;
