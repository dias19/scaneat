import React from 'react';

import { Box } from '@mui/material';

import ordersApi from '~/api/orders/api';

import { OrderCard } from './order-card';

export function ChefOrderPending() {
  const { data: orders = [] } = ordersApi
    .endpoints.getChefOrders.useQuery({ restaurantId: 12, status: 'pending' });

  const [editChefOrder] = ordersApi.endpoints.editChefOrder.useMutation();

  const startOrder = async (id:number) => {
    await editChefOrder({ restaurantId: 12, orderId: id, body: 'processing' });
  };
  return (
    <Box sx={{ m: 2 }}>
      {
     orders.map((order) => (
       <OrderCard
         order={order}
         hasButton
         buttonTitle="В работу"
         onSubmit={() => startOrder(order.id)}
       />
     ))
    }
    </Box>
  );
}
