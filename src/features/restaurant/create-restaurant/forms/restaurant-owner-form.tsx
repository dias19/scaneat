import React from 'react';

import {
  Box, Button, Stack, styled, Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';

import { OwnerForm } from '../../type';

type OwnerFormProps={
  handleNext: () => void
}

export function RestaurantOwnerForm({ handleNext }:OwnerFormProps) {
  const methods = useFormContext<OwnerForm>();

  const { formState: { isValid } } = methods;

  const goNext = () => {
    handleNext();
  };
  return (
    <BoxContainerStyle>
      <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
        Введите ваши данные
      </Typography>
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <RHFTextFieldStyle
          name="name"
          label="Имя"
        />
        <RHFTextFieldStyle
          name="surname"
          label="Фамилия"
        />
        <RHFTextFieldStyle
          name="email"
          label="Почта"
        />
        <RHFPhoneFieldStyle
          name="phone"
          label="Номер телефона"
        />
      </Stack>
      <Box>
        <ButtonStyle
          variant="contained"
          disabled={!isValid}
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
