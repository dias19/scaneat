import React from 'react';

import {
  Box, Container,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import restaurantApi from '~/api/restaurant/api';
import { useResponsive } from '~/hooks/useResponsive';

import { NavigateBack } from '../navigate-back';
import ManagementNavigation from './management-navigation';
import Profile from './profile';
import { QrCodeRestaurant } from './qr-code';
import { RestaurantSales } from './sales';

export function RestaurantDetails() {
  const { slug } = useParams();

  const skip = !slug;

  const isDesktop = useResponsive('up', 'sm');
  const { data: restaurant } = restaurantApi.endpoints.getRestaurant.useQuery(slug as string, {
    skip,
  });

  return (
    <BoxStyle>
      {
        isDesktop
        && (
          <Container>
            <NavigateBack />
            <Profile restaurant={restaurant} />
            <QrCodeRestaurant restaurantId={restaurant!.id} />
            <ManagementNavigation
              id={restaurant?.id}
              restaurantName={restaurant?.name}
            />
            <Box sx={{ paddingBottom: 2, overflow: 'hidden' }}>
              <RestaurantSales />
            </Box>
          </Container>
        )
      }
      {
        !isDesktop
        && (
          <>
            <Profile restaurant={restaurant} />
            <QrCodeRestaurant restaurantId={restaurant!.id} />
            <ManagementNavigation id={restaurant?.id} />
            <Box sx={{ paddingBottom: 2, overflow: 'hidden' }}>
              <RestaurantSales />
            </Box>
          </>
        )
      }
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));
