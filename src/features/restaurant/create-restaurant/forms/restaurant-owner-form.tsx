import React from 'react';

import {
  Box, Button, Stack, styled, Typography,
} from '@mui/material';

import { RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';

export interface OwnerForm {
  restaurantOwner: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
}

type OwnerFormProps={
  handleNext: (schemaName:'restaurantOwner' | 'restaurant') => void
}

export function RestaurantOwnerForm({ handleNext }:OwnerFormProps) {
  const goNext = () => {
    handleNext('restaurantOwner');
  };

  return (
    <BoxContainerStyle>
      <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
        Введите ваши данные
      </Typography>
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <RHFTextFieldStyle
          name="restaurantOwner.name"
          label="Имя"
        />
        <RHFTextFieldStyle
          name="restaurantOwner.surname"
          label="Фамилия"
        />
        <RHFTextFieldStyle
          name="restaurantOwner.email"
          label="Почта"
        />
        <RHFPhoneFieldStyle
          name="restaurantOwner.phone"
          label="Номер телефона"
        />
      </Stack>
      <Box>
        <ButtonStyle
          variant="contained"
          size="large"
          onClick={goNext}
        >
          Далее
        </ButtonStyle>
      </Box>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
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

const ButtonStyle = styled(Button)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(4),
    width: 'auto',
  },
}));
