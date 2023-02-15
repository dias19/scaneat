import React from 'react';

import {
  Box, Button, Card, styled, Typography,
} from '@mui/material';

import { Order, ProductsSelected } from '../type';

type OrderCardProps = {
  order: Order;
  hasButton: boolean;
  buttonTitle?: string;
  onSubmit?: VoidFunction;
};

export function OrderCard({
  order, hasButton, buttonTitle, onSubmit,
}: OrderCardProps) {
  function CheckForLastIndex(index: number, products: ProductsSelected[]) {
    return index !== products.length - 1;
  }
  return (
    <CardStyle>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2">Someone</Typography>
        <Typography variant="caption" color="grey.600">
          Somedate
        </Typography>
      </Box>
      <Typography variant="body2" color="grey.600" sx={{ mt: 0.5 }}>
        {order.products.map((product, index, products) => (
          <Typography variant="caption" key={product.name}>
            {product.name}
            {' '}
            {product.quantity}
            {CheckForLastIndex(index, products) ? ' штук, ' : ' штук'}
          </Typography>
        ))}
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
          <Button variant="contained" size="small" onClick={onSubmit} sx={{ px: 6 }}>
            {buttonTitle}
          </Button>
        </Box>
      )}
    </CardStyle>
  );
}

const CardStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
