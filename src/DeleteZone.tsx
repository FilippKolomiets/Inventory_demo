import React, { useRef, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

interface DeleteZoneProps {
  onDelete: (id: number) => void;
}

const DeleteZone: React.FC<DeleteZoneProps> = ({ onDelete }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (draggedItem: { id: number }) => {
      onDelete(draggedItem.id);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const dropRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <div
      ref={dropRef}
      style={{
        height: '50px',
        width: '100%',
        backgroundColor: isOver ? '#ff4d4d' : '#cc0000',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
      }}
    >
      Перетащите сюда для удаления
    </div>
  );
};

export default DeleteZone;
