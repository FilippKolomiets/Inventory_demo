import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EquipmentPanel from './EquipmentPanel';
import CharacterArea from './CharacterArea';
import ActiveItemsPanel from './ActiveItemsPanel';
import InventoryGrid from './InventoryGrid';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 20 }}>
        <h1>Инввентарь</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* ячейки для экипировки */}
          <EquipmentPanel />
          {/* область персонажа и активных вещей */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <CharacterArea />
            <ActiveItemsPanel />
          </div>
          {/*  инвентарь */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <InventoryGrid />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
