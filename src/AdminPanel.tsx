import React from 'react';
import AdminItem from './AdminItem';

const availableItems = [
  { id: 1, name: 'Рюкзак', width: 2, height: 4, rotated: false },
  { id: 2, name: 'Пистолет', width: 1, height: 2, rotated: false },
  { id: 3, name: 'Еда', width: 1, height: 1, rotated: false },
  { id: 4, name: 'Аптечка', width: 2, height: 2, rotated: false },
];

const AdminPanel: React.FC = () => {
  return (
    <div style={{ padding: '10px', border: '1px solid gray', maxHeight: '300px', overflowY: 'scroll' }}>
      <h3>Доступные предметы</h3>
      {availableItems.map(item => (
         <AdminItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AdminPanel;
