import React from 'react';

import {
  Box, Button, Card, CardContent, styled, Typography,
} from '@mui/material';

import restaurantApi from '~/api/restaurant/api';
import { API_THUMBNAIL } from '~/config';

export function RestaurantStatusPending() {
  const { data: restaurants = [] } = restaurantApi
    .endpoints.getRestaurants.useQuery('status=pending');

  const [verifyRestaurant] = restaurantApi.endpoints.verifyRestaurant.useMutation();

  const [rejectRestaurant] = restaurantApi.endpoints.rejectRestaurant.useMutation();

  const isEmpty = restaurants.length === 0;

  return (
    <>
      {isEmpty && <Typography> Нету заявок ресторанов</Typography>}
      {!isEmpty && (
        <Box>
          {restaurants.map((restaurant) => (
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box display="flex">
                  <ImageStyle src={API_THUMBNAIL + restaurant.originalUrl} alt="Something" />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2">{restaurant.name}</Typography>
                    <Typography variant="caption" color="grey.600" component="p">
                      {restaurant.address}
                    </Typography>
                  </Box>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} sx={{ mt: 1.5 }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    sx={{ boxShadow: 'none' }}
                    onClick={async () => {
                      await rejectRestaurant(restaurant.id);
                    }}
                  >
                    Отклонить
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={async () => {
                      await verifyRestaurant(restaurant.id);
                    }}
                  >
                    Подтвердить
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
const ImageStyle = styled('img')(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: 8,
  marginRight: theme.spacing(2),
}));
