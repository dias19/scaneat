import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { BottomDrawer } from '~/components/bottom-drawer';

import { Category } from '../../types';

type CategoryDeleteProps = {
  category: Category;
  deleteOpen: boolean;
  setDeleteOpen: (state: boolean) => void;
};

export function RestaurantCategoryDelete({
  category,
  deleteOpen,
  setDeleteOpen,
}: CategoryDeleteProps) {
  const { restaurantId } = useParams();
  const [deleteCategory] = categoryApi.endpoints.deleteCategory.useMutation();

  const handleClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteCategory = async () => {
    await deleteCategory({
      restaurantId: Number(restaurantId),
      categoryId: category.id,
    });
    setDeleteOpen(false);
  };

  return (
    <BottomDrawer
      open={deleteOpen}
      onClose={() => setDeleteOpen(false)}
      onOpen={() => setDeleteOpen(true)}
      title={category.name}
      hasCloser
    >
      <Box>
        <Typography variant="subtitle2">
          Вы уверены что хотите удалить блюдо
          {' '}
          {category.name}
        </Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть это категорию
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            size="large"
            onClick={handleClose}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleDeleteCategory}
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </BottomDrawer>
  );
}
