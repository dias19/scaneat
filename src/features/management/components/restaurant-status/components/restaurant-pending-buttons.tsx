import React from 'react';

import { Box, Button, styled } from '@mui/material';

import restaurantApi from '~/api/restaurant/api';

type RestaurantPendingButtonsProps={
    restaurantId: number
}
export default function RestaurantPendingButtons({ restaurantId }:RestaurantPendingButtonsProps) {
  const [verifyRestaurant] = restaurantApi.endpoints.verifyRestaurant.useMutation();

  const [rejectRestaurant] = restaurantApi.endpoints.verifyRestaurant.useMutation();

  const handleVerify = async () => {
    await verifyRestaurant(restaurantId);
  };

  const handleReject = async () => {
    await rejectRestaurant(restaurantId);
  };

  return (
    <BoxStyle>
      <Button
        variant="contained"
        size="small"
        color="error"
        sx={{ boxShadow: 'none' }}
        onClick={handleVerify}
      >
        Отклонить
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={handleReject}
      >
        Подтвердить
      </Button>
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1.5),
}));
