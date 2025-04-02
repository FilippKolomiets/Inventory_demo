import React from 'react';
import { useDrop } from 'react-dnd';

const InventoryGrid: React.FC = () => {
  const [, drop] = useDrop({
    accept: 'ITEM',
    drop: (item, monitor) => {
      // Сброс предмета
    },
  });

  const cellSize = 60;
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

  const dropRef = (node: HTMLDivElement | null) => {
    drop(node);
  };

  return (
    <div
      id="inventory-grid"
      ref={dropRef}
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
