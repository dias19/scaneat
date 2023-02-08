import React from 'react';

import {
  Typography, Box, Stack, Button, styled,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import restaurantApi from '~/api/restaurant/api';
import { PATH_RESTAURANTS } from '~/routes/paths';
import { useAppDispatch } from '~/store';

import { resetPhoto } from '../../photo-slice';
import { CreateRestaurantForm } from '../../type';

type ConfirmationFormProps = {
  handleBack: () => void;
};

export function ConfirmationForm({ handleBack }: ConfirmationFormProps) {
  const methods = useFormContext<CreateRestaurantForm>();

  const dispatch = useAppDispatch();

  const [createRestaurant] = restaurantApi.endpoints.createRestaurant.useMutation();

  const { getValues } = methods;

  const navigate = useNavigate();

  const formValues = getValues();

  const { data: cities = [] } = restaurantApi.endpoints.getCities.useQuery();

  const selectedCity = cities.filter((city) => city.id === Number(formValues.cityId));

  const {
    restaurantName,
    restaurantPhone,
    email,
    name,
    surname,
    phone,
    cityId,
    ...data
  } = formValues;

  const handleSubmit = async () => {
    const body = {
      restaurant: {
        name: restaurantName,
        slug: restaurantName,
        phone: restaurantPhone,
        cityId: Number(cityId),
        ...data,
      },
      restaurantOwner: {
        name,
        surname,
        phone,
        email,
      },
    };
    try {
      await createRestaurant(body).unwrap();
      dispatch(resetPhoto());
      navigate(PATH_RESTAURANTS.successfulCreation);
    } catch {
      toast.error('Вышла ошибка при отправке');
    }
  };

  const ownerInformation = [
    {
      field: 'Имя:',
      value: `${name} ${surname}`,
    },
    {
      field: 'Почта:',
      value: email,
    },
    {
      field: 'Номер телефона:',
      value: phone,
    },
  ];

  const restaurantInformation = [
    {
      field: 'Название:',
      value: restaurantName,
    },
    {
      field: 'Телефон:',
      value: restaurantPhone,
    },
    {
      field: 'Город:',
      value: selectedCity[0]?.name,
    },
    {
      field: 'Адрес:',
      value: formValues.address,
    },
  ];
  return (
    <BoxContainerStyle>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Подтверждение данных
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Данные владельца
        </Typography>
        <Stack spacing={0.5}>
          {ownerInformation.map((information) => (
            <Box display="flex">
              <Typography sx={{ flexGrow: 1 }} variant="body2">
                {information.field}
              </Typography>
              <Typography variant="body2">{information.value}</Typography>
            </Box>
          ))}
        </Stack>
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Данные заведения
        </Typography>
        <Stack spacing={0.5}>
          {restaurantInformation.map((information) => (
            <Box display="flex">
              <Typography sx={{ flexGrow: 1 }} variant="body2">
                {information.field}
              </Typography>
              <Typography variant="body2">{information.value}</Typography>
            </Box>
          ))}
          <Box display="flex">
            <Typography sx={{ flexGrow: 1 }} variant="body2">
              Онлайн заказ:
            </Typography>
            <Typography variant="body2">
              {formValues.hasDelivery ? 'Доставка, ' : null}
              {formValues.hasTakeAway ? 'Самовывоз' : null}
            </Typography>
          </Box>
        </Stack>
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
        <Button variant="contained" size="large" onClick={handleSubmit}>
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
