import React from 'react';

import {
  Box, styled, Typography,
} from '@mui/material';

import restaurantsApi from '~/api/restaurant/api';
import { ManagementLayoutLogo } from '~/layouts/management';

import { RestaurantCard } from './restaurant-card';

export function RestaurantsList() {
  const { data: restaurants = [] } = restaurantsApi
    .endpoints.getRestaurants.useQuery('status=accepted');

  return (
    <ManagementLayoutLogo>
      <BoxStyle>
        <Typography variant="h6" sx={{ marginBottom: 3 }}>
          Мои рестораны
        </Typography>
        <Box display="grid" gap={2}>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </Box>
      </BoxStyle>
    </ManagementLayoutLogo>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
}));
