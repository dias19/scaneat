import React, { useState } from 'react';

import {
  Box, Button, Card, CardActionArea, CardContent, styled, Typography,
} from '@mui/material';
import moment from 'moment';

import { Order } from '../type';
import { OrderActionButtons } from './order-action-buttons';
import { OrderBottomDrawer } from './order-bottom-drawer';

type OrderCardProps = {
  order: Order;
  hasButton: boolean;
  buttonTitle?: string;
  onSubmit?: VoidFunction;
};

export function OrderCard({
  order, hasButton, buttonTitle, onSubmit,
}: OrderCardProps) {
  const [disableRipple, setDisableRipple] = useState(false);

  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setDisableRipple(true);
    onSubmit?.();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const productDetails = order.products
    .map((product) => `${product.name} ${product.quantity} штук`)
    .join(', ');

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardActionArea onClick={handleOpen} disableRipple={disableRipple}>
          <CardContentStyle>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">{order.user.name}</Typography>
              <Typography variant="caption" color="grey.600">
                {moment(order.createdAt).format('DD.MM.YYYY, HH:mm')}
              </Typography>
            </Box>
            <Typography variant="body2" color="grey.600" sx={{ mt: 0.5 }}>
              <Typography variant="caption">{productDetails}</Typography>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Итого:
              {' '}
              {order.total}
              {' '}
              тг
            </Typography>
            {hasButton && (
              <Box alignSelf="end">
                <Button variant="contained" size="small" onClick={handleSubmit} sx={{ px: 6 }}>
                  {buttonTitle}
                </Button>
              </Box>
            )}
          </CardContentStyle>
        </CardActionArea>
      </Card>
      <OrderBottomDrawer open={open} setOpen={setOpen} order={order} hasButton={hasButton}>
        <OrderActionButtons
          onClose={handleClose}
          onOpen={handleOpen}
          buttonTitle={buttonTitle}
          onSubmit={onSubmit}
        />
      </OrderBottomDrawer>
    </>
  );
}

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));
