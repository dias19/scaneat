import React from 'react';

import { Box, Typography } from '@mui/material';

import { CircularLoader } from '~/components/Circular Loader';

import { useGetOrders } from '../hooks/useGetOrders';
import { useOrderButtonGroup } from '../hooks/useOrderButtonGroup';
import { OrderCard } from './order-card';

type OrdersListProps={
  status: string,
  onSubmit: (id: number) => void,
}

export function OrdersList({ status, onSubmit }:OrdersListProps) {
  const { orders, isLoading, isError } = useGetOrders(status);

  const { hasButtons, buttonTitle } = useOrderButtonGroup(status);

  const isOrdersEmpty = orders.length === 0;

  const isShown = !isLoading && !isError && !isOrdersEmpty;

  const isShownEmpty = !isLoading && !isError && isOrdersEmpty;

  const handleSubmit = (id: number) => {
    onSubmit(id);
  };
  return (
    <Box sx={{ m: 2 }}>
      <CircularLoader isLoading={isLoading} />
      {isShown && (
        <>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              hasButton={hasButtons}
              buttonTitle={buttonTitle}
              onSubmit={() => handleSubmit(order.id)}
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
