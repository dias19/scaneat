import React from 'react';

import {
  Box, styled, Typography,
} from '@mui/material';

import restaurantsApi from '~/api/restaurant/api';
import { CircularLoader } from '~/components/Circular Loader';

import { RestaurantCard } from './restaurant-card';

export function RestaurantsList() {
  const { data: restaurants = [], isLoading, isError } = restaurantsApi
    .endpoints.getRestaurants.useQuery('accepted');

  return (
    <>
      <CircularLoader isLoading={isLoading} />
      {(!isLoading && !isError)
     && (
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
     )}
    </>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));
