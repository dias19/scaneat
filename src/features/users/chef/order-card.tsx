import React from 'react';

import {
  Box, Button, Card, CardActionArea, CardContent, styled, Typography,
} from '@mui/material';

import { Order } from '../type';

type OrderCardProps = {
  order: Order;
  hasButton: boolean;
  buttonTitle?: string;
  onSubmit: VoidFunction;
};

export function OrderCard({
  order, hasButton, buttonTitle, onSubmit,
}: OrderCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea>
        <CardContentStyle>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle2">{order.user}</Typography>
            <Typography variant="caption" color="grey.600">{order.date}</Typography>
          </Box>
          <Typography variant="body2" color="grey.600" sx={{ mt: 0.5 }}>{order.order}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Итого:
            {' '}
            {order.price}
            {' '}
            тг
          </Typography>
          {
            hasButton
            && (
            <Box alignSelf="end">
              <Button variant="contained" size="small" onClick={onSubmit} sx={{ px: 6 }}>
                {buttonTitle}
              </Button>
            </Box>
            )
          }
        </CardContentStyle>
      </CardActionArea>
    </Card>
  );
}

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));
