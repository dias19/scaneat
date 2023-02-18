import React from 'react';

import { Typography, Box, styled } from '@mui/material';

import { CircularLoader } from '~/components/Circular Loader';
import { HEADER } from '~/layouts/management/constants';

import { useGetRestaurantsByStatus } from './hooks/useGetRestaurantsByStatus';
import { RestaurantStatusCard } from './restaurant-with-status-card';

type ListWithStatusProps = {
  status: 'accepted' | 'pending' | 'rejected';
};

export function RestaurantStatusList({ status }: ListWithStatusProps) {
  const { restaurants, isLoading, isError } = useGetRestaurantsByStatus(status);

  const isRestaurantListEmpty = restaurants?.length === 0;

  const isShownEmpty = !isLoading && !isError && isRestaurantListEmpty;

  const isShown = !isLoading && !isError && !isRestaurantListEmpty;

  return (
    <BoxStyle>
      <CircularLoader isLoading={isLoading} />
      {isShownEmpty && <Typography align="center"> Нету заявок ресторанов</Typography>}
      {isShown && (
        <Box>
          {restaurants?.map((restaurant) => (
            <RestaurantStatusCard
              restaurant={restaurant}
              hasButton={status === 'rejected' && true}
              hasButtons={status === 'pending' && true}
            />
          ))}
        </Box>
      )}
    </BoxStyle>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: `calc(${HEADER.HEADER_HEIGHT}px + ${theme.spacing(2)})`,
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));
