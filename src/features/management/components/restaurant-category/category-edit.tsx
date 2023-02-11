import React from 'react';

import { Box, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Category, CategoryFormData } from '../../types';
import { RestaurantCategoryForm } from './category-form';

type CategoryEditProps = {
  editOpen: boolean;
  setEditOpen: (state: boolean) => void;
  category: Category;
  setActionsOpen: (state: boolean) => void,
};

export function RestaurantCategoryEdit({
  editOpen,
  setEditOpen,
  category,
  setActionsOpen,
}: CategoryEditProps) {
  const [editCategory] = categoryApi.endpoints.editCategory.useMutation();

  const isLaptop = useResponsive('up', 'sm');

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  async function onSubmit(data: CategoryFormData) {
    await editCategory({
      restaurantId,
      categoryId: category.id,
      isActive: true,
      ...data,
    });
    setEditOpen(false);
    setActionsOpen(false);
  }
  return (
    <>
      {
      !isLaptop
      && (
      <BottomDrawerStyle
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onOpen={() => setEditOpen(true)}
        title={category.name}
        hasCloser
      >
        <RestaurantCategoryForm
          onSubmit={(data: CategoryFormData) => onSubmit(data)}
          setOpen={setEditOpen}
          buttonTitle="Редактировать"
          category={category}
        />
      </BottomDrawerStyle>
      )
}
      {
  isLaptop
  && (
  <DialogForm
    open={editOpen}
    onClose={() => setEditOpen(false)}
    onOpen={() => setEditOpen(true)}
    title={category.name}
    hasCloser
    maxWidth="sm"
  >
    <Box display="flex" flexDirection="column" height="100%">
      <Typography variant="subtitle2">Создайте категорию</Typography>
      <Typography variant="body2" color="grey.600">
        Укажите название категории
      </Typography>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <RestaurantCategoryForm
          onSubmit={(data: CategoryFormData) => onSubmit(data)}
          setOpen={setEditOpen}
          buttonTitle="Редактировать"
          category={category}
        />
      </Box>
    </Box>
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
