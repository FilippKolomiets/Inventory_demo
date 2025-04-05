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


  const boxesOverlap = (
    x1: number, y1: number, w1: number, h1: number,
    x2: number, y2: number, w2: number, h2: number
  ): boolean => {
    if (x1 + w1 <= x2 || x2 + w2 <= x1) return false;
    if (y1 + h1 <= y2 || y2 + h2 <= y1) return false;
    return true;
  };

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const rotateItem = (id: number) => {
    setItems(prev => {
      const target = prev.find(item => item.id === id);
      if (!target) return prev;
      const newRotated = !target.rotated;
      const newW = newRotated ? target.height : target.width;
      const newH = newRotated ? target.width : target.height;
      const gridCols = 5;
      const gridRows = 4;
      if (target.x < 0 || target.y < 0 || target.x + newW > gridCols || target.y + newH > gridRows) {
        return prev;
      }
      for (const other of prev) {
        if (other.id === id) continue;
        const ow = other.rotated ? other.height : other.width;
        const oh = other.rotated ? other.width : other.height;
        if (boxesOverlap(target.x, target.y, newW, newH, other.x, other.y, ow, oh)) {
          return prev;
        }
      }
      return prev.map(item => (item.id === id ? { ...item, rotated: newRotated } : item));
    });
  };

  const useItem = (id: number) => {
    alert(`Используем предмет ${id}`);
  };

  const moveItem = (id: number, x: number, y: number) => {
    setItems(prev => {
      const movingItem = prev.find(item => item.id === id);
      if (!movingItem) return prev;
      const w = movingItem.rotated ? movingItem.height : movingItem.width;
      const h = movingItem.rotated ? movingItem.width : movingItem.height;
      const gridCols = 5;
      const gridRows = 4;
      if (x < 0 || y < 0 || x + w > gridCols || y + h > gridRows) {
        return prev;
      }
      for (const other of prev) {
        if (other.id === id) continue;
        const ow = other.rotated ? other.height : other.width;
        const oh = other.rotated ? other.width : other.height;
        if (boxesOverlap(x, y, w, h, other.x, other.y, ow, oh)) {
          return prev;
        }
      }
      return prev.map(item => (item.id === id ? { ...item, x, y } : item));
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 20 }}>
        <h1>Инввентарь</h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {/* ячейки для экипировки */}
          <EquipmentPanel />
          {/* область персонажа и активных вещей */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <CharacterArea />
            <ActiveItemsPanel />
          </div>
          {/*  инвентарь */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
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
