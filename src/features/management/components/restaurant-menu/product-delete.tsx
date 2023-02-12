import React from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

type DeleteDishProps = {
  openDeleteProduct: boolean;
  onCloseDeleteProduct: VoidFunction;
  onOpenDeleteProduct: VoidFunction;
  title: string;
  productId: number;
};

export function RestaurantProductDelete({
  openDeleteProduct,
  onCloseDeleteProduct,
  onOpenDeleteProduct,
  title,
  productId,
}: DeleteDishProps) {
  const [deleteProduct] = productsApi.endpoints.deleteProduct.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const isLaptop = useResponsive('up', 'sm');

  const handleDelete = async () => {
    await deleteProduct({ productId, restaurantId });
    onCloseDeleteProduct();
  };

  return (
    <>
      {!isLaptop && (
        <RestaurantProductDeleteMobile
          openDeleteProduct={openDeleteProduct}
          onCloseDeleteProduct={onCloseDeleteProduct}
          onOpenDeleteProduct={onOpenDeleteProduct}
          title={title}
          handleDelete={handleDelete}
        />
      )}
      {isLaptop && (
        <RestaurantProductDeleteLaptop
          openDeleteProduct={openDeleteProduct}
          onCloseDeleteProduct={onCloseDeleteProduct}
          onOpenDeleteProduct={onOpenDeleteProduct}
          title={title}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'end',
  },
}));

type DeleteProps = Pick<
  DeleteDishProps,
  'onCloseDeleteProduct' |
  'title' |
  'openDeleteProduct' |
  'onOpenDeleteProduct'
> & {
  handleDelete: VoidFunction;
};

function RestaurantProductDeleteLaptop({
  openDeleteProduct,
  onCloseDeleteProduct,
  onOpenDeleteProduct,
  title,
  handleDelete,
}: DeleteProps) {
  return (
    <DialogForm
      open={openDeleteProduct}
      onClose={onCloseDeleteProduct}
      onOpen={onOpenDeleteProduct}
      title={title}
      hasCloser
      maxWidth="xs"
    >
      <Box>
        <Typography variant="subtitle2">
          Вы уверены что хотите удалить блюдо
          {' '}
          {title}
        </Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть это блюдо
        </Typography>
        <BoxButtonStyle>
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={onCloseDeleteProduct}>
            Отмена
          </Button>
          <Button variant="contained" size="large" onClick={handleDelete} color="error">
            Удалить
          </Button>
        </BoxButtonStyle>
      </Box>
    </DialogForm>
  );
}

function RestaurantProductDeleteMobile({
  openDeleteProduct,
  onCloseDeleteProduct,
  onOpenDeleteProduct,
  title,
  handleDelete,
}: DeleteProps) {
  return (
    <BottomDrawer
      open={openDeleteProduct}
      onClose={onCloseDeleteProduct}
      onOpen={onOpenDeleteProduct}
      title={title}
      hasCloser
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="subtitle2">
          Вы уверены что хотите удалить блюдо
          {' '}
          {title}
          ?
        </Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть это блюдо
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={onCloseDeleteProduct}>
            Отмена
          </Button>
          <Button variant="contained" size="large" onClick={handleDelete}>
            Удалить
          </Button>
        </Box>
      </Box>
    </BottomDrawer>
  );
}
