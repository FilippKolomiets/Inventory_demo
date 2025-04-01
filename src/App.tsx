import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import InventoryGrid from './InventoryGrid';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 20 }}>
        <h1>Инвентарь</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {/*персо */}
          <div
            style={{
              width: '300px',
              height: '400px',
              border: '2px dashed gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Pers
          </div>
          {/*Инвентарь */}
          <InventoryGrid />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
