import React from 'react';

import {
  Box, Stack, styled, Typography,
} from '@mui/material';
import moment from 'moment';

import { BottomDrawer } from '~/components/bottom-drawer';

import { Order } from '../type';

type OrderBottomDrawerProps = {
  order: Order;
  open: boolean;
  setOpen: (state: boolean) => void;
  hasButton?: boolean;
  children?: React.ReactNode;
};

export function OrderBottomDrawer({
  order,
  open,
  setOpen,
  hasButton,
  children,
}: OrderBottomDrawerProps) {
  return (
    <BottomDrawer
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      hasCloser
      title={`Заказ #${order.id}`}
    >
      <Stack spacing={0.5}>
        {order.products.map((product) => (
          <Box display="flex" justifyContent="space-between" key={`order-details-${product.name}`}>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">{product.price}</Typography>
          </Box>
        ))}
      </Stack>
      <Stack sx={{ mt: 2 }} spacing={0.5}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Время</Typography>
          <Typography variant="body2">
            {moment(order.createdAt).format('HH:mm, DD.MM.YYYY')}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Итого</Typography>
          <Typography variant="body2">{order.total}</Typography>
        </Box>
      </Stack>
      {hasButton && <BoxButtonStyle>{children}</BoxButtonStyle>}
    </BottomDrawer>
  );
}

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
}));
