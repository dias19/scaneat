import React from 'react';

import { Box } from '@mui/material';

import ordersApi from '~/api/orders/api';

import { OrderCard } from './order-card';

export function ChefOrderInProcess() {
  const { data: orders = [] } = ordersApi
    .endpoints.getChefOrders.useQuery({ restaurantId: 12, status: 'processing' });

  const [editChefOrder] = ordersApi.endpoints.editChefOrder.useMutation();

  const finishOrder = async (id:number) => {
    await editChefOrder({ restaurantId: 12, orderId: id, body: { status: 'ready' } });
  };

  return (
    <Box sx={{ m: 2, bgcolor: '#F4F6F8;' }}>
      {
     orders.map((order) => (
       <OrderCard
         order={order}
         hasButton
         buttonTitle="Готово"
         onSubmit={() => finishOrder(order.id)}
       />
     ))
    }
    </Box>
  );
}
