import React, { useRef, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

interface InventoryGridProps {
  moveItem: (id: number, x: number, y: number) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ moveItem }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (draggedItem: { id: number }, monitor: DropTargetMonitor) => {
      // Сброс предмета
      const offset = monitor.getClientOffset();
      if (!offset || !gridRef.current) return;
      const gridRect = gridRef.current.getBoundingClientRect();
      const cellSize = 50; 
      const x = Math.floor((offset.x - gridRect.left) / cellSize);
      const y = Math.floor((offset.y - gridRect.top) / cellSize);
      moveItem(draggedItem.id, x, y);
    },
  }));

  const cellSize = 50; 
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
            border: '1px solid #ddd',
            boxSizing: 'border-box',
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
