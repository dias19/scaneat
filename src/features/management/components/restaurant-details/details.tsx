import React from 'react';

import {
  Box, Container, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import restaurantApi from '~/api/restaurant/api';
import { Iconify } from '~/components/Iconify';
import { useResponsive } from '~/hooks/useResponsive';

import ManagementNavigation from './management-navigation';
import Profile from './profile';
import { QrCodeRestaurant } from './qr-code';
import { RestaurantSales } from './sales';

export function RestaurantDetails() {
  const { slug } = useParams();

  const skip = !slug;

  const isLaptop = useResponsive('up', 'sm');
  const { data: restaurant } = restaurantApi.endpoints.getRestaurant.useQuery(slug as string, {
    skip,
  });

  const [trigger] = restaurantApi.endpoints.getRestaurantQR.useLazyQuery();

  return (
    <BoxStyle>
      {
        isLaptop
        && (
          <Container>
            <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
              <Iconify
                icon="material-symbols:chevron-left-rounded"
                width={24}
                height={24}
              />
              <Typography>
                Назад
              </Typography>
            </Box>
            <Profile restaurant={restaurant} />
            <QrCodeRestaurant />
            <ManagementNavigation id={restaurant?.id} />
            <Box sx={{ paddingBottom: 2, overflow: 'hidden' }}>
              <RestaurantSales />
            </Box>
          </Container>
        )
      }
      {
        !isLaptop
        && (
          <>
            <Profile restaurant={restaurant} />
            <QrCodeRestaurant />
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
