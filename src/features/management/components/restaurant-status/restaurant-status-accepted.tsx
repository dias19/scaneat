import React from 'react';

import {
  Typography, Box, Card, CardContent, styled,
} from '@mui/material';

import restaurantApi from '~/api/restaurant/api';
import { API_THUMBNAIL } from '~/config';

export function RestaurantStatusAccepted() {
  const { data: restaurants = [] } = restaurantApi
    .endpoints.getRestaurants.useQuery('status=accepted');

  const isEmpty = restaurants.length === 0;
  return (
    <>
      {isEmpty && <Typography> Нету заявок ресторанов</Typography>}
      {!isEmpty && (
      <Box>
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} sx={{ mb: 2 }}>
            <CardContentStyle>
              <Box display="flex">
                <ImageStyle src={API_THUMBNAIL + restaurant.originalUrl} alt="Something" />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2">{restaurant.name}</Typography>
                  <Typography variant="caption" color="grey.600" component="p">
                    {restaurant.address}
                  </Typography>
                </Box>
              </Box>
            </CardContentStyle>
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

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '&:last-child': {
    padding: theme.spacing(1.5),
  },
}));
