import React from 'react';

import {
  Card, styled, Box, Typography, CardContent, CardActionArea,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Image } from '~/components/image';
import { Restaurant } from '~/features/restaurant';
import { PATH_MANAGEMENT } from '~/routes/paths';

type Props = {
  restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: Props) {
  return (
    <Card>
      <CardActionArea component={Link} to={PATH_MANAGEMENT.restaurantDetails(restaurant.slug)}>
        <CardContentStyle>
          <Image
            url={restaurant.originalUrl}
            alt={restaurant.name}
            style={{
              height: 96,
              width: 96,
              marginRight: 16,
            }}
          />
          <Box>
            <Typography variant="h6">{restaurant.name}</Typography>
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
