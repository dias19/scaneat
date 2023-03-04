import React from 'react';

import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Product, ProductFormData, RestarauntModifyActions } from '../../types';
import { RestaurantProductForm } from './product-form';

type Props = {
  editOpen: boolean;
  handleAction: (action: RestarauntModifyActions)=>void,
  title: string;
  product: Product;
};

export function RestaurantProductEdit({
  editOpen,
  handleAction,
  title,
  product,
}: Props) {
  const [editProduct] = productsApi.endpoints.editProduct.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const handleSubmit = async (data: ProductFormData) => {
    await editProduct({ restaurantId, productId: product.id, ...data });
    handleAction(null);
  };

  const handleOpen = () => {
    handleAction('edit');
  };

  const handleClose = () => {
    handleAction(null);
  };

  const isDesktop = useResponsive('up', 'sm');

  if (isDesktop) {
    return (
      <ProductEditDesktop
        editOpen={editOpen}
        title={title}
        onClose={handleClose}
        onOpen={handleOpen}
        product={product}
        handleSubmit={handleSubmit}
      />
    );
  }
  return (
    <ProductEditMobile
      editOpen={editOpen}
      title={title}
      onClose={handleClose}
      onOpen={handleOpen}
      product={product}
      handleSubmit={handleSubmit}
    />
  );
}

type EditProps = Pick<Props, 'editOpen' | 'title' | 'product'> & {
  handleSubmit: (data: ProductFormData) => void;
  onClose: VoidFunction,
  onOpen: VoidFunction,
};

function ProductEditDesktop({
  editOpen,
  title,
  product,
  onClose,
  onOpen,
  handleSubmit,
}: EditProps) {
  return (
    <DialogForm
      open={editOpen}
      onClose={onClose}
      onOpen={onOpen}
      title={title}
      hasCloser
    >
      <RestaurantProductForm
        product={product}
        onSubmit={handleSubmit}
        buttonName="Редактировать"
        onCloseForm={onClose}
      />
    </DialogForm>
  );
}

function ProductEditMobile({
  editOpen: openEditDish,
  title,
  product,
  onClose,
  onOpen,
  handleSubmit,
}: EditProps) {
  return (
    <BottomDrawerStyle
      open={openEditDish}
      onClose={onClose}
      onOpen={onOpen}
      title={title}
      hasCloser
    >
      <Box display="flex" flexDirection="column" sx={{ height: '100%' }}>
        <RestaurantProductForm
          product={product}
          onSubmit={handleSubmit}
          buttonName="Редактировать"
          onCloseForm={onClose}
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
