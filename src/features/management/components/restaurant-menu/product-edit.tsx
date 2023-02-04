import React from 'react';

import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

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
}

export function RestaurantProductEdit({
  openEditDish, onCloseEditDish, onOpenEditDish, title, product,
}: EditDishProps) {
  const [editProduct] = productsApi.endpoints.editProduct.useMutation();
  const { restaurantId } = useParams();
  const onSubmit = async (data:ProductFormData) => {
    await editProduct({ restaurantId: Number(restaurantId), productId: product.id, ...data });
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
