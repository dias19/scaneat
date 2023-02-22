import React from 'react';

import {
  Box, Container, styled, Typography,
} from '@mui/material';

import restaurantsApi from '~/api/restaurant/api';
import { CircularLoader } from '~/components/Circular Loader';
import { useResponsive } from '~/hooks/useResponsive';

import { RestaurantCard } from './restaurant-card';

export function RestaurantsList() {
  const { data: restaurants = [], isLoading, isError } = restaurantsApi
    .endpoints.getRestaurants.useQuery();

  const isDesktop = useResponsive('up', 'sm');

  const isShownMobile = !isLoading && !isError && !isDesktop;

  const isShownDesktop = !isLoading && !isError && isDesktop;
  return (
    <>
      <CircularLoader isLoading={isLoading} />
      {isShownMobile
     && (
     <BoxStyle>
       <Typography variant="h6" sx={{ marginBottom: 3 }}>
         Мои рестораны
       </Typography>
       <BoxRestaurantStyle>
         {restaurants.map((restaurant) => (
           <RestaurantCard key={restaurant.id} restaurant={restaurant} />
         ))}
       </BoxRestaurantStyle>
     </BoxStyle>
     )}
      {isShownDesktop
     && (
     <Container>
       <Typography sx={{ mt: 8, mb: 5 }} variant="subtitle1">
         Мои рестораны
       </Typography>
       <BoxRestaurantStyle>
         {restaurants.map((restaurant) => (
           <RestaurantCard key={restaurant.id} restaurant={restaurant} />
         ))}
       </BoxRestaurantStyle>
     </Container>
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

const BoxRestaurantStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));
