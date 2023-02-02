import React from 'react';

import {
  Box, styled,
} from '@mui/material';

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
  function onSubmit(data:ProductFormData) {
    console.log(data);
  }
  return (
    <BottomDrawerStyle
      open={openEditDish}
      onClose={onCloseEditDish}
      onOpen={onOpenEditDish}
      title={title}
    >
      <Box display="flex" flexDirection="column" sx={{ height: '100%' }}>
        <RestaurantProductForm
          product={product}
          onSubmit={(data) => onSubmit(data)}
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
