import React from 'react';

import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';

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

  const onSubmit = async (data: ProductFormData) => {
    await addProduct({
      restaurantId,
      categoryId,
      ...data,
    });
    setOpen(false);
  };

  return (
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
          <RestaurantProductForm
            setOpen={setOpen}
            onSubmit={onSubmit}
            buttonName="Создать"
          />
        </Box>
      </Box>
    </BottomDrawerStyle>
  );
}
const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));