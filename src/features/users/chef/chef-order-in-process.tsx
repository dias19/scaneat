import React from 'react';

import { Box, Typography } from '@mui/material';

import ordersApi from '~/api/orders/api';
import { CircularLoader } from '~/components/Circular Loader';

import { OrderCard } from './order-card';

export function ChefOrderInProcess() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = ordersApi.endpoints.getChefOrders.useQuery({ restaurantId: 12, status: 'processing' });

  const [editChefOrder] = ordersApi.endpoints.editChefOrder.useMutation();

  const finishOrder = async (id: number) => {
    await editChefOrder({ restaurantId: 12, orderId: id, body: { status: 'ready' } });
  };

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
              hasButton
              buttonTitle="Готово"
              onSubmit={() => finishOrder(order.id)}
            />
          ))}
        </>
      )}
      {
        isShownEmpty && (
          <Typography align="center">
            Нету выполняемых заказов
          </Typography>
        )
      }
    </Box>
  );
}
