import React, { useEffect, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Stack, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import restaurantApi from '~/api/restaurant/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { Image } from '~/components/image';

import { ProductFormData, ProductData } from '../../types';

type FormProps = {
  onSubmit: (data: ProductFormData) => void;
  setOpen: (state: boolean) => void;
  buttonName: string;
  product?: ProductData
};

const AddDishSchema = yup.object({
  name: yup.string().required('Поля обязательное'),
  price: yup.number().required('Поля обязательное'),
  description: yup.string().required('Поля обязательное'),
  photoId: yup.number().required(),
});

export function RestaurantProductForm({
  onSubmit, setOpen, buttonName, product,
}: FormProps) {
  const [postPhoto] = restaurantApi.endpoints.postPhoto.useMutation();

  const [photoUploaded, setPhotoUploaded] = useState(false);

  const [photoUrl, setPhotoUrl] = useState('');

  const inputFileRef = useRef<HTMLInputElement>(null);

  const defaultValues = {
    name: product?.name || '',
    price: Number(product?.price) || 0,
    description: product?.description || '',
    photoId: Number(product?.photoId) || 0,
  };

  const methods = useForm<ProductFormData>({
    resolver: yupResolver(AddDishSchema),
    defaultValues,
    mode: 'all',
  });

  const {
    handleSubmit,
    formState: { isValid },
    setValue,
  } = methods;

  useEffect(() => {
    if (product?.originalUrl) {
      setPhotoUrl(product.originalUrl);
      setPhotoUploaded(true);
    }
  }, []);

  const handleClick = () => {
    inputFileRef.current!.click();
  };

  async function handleFileSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    if (!e.target.files) return;
    formData.append('image', e.target.files[0]);
    const { id, originalUrl } = await postPhoto(formData).unwrap();
    setValue('photoId', Number(id), { shouldValidate: false });
    setPhotoUrl(originalUrl);
    setPhotoUploaded(true);
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box>
              {photoUploaded && (
                <Box display="flex">
                  <Image
                    style={{ height: 82, width: 82 }}
                    url={photoUrl}
                    alt="Продукт"
                  />
                  <Typography>
                    Выбранное фото
                  </Typography>
                </Box>
              )}
              <input
                type="file"
                ref={inputFileRef}
                style={{ display: 'none' }}
                onChange={(e) => handleFileSubmit(e)}
                placeholder="Выберите рисунок"
              />
              <Button
                color="info"
                variant="text"
                onClick={handleClick}
                size="small"
              >
                {photoUploaded
                  ? (
                    <Typography
                      sx={{ textDecoration: 'underline' }}
                    >
                      Изменить фото блюда
                    </Typography>
                  )
                  : (
                    <Typography
                      sx={{ textDecoration: 'underline' }}
                    >
                      Загрузите рисунок
                    </Typography>
                  )}
              </Button>
            </Box>
            <RHFTextField name="name" label="Название" />
            <RHFTextField name="price" label="Цена" />
            <RHFTextField name="description" label="Описание" multiline minRows={3} />
          </Stack>
        </FormProvider>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
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
      </Box>
    </Box>
  );
}
