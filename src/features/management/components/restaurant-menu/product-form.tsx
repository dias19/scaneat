import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Stack, styled,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider, RHFTextField } from '~/components/hook-form';
import { PostPhoto } from '~/features/misc';

import { ProductFormData, Product } from '../../types';

type FormProps = {
  onSubmit: (data: ProductFormData) => void;
  setOpen: (state: boolean) => void;
  buttonName: string;
  product?: Product
};

const AddDishSchema = yup.object({
  name: yup.string().required('Поля обязательное'),
  price: yup.number().required('Поля обязательное'),
  description: yup.string().required('Поля обязательное'),
  unitPrice: yup.number().required('Поля обязательное'),
  photoId: yup.number().required(),
  photoUrl: yup.string().required(),
});

export function RestaurantProductForm({
  onSubmit, setOpen, buttonName, product,
}: FormProps) {
  const defaultValues = {
    name: product?.name || '',
    price: Number(product?.price),
    description: product?.description || '',
    photoId: product?.photoId,
    unitPrice: product?.unitPrice,
    photoUrl: product?.originalUrl || '',
  };

  const methods = useForm<ProductFormData>({
    resolver: yupResolver(AddDishSchema),
    defaultValues,
    mode: 'all',
  });

  const {
    handleSubmit,
    formState: { isValid },
    watch,
  } = methods;

  const photoId = watch('photoId');

  const photoUrl = watch('photoUrl');

  const isPhotoUploaded = !!photoId;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <PostPhoto
              isPhotoUploaded={isPhotoUploaded}
              photoUrl={photoUrl}
              photoIdPath="photoId"
              photoUrlPath="photoUrl"
            />
            <RHFTextField name="name" label="Название" />
            <RHFTextField name="price" label="Цена" />
            <RHFTextField name="unitPrice" label="Себестоимость" />
            <RHFTextField name="description" label="Описание" multiline minRows={3} />
          </Stack>
        </FormProvider>
      </Box>
      <BoxButtonStyle>
        <Button variant="outlined" onClick={() => setOpen(false)} size="large">
          Отменить
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          size="large"
          disabled={!isValid}
        >
          {buttonName}
        </Button>
      </BoxButtonStyle>
    </Box>
  );
}
const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: theme.spacing(3),
  },
}));
