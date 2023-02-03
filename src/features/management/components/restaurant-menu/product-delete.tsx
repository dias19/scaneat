import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import productsApi from '~/api/products/api';
import { BottomDrawer } from '~/components/bottom-drawer';

type DeleteDishProps = {
  openDeleteDish: boolean;
  onCloseDeleteDish: VoidFunction;
  onOpenDeleteDish: VoidFunction;
  title?: string;
  id: number;
};

export function RestaurantProductDelete({
  openDeleteDish,
  onCloseDeleteDish,
  onOpenDeleteDish,
  title,
  id,
}: DeleteDishProps) {
  const [deleteProduct] = productsApi.endpoints.deleteProduct.useMutation();

  const handleDelete = async () => {
    await deleteProduct(id);
    onCloseDeleteDish();
  };

  return (
    <BottomDrawer
      open={openDeleteDish}
      onClose={onCloseDeleteDish}
      onOpen={onOpenDeleteDish}
      title={title}
      hasCloser
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="subtitle2">Вы уверены что хотите удалить блюдо “Карааге”?</Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть это блюдо
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={onCloseDeleteDish}>
            Отмена
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </BottomDrawer>
  );
}
