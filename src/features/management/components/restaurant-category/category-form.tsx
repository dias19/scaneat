import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Stack, styled,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider, RHFTextField } from '~/components/hook-form';

import { Category, CategoryFormData } from '../../types';

type CategoryFormProps={
    onCloseForm: VoidFunction,
    onSubmit: (data: CategoryFormData) => void,
    buttonTitle: string,
    category?: Category
}

export function RestaurantCategoryForm({
  onCloseForm, onSubmit, buttonTitle, category,
}:CategoryFormProps) {
  const categorySchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
  });

  const defaultValues = {
    name: category?.name || '',
    description: category?.description || '',
  };

  const methods = useForm<CategoryFormData>({
    resolver: yupResolver(categorySchema),
    defaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, formState: { isValid } } = methods;
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack spacing={1}>
            <RHFTextField
              name="name"
              label="Название"
            />
            <RHFTextField
              name="description"
              label="Описание"
            />
          </Stack>
        </FormProvider>
      </Box>
      <BoxButtonStyle>
        <Button variant="outlined" onClick={onCloseForm}>
          Отменить
        </Button>
        <Button
          variant="contained"
          disabled={!isValid}
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          {buttonTitle}
        </Button>
      </BoxButtonStyle>
    </Box>
  );
}
const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'end',
  },
}));
