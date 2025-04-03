import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

export interface ItemType {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
}

interface InventoryItemProps {
  item: ItemType;
  onDelete: (id: number) => void;
  onRotate: (id: number) => void;
  onUse: (id: number) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onDelete, onRotate, onUse }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const itemRef = useRef<HTMLDivElement>(null);

  drag(itemRef);

  const itemStyle: React.CSSProperties = {
    position: 'absolute',
    left: item.x * 50,  
    top: item.y * 50,   
    width: item.rotated ? item.height * 50 : item.width * 50, 
    height: item.rotated ? item.width * 50 : item.height * 50, 
    opacity: isDragging ? 0.5 : 1,
    border: '1px solid black',
    backgroundColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <div ref={itemRef} style={itemStyle}>
      <div style={{ textAlign: 'center' }}>{item.name}</div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={() => onDelete(item.id)}>Delete</button>
        <button onClick={() => onRotate(item.id)}>Rotate</button>
        <button onClick={() => onUse(item.id)}>use</button>
      </div>
    </div>
  );
};

export default InventoryItem;
