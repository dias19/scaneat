import React from 'react';

import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { ProductFormData } from '../../types';
import { RestaurantProductForm } from './product-form';

type AddProductProp = {
  open: boolean;
  setOpen: (state: boolean) => void;
  category?: string;
};

export function RestaurantProductAdd({ open, setOpen, category }: AddProductProp) {
  const [addProduct] = productsApi.endpoints.addProduct.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const categoryId = parseInt(parameters.categoryId as string, 10);

  const isLaptop = useResponsive('up', 'sm');
  const onSubmit = async (data: ProductFormData) => {
    const { photoUrl, ...productData } = data;

    await addProduct({
      restaurantId,
      categoryId,
      ...productData,
    });
    setOpen(false);
  };

  return (
    <>
      {!isLaptop && (
        <BottomDrawerStyle
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          title="Добавить блюдо"
          hasCloser
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="subtitle2">
              Новое блюдо в категории:
              {' '}
              {category}
            </Typography>
            <Typography variant="body2" color="grey.600">
              Заполните поля для нового блюда
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <RestaurantProductForm setOpen={setOpen} onSubmit={onSubmit} buttonName="Создать" />
            </Box>
          </Box>
        </BottomDrawerStyle>
      )}

      {isLaptop && (
        <DialogForm
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          title="Добавить блюдо"
          hasCloser
        >
          <RestaurantProductForm onSubmit={onSubmit} setOpen={setOpen} buttonName="Создать" />
        </DialogForm>
      )}
    </>
  );
}
const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
