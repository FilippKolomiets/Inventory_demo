import React, { useRef, useCallback, useState } from 'react';
import { useDrag } from 'react-dnd';

export interface ItemType {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
  useSound?: string;
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

  const [showOverlay, setShowOverlay] = useState(false);

  const handleDoubleClick = useCallback(() => {
    setShowOverlay(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Space') {
        e.preventDefault();
        onRotate(item.id);
        setShowOverlay(false);
      }
    },
    [item.id, onRotate]
  );

  const playSound = useCallback((url: string) => {
    const audio = new Audio(url);
    audio.play().catch(err => console.error(err));
  }, []);

  const getUseSound = useCallback((): string => {
    switch (item.name) {
      case 'Пистолет':
        return '/assets/sounds/zaryajennyiy-dlya-strelbyi-pistolet.mp3';
      case 'Аптечка':
        return '/assets/sounds/shelest-parashyutnoy-tkani-pri-raskryitii.mp3';
      case 'Вода':
        return '/assets/sounds/gulp.mp3';
      case 'Рюкзак':
        return '/assets/sounds/vstryahivanie-odejdyi-36071.mp3';
      case 'Еда':
        return '/assets/sounds/chewing.mp3';
      default:
        return '/assets/sounds/default.mp3';
    }
  }, [item.name]);

  const itemStyle: React.CSSProperties = {
    position: 'absolute',
    left: item.x * 100,
    top: item.y * 100,
    width: item.rotated ? item.height * 100 : item.width * 100,
    height: item.rotated ? item.width * 100 : item.height * 100,
    opacity: isDragging ? 0.5 : 1,
    border: '1px solid black',
    backgroundColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    cursor: 'move',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '100%',
    marginLeft: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '5px',
    border: '1px solid black',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  };

  return (
    <div
      ref={itemRef}
      style={itemStyle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onDoubleClick={handleDoubleClick}
      onMouseDown={() => itemRef.current?.focus()}
    >
      <div style={{ textAlign: 'center' }}>{item.name}</div>
      {showOverlay && (
        <div style={overlayStyle}>
          <button
            onClick={() => {
              playSound(getUseSound());
              onUse(item.id);
              setShowOverlay(false);
            }}
            style={{ color: 'black' }}
          >
            Use
          </button>
          <button
            onClick={() => {
              onRotate(item.id);
              setShowOverlay(false);
            }}
            style={{ color: 'black' }}
          >
            Rotate
          </button>
          <button
            onClick={() => {
              onDelete(item.id);
              setShowOverlay(false);
            }}
            style={{ color: 'black' }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryItem;
