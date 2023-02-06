import React from 'react';

import { styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { BottomDrawer } from '~/components/bottom-drawer';

import { Category, CategoryFormData } from '../../types';
import { RestaurantCategoryForm } from './category-form';

type CategoryEditProps={
    editOpen: boolean,
    setEditOpen: (state: boolean) => void,
    category:Category
}

export function RestaurantCategoryEdit({ editOpen, setEditOpen, category }: CategoryEditProps) {
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
  }
  return (
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
  );
}
const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));