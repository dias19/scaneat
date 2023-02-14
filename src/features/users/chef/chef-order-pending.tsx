import React from 'react';

import { Box } from '@mui/material';

import { OrderCard } from './order-card';

export function ChefOrderPending() {
  const orders = [
    {
      user: 'Kainar Masujima',
      date: '12.02.23 18:36',
      order:
      'Заказ: Карааге 2 штук, Бургер 3 штук, Курица в белом соусе 1 штук, Пицца пеперони 1 штук ..',
      price: '20000',
    },
    {
      user: 'Kainar Masujima',
      date: '12.02.23 18:36',
      order:
      'Заказ: Карааге 2 штук, Бургер 3 штук, Курица в белом соусе 1 штук, Пицца пеперони 1 штук ..',
      price: '20000',
    },
  ];
  return (
    <Box sx={{ m: 2 }}>
      {
     orders.map((order) => (
       <OrderCard
         order={order}
         hasButton
         buttonTitle="В работу"
         onSubmit={() => console.log('done')}
       />
     ))
    }
    </Box>
  );
}
