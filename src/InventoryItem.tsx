
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export interface ItemType {
  id: number;
  spriteId: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
}

interface InventoryItemProps {
  item: ItemType;
  onRotate: (id: number) => void;
}

const spriteHorizontal: Record<number, string> = {
  101: '/assets/sprite/top_farmer_horiz.png',
  102: '/assets/sprite/top_tactical_horiz.png',
  103: '/assets/sprite/top_warm_horiz.png',
  104: '/assets/sprite/pants_farmer_horiz.png',
  105: '/assets/sprite/pants_tactical_horiz.png',
  106: '/assets/sprite/pants_warm_horiz.png',
  107: '/assets/sprite/gear_unpack_horiz.png',
  108: '/assets/sprite/armor_vest_horiz.png',
  109: '/assets/sprite/backpack_horiz.png',
  110: '/assets/sprite/meat_horiz.png',
  111: '/assets/sprite/tin_of_food_horiz.png',
  112: '/assets/sprite/pack_of_chips_horiz.png',
  113: '/assets/sprite/water_bottle_horiz.png',
  114: '/assets/sprite/cola_horiz.png',
  115: '/assets/sprite/syringe_horiz.png',
  116: '/assets/sprite/pharmacy_horiz.png',
  117: '/assets/sprite/medicines_horiz.png',
  118: '/assets/sprite/axe_horiz.png',
  119: '/assets/sprite/pistol_horiz.png',
  120: '/assets/sprite/kalash_horiz.png',
  121: '/assets/sprite/knife_horiz.png',
  122: '/assets/sprite/machete_horiz.png',
};

const spriteVertical: Record<number, string> = {
  101: '/assets/sprite/top_farmer_vert.png',
  102: '/assets/sprite/top_tactical_vert.png',
  103: '/assets/sprite/top_warm_vert.png',
  104: '/assets/sprite/pants_farmer_vert.png',
  105: '/assets/sprite/pants_tactical_vert.png',
  106: '/assets/sprite/pants_warm_vert.png',
  107: '/assets/sprite/gear_unpack_vert.png',
  108: '/assets/sprite/armor_vest_vert.png',
  109: '/assets/sprite/backpack_vert.png',
  110: '/assets/sprite/meat_vert.png',
  111: '/assets/sprite/tin_of_food_vert.png',
  112: '/assets/sprite/pack_of_chips_vert.png',
  113: '/assets/sprite/water_bottle_vert.png',
  114: '/assets/sprite/cola_vert.png',
  115: '/assets/sprite/syringe_vert.png',
  116: '/assets/sprite/pharmacy_vert.png',
  117: '/assets/sprite/medicines_vert.png',
  118: '/assets/sprite/axe_vert.png',
  119: '/assets/sprite/pistol_vert.png',
  120: '/assets/sprite/kalash_vert.png',
  121: '/assets/sprite/knife_vert.png',
  122: '/assets/sprite/machete_vert.png',
};

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onRotate }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'ITEM',
      item: {
        id: item.id,
        spriteId: item.spriteId,
        width: item.width,
        height: item.height,
        rotated: item.rotated,
        newItem: false,
      },
      collect: m => ({ isDragging: m.isDragging() }),
    }),
    [item]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const ref = useRef<HTMLDivElement>(null);
  drag(ref);

  const [focused, setFocused] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Space') {
        e.preventDefault();
        onRotate(item.id);
      }
    },
    [item.id, onRotate]
  );

  const CELL = 100;
  const wCells = item.rotated ? item.height : item.width;
  const hCells = item.rotated ? item.width  : item.height;
  const w = wCells * CELL;
  const h = hCells * CELL;

  const src = item.rotated
    ? spriteHorizontal[item.spriteId]
    : spriteVertical[item.spriteId];

  let scale = 1;
  if (item.spriteId >= 101 && item.spriteId <= 106) {
    scale = 1.8;
  } else if (item.spriteId === 107) {
    scale = 2.0;
  } else if (item.spriteId === 108) {
    scale = 2.0;
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: item.x * CELL,
        top: item.y * CELL,
        width: w,
        height: h,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        outline: focused ? '2px solid white' : 'none',
        borderRadius: 4,
      }}
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeyDown}
    >
      <img
        src={src}
        alt={item.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
          pointerEvents: 'none',
          userSelect: 'none',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
};

export default InventoryItem;
