import React, { useRef, useState, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemType } from './InventoryItem';

interface InventoryGridProps {
  items: ItemType[];            
  moveItem: (id: number, x: number, y: number) => void;
  addItem: (item: ItemType) => void;
}

interface HoverRect {
  x: number;
  y: number;
  w: number;
  h: number;
  invalid: boolean;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ items, moveItem, addItem }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoverRect, setHoverRect] = useState<HoverRect | null>(null);

  const columns = 5;
  const rows    = 4;
  const CELL    = 100;

  function boxesOverlap(
    x1: number, y1: number, w1: number, h1: number,
    x2: number, y2: number, w2: number, h2: number
  ): boolean {
    if (x1 + w1 <= x2 || x2 + w2 <= x1) return false;
    if (y1 + h1 <= y2 || y2 + h2 <= y1) return false;
    return true;
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['ITEM', 'NEW_ITEM'],
      collect: m => ({ isOver: m.isOver({ shallow: true }) }),
      hover: (dragged: any, monitor: DropTargetMonitor) => {
        if (!gridRef.current) return;
        const off = monitor.getClientOffset(); if (!off) return;
        const { left, top } = gridRef.current.getBoundingClientRect();
        const x = Math.floor((off.x - left) / CELL);
        const y = Math.floor((off.y - top) / CELL);
        const w = dragged.rotated ? dragged.height : dragged.width;
        const h = dragged.rotated ? dragged.width  : dragged.height;

        let invalid =
          x < 0 || y < 0 ||
          x + w > columns ||
          y + h > rows;

        if (!invalid) {
          for (const it of items) {
            if (!dragged.newItem && it.id === dragged.id) continue;
            const iw = it.rotated ? it.height : it.width;
            const ih = it.rotated ? it.width  : it.height;
            if (boxesOverlap(x, y, w, h, it.x, it.y, iw, ih)) {
              invalid = true;
              break;
            }
          }
        }

        setHoverRect({ x, y, w, h, invalid });
      },
      drop: (dragged: any, monitor: DropTargetMonitor) => {
        if (!gridRef.current) return;
        const off = monitor.getClientOffset(); if (!off) return;
        const { left, top } = gridRef.current.getBoundingClientRect();
        const x = Math.floor((off.x - left) / CELL);
        const y = Math.floor((off.y - top) / CELL);
        const w = dragged.rotated ? dragged.height : dragged.width;
        const h = dragged.rotated ? dragged.width  : dragged.height;

        if (x < 0 || y < 0 || x + w > columns || y + h > rows || (hoverRect && hoverRect.invalid)) {
          setHoverRect(null);
          return;
        }

        if (dragged.newItem) {
          addItem({
            id:       Date.now(),       
            spriteId: dragged.id,       
            name:     dragged.name,
            x, y,
            width:    dragged.width,
            height:   dragged.height,
            rotated:  dragged.rotated,
          });
        } else {
          moveItem(dragged.id, x, y);
        }
        setHoverRect(null);
      },
    }),
    [items, addItem, moveItem, hoverRect]
  );


  useEffect(() => {
    if (!isOver) setHoverRect(null);
  }, [isOver]);


  const cells: React.ReactElement[] = [];
  for (let yy = 0; yy < rows; yy++) {
    for (let xx = 0; xx < columns; xx++) {
      cells.push(
        <div key={`${xx}-${yy}`}
          style={{
            position: 'absolute',
            left: xx * CELL, top: yy * CELL,
            width: CELL, height: CELL,
            boxSizing: 'border-box',
            backgroundImage: `url('/assets/cell.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            imageRendering: 'pixelated',
          }}
        />
      );
    }
  }

  return (
    <div
      id="inventory-grid"
      ref={node => { gridRef.current = node; drop(node as Element); }}
      style={{
        position: 'relative',
        width: columns * CELL,
        height: rows    * CELL,
        border: '2px solid black',
      }}
    >
      {cells}

      {hoverRect && (
        <div
          style={{
            position: 'absolute',
            left: hoverRect.x * CELL,
            top:  hoverRect.y * CELL,
            width: hoverRect.w * CELL,
            height: hoverRect.h * CELL,
            border: `3px solid ${hoverRect.invalid ? 'red' : 'white'}`,
            borderRadius: 8,
            pointerEvents: 'none',
            boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  );
};

export default InventoryGrid;
