import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider, RHFTextField } from '~/components/hook-form';

import { Category, CategoryFormData } from '../../types';

type CategoryFormProps={
    setOpen: (state:boolean)=> void,
    onSubmit: (data: CategoryFormData) => void,
    buttonTitle: string,
    category?: Category
}

export function RestaurantCategoryForm({
  setOpen, onSubmit, buttonTitle, category,
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
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Отменить
        </Button>
        <Button
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          {buttonTitle}
        </Button>
      </Box>
    </Box>
  );
}
