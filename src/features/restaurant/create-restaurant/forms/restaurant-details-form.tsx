import React from 'react';

import {
  Box, Button, Stack, Typography, styled,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import restaurantApi from '~/api/restaurant/api';
import { RHFSelect, RHFSwitch, RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';

import { RestaurantForm } from '../../type';
import { PostPhoto } from '../post-photo';

type FormProps={
    handleBack: () => void,
    handleNext: () => void
}

export function RestaurantDetailsForm({ handleBack, handleNext } : FormProps) {
  const methods = useFormContext<RestaurantForm>();

  const { formState: { isValid } } = methods;

  const { data: cities = [] } = restaurantApi.endpoints.getCities.useQuery();

  const goNext = () => {
    handleNext();
  };

  const goBack = () => {
    handleBack();
  };
  return (
    <BoxContainerStyle>
      <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Введите данные заведения
        </Typography>
        <PostPhoto />
        <Stack spacing={2} sx={{ mt: 2 }}>
          <RHFTextFieldStyle
            name="restaurantName"
            label="Имя"
          />
          <RHFPhoneFieldStyle
            name="restaurantPhone"
            label="Номер ресторана"
          />
          <RHFSelectStyle
            name="cityId"
            label="Город"
          >
            <option disabled value={0}>Выберите город</option>
            {cities.map((city) => (
              <option key={city.id} value={Number(city.id)}>
                {city.name}
              </option>
            ))}
          </RHFSelectStyle>
          <RHFTextFieldStyle
            name="address"
            label="Адресс"
          />
        </Stack>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Онлайн заказ
        </Typography>
        <Box display="flex" flexDirection="column">
          <RHFSwitch
            name="hasTakeAway"
            label="Самовывоз"
            color="success.main"
          />
          <RHFSwitch
            name="hasDelivery"
            label="Доставка"
          />
        </Box>
      </Box>
      <BoxButtonStyle>
        <Button
          variant="outlined"
          sx={{ bgcolor: 'inherit' }}
          onClick={goBack}
          size="large"
        >
          Назад
        </Button>
        <Button
          variant="contained"
          disabled={!isValid}
          onClick={goNext}
          size="large"
        >
          Подтвердить
        </Button>
      </BoxButtonStyle>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  height: '100%',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
}));

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    display: 'flex',
  },
}));

const RHFTextFieldStyle = styled(RHFTextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
  },
});
const RHFPhoneFieldStyle = styled(RHFPhoneField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
  },
});
const RHFSelectStyle = styled(RHFSelect)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
  },
});
