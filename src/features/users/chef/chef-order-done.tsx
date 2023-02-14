import React from 'react';

import { Box } from '@mui/material';

import ordersApi from '~/api/orders/api';

import { OrderCard } from './order-card';

export function ChefOrderDone() {
  const { data: orders = [] } = ordersApi
    .endpoints.getChefOrders.useQuery({ restaurantId: 12, status: 'done' });
  return (
    <Box sx={{ m: 2, bgcolor: '#F4F6F8;' }}>
      {
     orders.map((order) => (
       <OrderCard
         order={order}
         hasButton={false}
         onSubmit={() => console.log('done')}
       />
     ))
    }
    </Box>
  );
}
