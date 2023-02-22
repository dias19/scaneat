import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import { CircularLoader } from '~/components/Circular Loader';
import { HEADER } from '~/layouts/management/constants';

import { useGetOrders } from '../hooks/useGetOrders';
import { useOrderButtonGroup } from '../hooks/useOrderButtonGroup';
import { OrderCard } from './order-card';

type OrdersListProps={
  status: string,
  onSubmit: (id: number) => void,
  restaurantId: number,
}

export function OrdersList({ status, onSubmit, restaurantId }:OrdersListProps) {
  const { orders, isLoading, isError } = useGetOrders(status, restaurantId);

  const { hasButtons, buttonTitle } = useOrderButtonGroup(status);

  const isOrdersEmpty = orders.length === 0;

  const isShown = !isLoading && !isError && !isOrdersEmpty;

  const isShownEmpty = !isLoading && !isError && isOrdersEmpty;

  const handleSubmit = (id: number) => {
    onSubmit(id);
  };

  return (
    <>
      <CircularLoader isLoading={isLoading} />
      {isShown && (
        <BoxStyle>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              hasButton={hasButtons}
              buttonTitle={buttonTitle}
              onSubmit={() => handleSubmit(order.id)}
            />
          ))}
        </BoxStyle>
      )}
      {
        isShownEmpty && (
          <BoxStyle>
            <Typography align="center">
              Нету новых заказов
            </Typography>
          </BoxStyle>
        )
      }
    </>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: `calc(${HEADER.HEADER_HEIGHT}px + ${theme.spacing(2)})`,
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));
