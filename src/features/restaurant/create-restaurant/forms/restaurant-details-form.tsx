import React from 'react';

import {
  Box, Button, Stack, Typography, styled,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import miscApi from '~/api/misc/api';
import { RHFSelect, RHFSwitch, RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';
import { PostPhoto } from '~/features/misc';

import { Restaurant } from '../../type';

export interface RestaurantForm {
  restaurant: Pick<
    Restaurant,
    | 'photoId'
    | 'name'
    | 'phone'
    | 'cityId'
    | 'address'
    | 'hasTakeAway'
    | 'hasDelivery'
  > & {
    photoUrl: string,
  }
}
type FormProps = {
  handleBack: () => void;
  handleNext: (schemaName: 'restaurantOwner' | 'restaurant') => void;
};

export function RestaurantDetailsForm({ handleBack, handleNext }: FormProps) {
  const methods = useFormContext<RestaurantForm>();

  const { watch } = methods;

  const { data: cities = [] } = miscApi.endpoints.getCities.useQuery();

  const photoId = watch('restaurant.photoId');

  const isPhotoUploaded = !!photoId;

  const photoUrl = watch('restaurant.photoUrl');

  const goNext = () => {
    if (!isPhotoUploaded) {
      toast.warning('Выберите пожалуйста фото');
    }
    handleNext('restaurant');
  };

  const goBack = () => {
    handleBack();
  };

  return (
    <BoxContainerStyle>
      <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Введите данные заведения
        </Typography>
        <PostPhoto
          isPhotoUploaded={isPhotoUploaded}
          photoUrl={photoUrl}
          photoIdPath="restaurant.photoId"
          photoUrlPath="restaurant.photoUrl"
        />
        <Stack spacing={2} sx={{ mt: 2 }}>
          <RHFTextFieldStyle name="restaurant.name" label="Название" />
          <RHFPhoneFieldStyle name="restaurant.phone" label="Номер ресторана" />
          <RHFSelectStyle name="restaurant.cityId" label="Город" type="number">
            <option hidden>Выберите город</option>
            {cities.map((city) => (
              <option key={city.id} value={Number(city.id)}>
                {city.name}
              </option>
            ))}
          </RHFSelectStyle>
          <RHFTextFieldStyle name="restaurant.address" label="Адрес" />
        </Stack>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Онлайн заказ
        </Typography>
        <Box display="flex" flexDirection="column">
          <RHFSwitch name="restaurant.hasTakeAway" label="Самовывоз" color="success.main" />
          <RHFSwitch name="restaurant.hasDelivery" label="Доставка" color="success" />
        </Box>
      </Box>
      <BoxButtonStyle>
        <Button variant="outlined" sx={{ bgcolor: 'inherit' }} onClick={goBack} size="large">
          Назад
        </Button>
        <Button variant="contained" onClick={goNext} size="large">
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
