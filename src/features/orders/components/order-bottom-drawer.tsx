import React from 'react';

import {
  Box, Button, Stack, Typography,
} from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';

import { Order } from '../type';

type OrderBottomDrawerProps = {
  order: Order;
  open: boolean;
  setOpen: (state: boolean) => void;
  hasButtons?: boolean;
  buttonTitle?: string;
  handleSubmit?: () => void;
};

export function OrderBottomDrawer({
  order,
  open,
  setOpen,
  hasButtons,
  buttonTitle,
  handleSubmit,
}: OrderBottomDrawerProps) {
  const onSubmit = () => {
    handleSubmit?.();
    setOpen(false);
  };

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
          <Typography variant="body2">{order.createdAt}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Итого</Typography>
          <Typography variant="body2">{order.total}</Typography>
        </Box>
      </Stack>
      {hasButtons && (
        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: 1,
          }}
        >
          <Button variant="outlined" size="large" onClick={() => setOpen(false)}>
            Назад
          </Button>
          <Button variant="contained" size="large" onClick={onSubmit}>
            {buttonTitle}
          </Button>
        </Box>
      )}
    </BottomDrawer>
  );
}
