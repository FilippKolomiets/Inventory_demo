import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EquipmentPanel from './EquipmentPanel';
import CharacterArea from './CharacterArea';
import ActiveItemsPanel from './ActiveItemsPanel';
import InventoryGrid from './InventoryGrid';
import DeleteZone from './DeleteZone';
import InventoryItem, { ItemType } from './InventoryItem';

const App: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([
    { id: 1, name: 'Рюкзак', x: 0, y: 0, width: 2, height: 4, rotated: false },
    { id: 2, name: 'Пистолет', x: 3, y: 0, width: 1, height: 2, rotated: false },
  ]);

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const rotateItem = (id: number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, rotated: !item.rotated } : item))
    );
  };

  const useItem = (id: number) => {
    alert(`Используем предмет ${id}`);
  };

  const moveItem = (id: number, x: number, y: number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, x, y } : item))
    );
  };

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
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 'auto'
            }}
          >
            <div style={{ position: 'relative' }}>
              <InventoryGrid moveItem={moveItem} />
              {items.map(item => (
                <InventoryItem
                  key={item.id}
                  item={item}
                  onDelete={deleteItem}
                  onRotate={rotateItem}
                  onUse={useItem}
                />
              ))}
            </div>
            <DeleteZone onDelete={deleteItem} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
