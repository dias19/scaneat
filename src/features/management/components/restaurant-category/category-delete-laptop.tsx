import React from 'react';

import {
  Box, Typography, Button, styled,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { DialogForm } from '~/components/Dialog';

import { Category } from '../../types';

type CategoryDeleteLaptop={
    category: Category,
    setDeleteOpen: (state: boolean) => void,
    setActionsOpen: (state: boolean) => void,
    deleteOpen: boolean
}
export function RestaurantCategoryDeleteLaptop({
  category,
  setDeleteOpen,
  setActionsOpen,
  deleteOpen,
}:CategoryDeleteLaptop) {
  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const [deleteCategory] = categoryApi.endpoints.deleteCategory.useMutation();

  const handleClose = () => {
    setDeleteOpen(false);
    setActionsOpen(false);
  };

  const handleDeleteCategory = async () => {
    await deleteCategory({
      restaurantId,
      categoryId: category.id,
    });
    setDeleteOpen(false);
  };
  return (
    <DialogForm
      open={deleteOpen}
      onClose={() => setDeleteOpen(false)}
      onOpen={() => setDeleteOpen(true)}
      title="Создать категорию"
      hasCloser
      maxWidth="xs"
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
        <BoxButtonStyle>
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
            color="error"
          >
            Удалить
          </Button>
        </BoxButtonStyle>
      </Box>
    </DialogForm>
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
