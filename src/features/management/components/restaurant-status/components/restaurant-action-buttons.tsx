import React from 'react';

import { Box, Button, styled } from '@mui/material';

import restaurantApi from '~/api/restaurant/api';

import { RestaurantStatus } from '../../../types';

type Props = {
  restaurantId: number;
  status: RestaurantStatus;
};

export default function RestaurantActionButtons(
  {
    restaurantId,
    status,
  }: Props,
) {
  return (
    <StatusButtonPairSelector
      status={status}
      restaurantId={restaurantId}
    />
  );
}

function StatusButtonPairSelector({ status, restaurantId }: Props) {
  if (status === 'pending') {
    return <RestaurantPendingButtons restaurantId={restaurantId} />;
  }
  if (status === 'rejected') {
    return <RestarautnRejectButtons restaurantId={restaurantId} />;
  }

  return null;
}

type RestaurantStatusButtonProps = Pick<Props, 'restaurantId'>;

function RestaurantPendingButtons({ restaurantId }: RestaurantStatusButtonProps) {
  const [verifyRestaurant] = restaurantApi.endpoints.verifyRestaurant.useMutation();

  const handleVerify = async () => {
    await verifyRestaurant(restaurantId);
  };

  const [rejectRestaurant] = restaurantApi.endpoints.rejectRestaurant.useMutation();

  const handleReject = async () => {
    await rejectRestaurant(restaurantId);
  };

  return (
    <BoxStyle>
      <Button
        variant="contained"
        size="small"
        color="error"
        sx={{ boxShadow: 'none' }}
        onClick={handleVerify}
      >
        Отклонить
      </Button>
      <Button variant="contained" size="small" onClick={handleReject}>
        Подтвердить
      </Button>
    </BoxStyle>
  );
}

function RestarautnRejectButtons({ restaurantId }: RestaurantStatusButtonProps) {
  const [verifyRestaurant] = restaurantApi.endpoints.verifyRestaurant.useMutation();

  const handleVerify = async () => {
    await verifyRestaurant(restaurantId);
  };

  return (
    <ButtonStyle
      variant="contained"
      onClick={handleVerify}
    >
      Принять
    </ButtonStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1.5),
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  boxShadow: 'none',
}));
