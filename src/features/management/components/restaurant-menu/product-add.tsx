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

type Props = {
  open: boolean;
  onClose: VoidFunction,
  onOpen: VoidFunction,
  category?: string;
};

export function RestaurantProductAdd({
  open, onClose, onOpen, category,
}: Props) {
  const [addProduct] = productsApi.endpoints.addProduct.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const categoryId = parseInt(parameters.categoryId as string, 10);

  const isDesktop = useResponsive('up', 'sm');

  const handleAdd = async (data: ProductFormData) => {
    const { photoUrl, ...productData } = data;

    await addProduct({
      restaurantId,
      categoryId,
      ...productData,
    });
    onClose();
  };
  return (
    <>
      {!isDesktop && (
        <ProductAddMobile
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          category={category}
          handleAdd={handleAdd}
        />
      )}

      {isDesktop && (
        <ProductAddDesktop
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          handleAdd={handleAdd}
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

type AddPropsDesktop=Pick<Props, 'open' | 'onClose' | 'onOpen'> & {
  handleAdd: (data:ProductFormData) => void
}

function ProductAddDesktop({
  open,
  onClose,
  onOpen,
  handleAdd,
}:AddPropsDesktop) {
  return (
    <DialogForm
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      title="Добавить блюдо"
      hasCloser
    >
      <RestaurantProductForm
        onSubmit={handleAdd}
        onCloseForm={onClose}
        buttonName="Создать"
      />
    </DialogForm>
  );
}

type AddPropsMobile=Props & Pick<AddPropsDesktop, 'handleAdd'>

function ProductAddMobile({
  open,
  onClose,
  onOpen,
  category,
  handleAdd,
}:AddPropsMobile) {
  return (
    <BottomDrawerStyle
      open={open}
      onClose={onClose}
      onOpen={onOpen}
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
            onCloseForm={onClose}
            onSubmit={handleAdd}
            buttonName="Создать"
          />
        </Box>
      </Box>
    </BottomDrawerStyle>
  );
}
