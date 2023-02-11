import React from 'react';

import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Product, ProductFormData } from '../../types';
import { RestaurantProductForm } from './product-form';

type EditDishProps={
    openEditDish: boolean,
    onCloseEditDish: VoidFunction,
    onOpenEditDish: VoidFunction,
    title: string,
   product: Product,
}

export function RestaurantProductEdit({
  openEditDish,
  onCloseEditDish,
  onOpenEditDish,
  title,
  product,
}: EditDishProps) {
  const [editProduct] = productsApi.endpoints.editProduct.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const onSubmit = async (data:ProductFormData) => {
    await editProduct({ restaurantId, productId: product.id, ...data });
    onCloseEditDish();
  };

  const isLaptop = useResponsive('up', 'sm');
  return (
    <>
      {
      !isLaptop && (
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
      )
    }
      {
      isLaptop && (
        <DialogForm
          open={openEditDish}
          onClose={onCloseEditDish}
          onOpen={onOpenEditDish}
          title={title}
          hasCloser
        >
          <RestaurantProductForm
            product={product}
            onSubmit={onSubmit}
            buttonName="Редактировать"
            setOpen={() => onCloseEditDish()}
          />
        </DialogForm>
      )
    }
    </>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
