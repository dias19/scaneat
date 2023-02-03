import React from 'react';

import { Box, styled } from '@mui/material';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';

import { ProductData, ProductFormData } from '../../types';
import { RestaurantProductForm } from './product-form';

type EditDishProps={
    openEditDish: boolean,
    onCloseEditDish: VoidFunction,
    onOpenEditDish: VoidFunction,
    title?: string,
   product: ProductData,
   id: number,
}

export function RestaurantProductEdit({
  openEditDish, onCloseEditDish, onOpenEditDish, title, product, id,
}: EditDishProps) {
  const [editProduct] = productsApi.endpoints.editProduct.useMutation();

  const onSubmit = async (data:ProductFormData) => {
    await editProduct({ productId: product.id, ...data });
    onCloseEditDish();
  };

  return (
    <BottomDrawerStyle
      open={openEditDish}
      onClose={onCloseEditDish}
      onOpen={onOpenEditDish}
      title={title}
      hasCloser
    >
      <Box display="flex" flexDirection="column" sx={{ height: '100%' }}>
        <RestaurantProductForm
          product={product}
          onSubmit={onSubmit}
          buttonName="Редактировать"
          setOpen={() => onCloseEditDish()}
        />
      </Box>
    </BottomDrawerStyle>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
