import React from 'react';

import { Box, Typography } from '@mui/material';

import ordersApi from '~/api/orders/api';
import { CircularLoader } from '~/components/Circular Loader';

import { OrderCard } from './order-card';

export function ChefOrderPending() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = ordersApi.endpoints.getChefOrders.useQuery({ restaurantId: 12, status: 'pending' });

  const [editChefOrder] = ordersApi.endpoints.editChefOrder.useMutation();

  const startOrder = async (id: number) => {
    await editChefOrder({ restaurantId: 12, orderId: id, body: { status: 'processing' } });
  };

  const isOrdersEmpty = orders.length === 0;

  const isShown = !isLoading && !isError && !isOrdersEmpty;

  const isShownEmpty = !isLoading && !isError && isOrdersEmpty;

  return (
    <Box sx={{ m: 2 }}>
      <CircularLoader isLoading={isLoading} />
      {isShown && (
        <>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              hasButton
              buttonTitle="В работу"
              onSubmit={() => startOrder(order.id)}
            />
          ))}
        </>
      )}
      {
        isShownEmpty && (
          <Typography align="center">
            Нету новых заказов
          </Typography>
        )
      }
    </Box>
  );
}
