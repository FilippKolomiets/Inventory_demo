import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EquipmentPanel from './EquipmentPanel';
import CharacterArea from './CharacterArea';
import ActiveItemsPanel from './ActiveItemsPanel';
import AdminPanel from './AdminPanel';
import InventoryGrid from './InventoryGrid';
import DeleteZone from './DeleteZone';
import InventoryItem, { ItemType } from './InventoryItem';

const App: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const rotateItem = (id: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, rotated: !i.rotated } : i))
    );
  };

  const moveItem = (id: number, x: number, y: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, x, y } : i))
    );
  };

  const addItem = (newItem: ItemType) => {
    setItems(prev => [...prev, newItem]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 40 }}>
        <h1>Инвентарь</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
          <div style={{ width: '300px' }}>
            <AdminPanel />
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <EquipmentPanel />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <CharacterArea />
              <ActiveItemsPanel />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <InventoryGrid
                items={items}
                moveItem={moveItem}
                addItem={addItem}
              />
              {items.map(item => (
                <InventoryItem
                  key={item.id}
                  item={item}
                  onRotate={rotateItem}
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
