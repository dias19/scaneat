import React from 'react';

import { Box, Typography } from '@mui/material';

import ordersApi from '~/api/orders/api';
import { CircularLoader } from '~/components/Circular Loader';

import { OrderCard } from './order-card';

export function ChefOrderDone() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = ordersApi.endpoints.getChefOrders.useQuery({ restaurantId: 12, status: 'ready' });

  const isOrdersEmpty = orders.length === 0;

  const isShown = !isLoading && !isError && !isOrdersEmpty;

  const isShownEmpty = !isLoading && !isError && isOrdersEmpty;

  return (
    <Box sx={{ m: 2, bgcolor: '#F4F6F8;' }}>
      <CircularLoader isLoading={isLoading} />
      {isShown && (
        <>
          {orders.map((order) => (
            <OrderCard
              order={order}
              hasButton={false}
            />
          ))}
        </>
      )}
      {
        isShownEmpty && (
          <Typography align="center">
            Нету выполненных заказов
          </Typography>
        )
      }
    </Box>
  );
}
