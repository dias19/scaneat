import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Stack, styled, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider, RHFSwitch, RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';
import { PostPhoto } from '~/features/misc';

import { EmployeeFormData, Employee } from '../../../types';

type EmployeeFormProps = {
  employee?: Employee;
  buttonTitle: string;
};

const staffSchema = yup.object().shape(
  {
    name: yup.string().required('Введите имя рабочего'),
    surname: yup.string().required('Введите фамилию рабочего'),
    email: yup.string().email().required('Введите почту рабочего'),
    phone: yup.string().required('Введите номер телефона рабочего'),
    isCheff: yup.boolean().when('isManager', {
      is: (isManager: boolean) => !isManager,
      then: yup.boolean().oneOf([true], 'Выберите один из вариантов').required(),
    }),
    isManager: yup.boolean().when('isCheff', {
      is: (isCheff: boolean) => !isCheff,
      then: yup.boolean().oneOf([true], 'Выберите один из вариантов').required(),
    }),
    role: yup.string(),
    photoUrl: yup.string().required(),
    photoId: yup.number().required(),
  },
  [
    ['isManager', 'isCheff'],
    ['isCheff', 'isManager'],
  ],
);

export function EmployeeForm({ employee, buttonTitle }: EmployeeFormProps) {
  const defaultValues = {
    name: employee?.name || '',
    surname: employee?.surname || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    photoUrl: employee?.photoUrl || '',
    isManager: employee?.role === 'manager' || false,
    role: employee?.role || '',
    isCheff: employee?.role === 'cheff' || false,
    photoId: employee?.photoId,
  };

  const methods = useForm<EmployeeFormData>({
    resolver: yupResolver(staffSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    formState: { isValid },
    handleSubmit,
    watch,
    setValue,
  } = methods;

  const photoUrl = watch('photoUrl');
  const photoId = watch('photoId');

  const isPhotoUploaded = !!photoId;

  function onSubmit(data: EmployeeFormData) {
    if (data.isManager) setValue('role', 'manager');
    else if (data.isCheff) setValue('role', 'chef');
    console.log(data);
  }

  return (
    <FormProviderStyle
      methods={methods}
    >
      <Box sx={{ flexGrow: 1 }}>
        <PostPhoto
          isPhotoUploaded={isPhotoUploaded}
          photoUrl={photoUrl}
          photoIdPath="photoId"
          photoUrlPath="photoUrl"
        />

        <Stack spacing={1} sx={{ mt: 2 }}>
          <RHFTextField name="name" label="Имя" />
          <RHFTextField name="surname" label="Фамилия" />
          <RHFTextField name="email" label="Почта" />
          <RHFPhoneField name="phone" label="Номер телефона" />
        </Stack>

        <Typography sx={{ fontSize: 14, fontWeight: 'bold', mt: 2 }}>
          Позиция работника
        </Typography>

        <Typography sx={{ mt: 0.5 }} variant="body2" color="grey.600">
          Укажите как минимум одну роль
        </Typography>

        <BoxSwitchStyle>
          <RHFSwitch name="isCheff" label="Шеф" />
          <RHFSwitch name="isManager" label="Менеджер" />
        </BoxSwitchStyle>
      </Box>
      <BoxButtonStyle>
        <Button variant="outlined" size="large">
          Отмена
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          size="large"
          disabled={!isValid}
        >
          {buttonTitle}
        </Button>
      </BoxButtonStyle>
    </FormProviderStyle>
  );
}

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
}));

const BoxSwitchStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(1),
}));

const FormProviderStyle = styled(FormProvider)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});
