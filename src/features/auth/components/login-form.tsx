import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Stack, Alert, Typography, Box, styled,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import authApi from '~/api/auth/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { PATH_MANAGEMENT } from '~/routes/paths';

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const defaultValues = {
  email: '',
  password: '',
};

export function LoginForm() {
  const [login] = authApi.endpoints.login.useMutation();
  const navigate = useNavigate();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data).unwrap();
      navigate(PATH_MANAGEMENT.myRestaurants);
    } catch (error: any) {
      setError('email', { message: 'Wrong credentials', type: 'custom' });
      setError('password', { message: 'Wrong credentials', type: 'custom' });
    }
  };
  return (
    <BoxContainerStyle>
      <TypographyStyle variant="body2">
        Укажите необходимые данные
      </TypographyStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField
            name="email"
            label="Электронная почта"
          />

          <RHFTextField
            name="password"
            label="Пароль"
            type="password"
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 2 }}
        >
          Войти
        </LoadingButton>
      </FormProvider>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  padding: theme.spacing(3),
  width: '100%',
  borderRadius: theme.spacing(1),
}));

const TypographyStyle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.grey[600],
}));
