import React, { useRef, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemType } from './InventoryItem';

interface InventoryGridProps {
  moveItem: (id: number, x: number, y: number) => void;
  addItem: (item: ItemType) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ moveItem, addItem }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: ['ITEM', 'NEW_ITEM'],
    drop: (draggedItem: any, monitor: DropTargetMonitor) => {
      const offset = monitor.getClientOffset();
      if (!offset || !gridRef.current) return;
      const gridRect = gridRef.current.getBoundingClientRect();
      const cellSize = 100; 
      const x = Math.floor((offset.x - gridRect.left) / cellSize);
      const y = Math.floor((offset.y - gridRect.top) / cellSize);
      if (draggedItem.newItem) {
        const newItem: ItemType = {
          id: Date.now(),
          name: draggedItem.name,
          x,
          y,
          width: draggedItem.width,
          height: draggedItem.height,
          rotated: draggedItem.rotated,
        };
        addItem(newItem);
      } else {
        moveItem(draggedItem.id, x, y);
      }
    },
  }));

  const cellSize = 100; 
  const columns = 5;
  const rows = 4;

  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      cells.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: 'absolute',
            left: x * cellSize,
            top: y * cellSize,
            width: cellSize,
            height: cellSize,
            boxSizing: 'border-box',
            backgroundImage: `url('/assets/cell.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%', 
            imageRendering: 'pixelated'
          }}
        />
      );
    }
  }

  useEffect(() => {
    if (gridRef.current) {
      drop(gridRef.current);
    }
  }, [drop]);

  return (
    <div
      id="inventory-grid"
      ref={gridRef}
      style={{
        position: 'relative',
        width: columns * cellSize,
        height: rows * cellSize,
        border: '2px solid black',
      }}
    >
      {cells}
    </div>
  );
};

export default InventoryGrid;
