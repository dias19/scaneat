import React from 'react';

import { Typography, Box, styled } from '@mui/material';

import { CircularLoader } from '~/components/Circular Loader';
import { useResponsive } from '~/hooks/useResponsive';
import { HEADER } from '~/layouts/management/constants';

import { RestaurantStatus } from '../../types';
import { useGetRestaurantsByStatus } from './hooks/useGetRestaurantsByStatus';
import { RestaurantStatusCard } from './restaurant-status-card';

type Props = {
  status: RestaurantStatus
};

export function RestaurantStatusList({ status }: Props) {
  const { restaurants, isLoading, isError } = useGetRestaurantsByStatus(status);

  const isRestaurantListEmpty = restaurants?.length === 0;

  const isDesktop = useResponsive('up', 'sm');

  const isShownEmpty = !isLoading && !isError && isRestaurantListEmpty;

  const isShown = !isLoading && !isError && !isRestaurantListEmpty;

  return (
    <BoxStyle sx={{ width: (isDesktop) ? '100%' : 'auto' }}>
      <CircularLoader isLoading={isLoading} />
      {isShownEmpty && <Typography align="center"> Нету заявок ресторанов</Typography>}
      {isShown && (
        <BoxCardStyle>
          {restaurants?.map((restaurant) => (
            <RestaurantStatusCard
              restaurant={restaurant}
              status={status}
            />
          ))}
        </BoxCardStyle>
      )}
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: `calc(${HEADER.HEADER_HEIGHT}px + ${theme.spacing(2)})`,
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));

const BoxCardStyle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(1),
    width: '100%',
  },
}));
