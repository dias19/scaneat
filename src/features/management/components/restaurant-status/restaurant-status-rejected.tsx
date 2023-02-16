import React from 'react';

import {
  Typography, Card, Box, CardContent, Button,
} from '@mui/material';
import styled from 'styled-components';

import restaurantApi from '~/api/restaurant/api';
import { Image } from '~/components/image';

export function RestaurantStatusRejected() {
  const { data: restaurants = [] } = restaurantApi
    .endpoints.getRestaurantsByStatus.useQuery('rejected');

  const isEmpty = restaurants.length === 0;

  const [verifyRestaurant] = restaurantApi.endpoints.verifyRestaurant.useMutation();

  return (
    <>
      {isEmpty && <Typography> Нету заявок ресторанов</Typography>}
      {!isEmpty && (
      <>
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} sx={{ mb: 2 }}>
            <CardContentStyle>
              <Box display="flex">
                <Image
                  url={restaurant.originalUrl}
                  alt={restaurant.name}
                  style={{ height: 60, width: 60 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2">{restaurant.name}</Typography>
                  <Typography variant="caption" color="grey.600" component="p">
                    {restaurant.address}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={() => verifyRestaurant(restaurant.id)}
                sx={{
                  mt: 1.5,
                  boxShadow: 'none',

                }}
              >
                Принять
              </Button>
            </CardContentStyle>
          </Card>
        ))}
      </>
      )}
    </>
  );
}

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '&:last-child': {
    padding: theme.spacing(1.5),
  },
}));
