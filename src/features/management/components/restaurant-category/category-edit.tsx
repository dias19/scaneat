import React from 'react';

import { Box, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Category, CategoryFormData, RestarauntModifyActions } from '../../types';
import { RestaurantCategoryForm } from './category-form';

type CategoryEditProps = {
  editOpen: boolean;
  handleAction: (action: RestarauntModifyActions) => void,
  category: Category;
  onClose: VoidFunction
};

export function RestaurantCategoryEdit({
  editOpen,
  handleAction,
  category,
  onClose,
}: CategoryEditProps) {
  const [editCategory] = categoryApi.endpoints.editCategory.useMutation();

  const isDesktop = useResponsive('up', 'sm');

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const handleCategoryEdit = async (data: CategoryFormData) => {
    await editCategory({
      restaurantId,
      categoryId: category.id,
      isActive: true,
      ...data,
    });
    handleAction(null);
    onClose();
  };
  return (
    <>
      {!isDesktop && (
        <CategoryEditMobile
          editOpen={editOpen}
          handleAction={handleAction}
          category={category}
          handleCategoryEdit={handleCategoryEdit}
        />
      )}
      {isDesktop && (
        <CategoryEditDesktop
          editOpen={editOpen}
          handleAction={handleAction}
          category={category}
          handleCategoryEdit={handleCategoryEdit}
        />
      )}
    </>
  );
}

type EditProps = Pick<CategoryEditProps, 'category' | 'editOpen' | 'handleAction'> & {
  handleCategoryEdit: (data: CategoryFormData) => void;
};

function CategoryEditDesktop({
  editOpen, category, handleAction, handleCategoryEdit,
}: EditProps) {
  const handleClose = () => {
    handleAction(null);
  };

  const handleOpen = () => {
    handleAction('edit');
  };

  return (
    <DialogForm
      open={editOpen}
      onClose={handleClose}
      onOpen={handleOpen}
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
            onSubmit={handleCategoryEdit}
            onCloseForm={handleClose}
            buttonTitle="Редактировать"
            category={category}
          />
        </Box>
      </Box>
    </DialogForm>
  );
}

function CategoryEditMobile({
  editOpen, category, handleAction, handleCategoryEdit,
}: EditProps) {
  const handleClose = () => {
    handleAction(null);
  };

  const handleOpen = () => {
    handleAction('edit');
  };

  return (
    <BottomDrawerStyle
      open={editOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      title={category.name}
      hasCloser
    >
      <RestaurantCategoryForm
        onSubmit={handleCategoryEdit}
        onCloseForm={handleClose}
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
