import React from 'react';

import {
  Box, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import restaurantsApi from '~/api/restaurant/api';
import { ManagementLayoutLogo } from '~/layouts/management';
import { PATH_PAGE } from '~/routes/paths';

import { RestaurantCard } from './restaurant-card';

export function RestaurantsList() {
  const navigate = useNavigate();
  const { data: restaurants = [], isError, isLoading } = restaurantsApi
    .endpoints.getRestaurants.useQuery('status=accepted');
  if (isError) {
    navigate(PATH_PAGE.page500);
  }
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
