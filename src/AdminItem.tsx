import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from './InventoryItem';

interface AdminItemProps {
  item: Omit<ItemType, 'x' | 'y' | 'id'>;
}

const AdminItem: React.FC<AdminItemProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NEW_ITEM',
    item: { ...item, newItem: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node: HTMLDivElement | null) => {
        drag(node);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid black',
        padding: '5px',
        margin: '5px',
        cursor: 'move',
      }}
    >
      {item.name}
    </div>
  );
};

export default AdminItem;
