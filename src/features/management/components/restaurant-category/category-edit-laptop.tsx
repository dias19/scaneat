import React from 'react';

import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { DialogForm } from '~/components/Dialog';

import { Category, CategoryFormData } from '../../types';
import { RestaurantCategoryForm } from './category-form';

type CategoryEditLaptopProps={
    category: Category,
    setEditOpen: (state: boolean) => void,
    setActionsOpen: (state: boolean) => void,
    editOpen: boolean,
}
export function RestaurantCategoryEditLaptop({
  category,
  setEditOpen,
  setActionsOpen,
  editOpen,
}: CategoryEditLaptopProps) {
  const [editCategory] = categoryApi.endpoints.editCategory.useMutation();

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
    <DialogForm
      open={editOpen}
      onClose={() => setEditOpen(false)}
      onOpen={() => setEditOpen(true)}
      title="Создать категорию"
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
  );
}
