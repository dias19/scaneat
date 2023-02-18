import React from 'react';

import { Button, styled } from '@mui/material';

import restaurantApi from '~/api/restaurant/api';

type RestaurantRejectedButtonProps={
    restaurantId: number,
}

export function RestaurantRejectedButton({ restaurantId }: RestaurantRejectedButtonProps) {
  const [verifyRestaurant] = restaurantApi.endpoints.verifyRestaurant.useMutation();
  return (
    <ButtonStyle
      variant="contained"
      onClick={() => verifyRestaurant(restaurantId)}
    >
      Принять
    </ButtonStyle>
  );
}

const ButtonStyle = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  boxShadow: 'none',
}));
