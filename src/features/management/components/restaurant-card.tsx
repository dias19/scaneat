import React from 'react';

import {
  Card, styled, CardMedia, Box, Typography, CardContent, CardActionArea,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Restaurant } from '~/api/restaurant/type';
import { PATH_MANAGEMENT } from '~/routes/paths';

type Props={
   restaurant: Restaurant
}
export function RestaurantCard({
  restaurant,
}:Props) {
  return (
    <Card>
      <CardActionArea component={Link} to={PATH_MANAGEMENT.restaurantDetails(restaurant.slug)}>
        <CardContentStyle>
          <CardMedia
            component="img"
            sx={{
              width: 96, height: 96, borderRadius: 1, mr: 2,
            }}
          // eslint-disable-next-line max-len
            image="http://img1.feinfood.com/upload/hotel2/20200905/11fe752eeeab4f0da1e99d487bb0410c.jpg"
            alt="Live from space album cover"
          />
          <Box>
            <Typography variant="h6">
              {restaurant.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.600' }} component="p">
              {restaurant.address}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1, color: 'grey.600' }} component="p">
              {restaurant.rating}
            </Typography>
          </Box>
        </CardContentStyle>
      </CardActionArea>
    </Card>
  );
}
const CardContentStyle = styled(CardContent)(({ theme }) => ({
  minHeight: 128,
  padding: theme.spacing(2),
  display: 'flex',
}));
