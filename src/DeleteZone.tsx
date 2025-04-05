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
        height: '100px',
        width: '500px',
        backgroundImage: `url('/assets/buttons.svg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
        filter: isOver ? 'brightness(1.2)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

    </div>
  );
};

export default DeleteZone;
