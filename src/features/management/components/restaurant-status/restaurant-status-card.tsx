import React from 'react';

import {
  Card, Box, Typography, CardContent,
} from '@mui/material';
import styled from 'styled-components';

import { Image } from '~/components/image';
import { Restaurant } from '~/features/restaurant';

import { RestaurantStatus } from '../../types';
import RestaurantActionButtons from './components/restaurant-action-buttons';

type CardWithStatusProps = {
  restaurant: Restaurant;
  status: RestaurantStatus
};

export function RestaurantStatusCard({
  restaurant,
  status,
}: CardWithStatusProps) {
  return (
    <CardStyle key={restaurant.id}>
      <CardContentStyle>
        <Box display="flex">
          <ImageStyle
            url={restaurant.originalUrl}
            alt={restaurant.name}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">{restaurant.name}</Typography>
            <Typography variant="caption" color="grey.600" component="p">
              {restaurant.address}
            </Typography>
          </Box>
        </Box>
        <RestaurantActionButtons
          status={status}
          restaurantId={restaurant.id}
        />
      </CardContentStyle>
    </CardStyle>
  );
}

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '&:last-child': {
    padding: theme.spacing(1.5),
  },
}));

const ImageStyle = styled(Image)(({ theme }) => ({
  height: 60,
  width: 60,
  marginRight: theme.spacing(2),
}));

const CardStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    height: 'auto',
    marginBottom: 0,
  },
}));
