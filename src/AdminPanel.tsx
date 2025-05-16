import React from 'react';
import AdminItem from './AdminItem';
import { ItemType } from './InventoryItem';

type AdminItemType = Omit<ItemType, 'x' | 'y'>;

const availableItems: AdminItemType[] = [
  { id: 101, spriteId: 101, name: 'Верх: фермерский',    width: 2, height: 2, rotated: false },
  { id: 102, spriteId: 102, name: 'Верх: тактический',   width: 2, height: 2, rotated: false },
  { id: 103, spriteId: 103, name: 'Верх: тёплый',        width: 2, height: 2, rotated: false },
  { id: 104, spriteId: 104, name: 'Штаны: фермерские',   width: 2, height: 2, rotated: false },
  { id: 105, spriteId: 105, name: 'Штаны: тактические',  width: 2, height: 2, rotated: false },
  { id: 106, spriteId: 106, name: 'Штаны: тёплые',       width: 2, height: 2, rotated: false },
  { id: 107, spriteId: 107, name: 'Аксессуар: разгрузка', width: 1, height: 1, rotated: false },
  { id: 108, spriteId: 108, name: 'Аксессуар: бронежилет', width: 1, height: 1, rotated: false },
  { id: 109, spriteId: 109, name: 'Аксессуар: рюкзак',    width: 4, height: 2, rotated: false },
  { id: 110, spriteId: 110, name: 'Еда: мясо',           width: 1, height: 1, rotated: false },
  { id: 111, spriteId: 111, name: 'Еда: консервная банка', width: 1, height: 1, rotated: false },
  { id: 112, spriteId: 112, name: 'Еда: пачка чипсов',   width: 1, height: 1, rotated: false },
  { id: 113, spriteId: 113, name: 'Вода: бутылка воды',  width: 1, height: 1, rotated: false },
  { id: 114, spriteId: 114, name: 'Вода: кола',          width: 1, height: 1, rotated: false },
  { id: 115, spriteId: 115, name: 'Медицина: укол адреналина', width: 1, height: 1, rotated: false },
  { id: 116, spriteId: 116, name: 'Медицина: большая аптечка', width: 2, height: 2, rotated: false },
  { id: 117, spriteId: 117, name: 'Медицина: таблетки парацетамола', width: 1, height: 1, rotated: false },
  { id: 118, spriteId: 118, name: 'Оружие: топорик',       width: 1, height: 2, rotated: false },
  { id: 119, spriteId: 119, name: 'Оружие: пистолет',    width: 2, height: 1, rotated: false },
  { id: 120, spriteId: 120, name: 'Оружие: автомат калашникова', width: 2, height: 4, rotated: false },
  { id: 121, spriteId: 121, name: 'Оружие: нож',         width: 1, height: 1, rotated: false },
  { id: 122, spriteId: 122, name: 'Оружие: мачете',      width: 1, height: 2, rotated: false },
];

const AdminPanel: React.FC = () => (
  <div style={{ padding: '10px', border: '1px solid gray', maxHeight: '300px', overflowY: 'scroll' }}>
    <h3>Доступные предметы</h3>
    {availableItems.map(item => (
      <AdminItem key={item.id} item={item} />
    ))}
  </div>
);

export default AdminPanel;
