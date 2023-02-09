import React from 'react';

import {
  Typography, Box, Button, styled,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import restaurantApi from '~/api/restaurant/api';
import { PATH_RESTAURANTS } from '~/routes/paths';

import { OwnerDetailsConfirmation } from './owner-details-confirmation';
import { RestaurantDetailsConfirmation } from './restaurant-details-confirmation';
import { CreateRestaurantForm } from './restaurant-forms';

type ConfirmationFormProps = {
  handleBack: () => void;
};

export function RestaurantCreationConfirmation({ handleBack }: ConfirmationFormProps) {
  const methods = useFormContext<CreateRestaurantForm>();

  const [createRestaurant] = restaurantApi.endpoints.createRestaurant.useMutation();

  const { handleSubmit } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data: CreateRestaurantForm) => {
    const { restaurantOwner, restaurant } = data;
    const { photoUrl, ...restaurantData } = restaurant;
    try {
      await createRestaurant({
        restaurant:
         { slug: restaurantData.name, ...restaurantData },
        restaurantOwner,
      }).unwrap();
      navigate(PATH_RESTAURANTS.successfulCreation);
    } catch {
      toast.error('Вышла ошибка при отправке');
    }
  };
  return (
    <BoxContainerStyle>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Подтверждение данных
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Данные владельца
        </Typography>
        <OwnerDetailsConfirmation />
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Данные заведения
        </Typography>
        <RestaurantDetailsConfirmation />
      </Box>
      <BoxButtonStyle>
        <Button
          variant="outlined"
          sx={{ bgcolor: 'inherit' }}
          size="large"
          onClick={() => handleBack()}
        >
          Назад
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          Подтвердить
        </Button>
      </BoxButtonStyle>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(3),
    display: 'flex',
  },
}));
