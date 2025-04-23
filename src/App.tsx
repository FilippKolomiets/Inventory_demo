// src/App.tsx

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

  const gridCols = 5;
  const gridRows = 4;

  const boxesOverlap = (
    x1: number, y1: number, w1: number, h1: number,
    x2: number, y2: number, w2: number, h2: number
  ): boolean => {
    if (x1 + w1 <= x2 || x2 + w2 <= x1) return false;
    if (y1 + h1 <= y2 || y2 + h2 <= y1) return false;
    return true;
  };

  const rotateItem = (id: number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const newRot = !item.rotated;
        const newW  = newRot ? item.height : item.width;
        const newH  = newRot ? item.width  : item.height;
        if (
          item.x < 0 ||
          item.y < 0 ||
          item.x + newW > gridCols ||
          item.y + newH > gridRows
        ) {
          return item;
        }
        for (const other of prev) {
          if (other.id === id) continue;
          const ow = other.rotated ? other.height : other.width;
          const oh = other.rotated ? other.width  : other.height;
          if (boxesOverlap(item.x, item.y, newW, newH, other.x, other.y, ow, oh)) {
            return item;
          }
        }
        return { ...item, rotated: newRot };
      })
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
