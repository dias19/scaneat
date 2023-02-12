import React from 'react';

import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Product, ProductFormData } from '../../types';
import { RestaurantProductForm } from './product-form';

type EditDishProps = {
  openEditDish: boolean;
  onCloseEditDish: VoidFunction;
  onOpenEditDish: VoidFunction;
  title: string;
  product: Product;
};

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

  const handleSubmit = async (data: ProductFormData) => {
    await editProduct({ restaurantId, productId: product.id, ...data });
    onCloseEditDish();
  };

  const isLaptop = useResponsive('up', 'sm');
  return (
    <>
      {!isLaptop && (
        <ProductEditMobile
          openEditDish={openEditDish}
          onCloseEditDish={onCloseEditDish}
          onOpenEditDish={onOpenEditDish}
          title={title}
          product={product}
          handleSubmit={handleSubmit}
        />
      )}
      {isLaptop && (
        <ProductEditLaptop
          openEditDish={openEditDish}
          onCloseEditDish={onCloseEditDish}
          onOpenEditDish={onOpenEditDish}
          title={title}
          product={product}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));

type EditProps = EditDishProps & {
  handleSubmit: (data: ProductFormData) => void;
};

function ProductEditLaptop({
  openEditDish,
  onCloseEditDish,
  onOpenEditDish,
  title,
  product,
  handleSubmit,
}: EditProps) {
  return (
    <DialogForm
      open={openEditDish}
      onClose={onCloseEditDish}
      onOpen={onOpenEditDish}
      title={title}
      hasCloser
    >
      <RestaurantProductForm
        product={product}
        onSubmit={handleSubmit}
        buttonName="Редактировать"
        setOpen={() => onCloseEditDish()}
      />
    </DialogForm>
  );
}

function ProductEditMobile({
  openEditDish,
  onCloseEditDish,
  onOpenEditDish,
  title,
  product,
  handleSubmit,
}: EditProps) {
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
          onSubmit={handleSubmit}
          buttonName="Редактировать"
          setOpen={() => onCloseEditDish()}
        />
      </Box>
    </BottomDrawerStyle>
  );
}
