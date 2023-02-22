import React from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Category, RestarauntModifyActions } from '../../types';

type CategoryDeleteProps = {
  category: Category;
  deleteOpen: boolean;
  handleAction: (action: RestarauntModifyActions) => void;
  onClose: VoidFunction;
};

export function RestaurantCategoryDelete({
  category,
  deleteOpen,
  handleAction,
  onClose,
}: CategoryDeleteProps) {
  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const isDesktop = useResponsive('up', 'sm');

  const [deleteCategory] = categoryApi.endpoints.deleteCategory.useMutation();

  const handleDeleteCategory = async () => {
    await deleteCategory({
      restaurantId,
      categoryId: category.id,
    });
    handleAction(null);
    onClose();
  };

  return (
    <>
      {!isDesktop && (
        <CategoryDeleteMobile
          deleteOpen={deleteOpen}
          handleAction={handleAction}
          category={category}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
      {isDesktop && (
        <CategoryDeleteDesktop
          deleteOpen={deleteOpen}
          handleAction={handleAction}
          category={category}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
    </>
  );
}

type DeleteProps = Pick<CategoryDeleteProps, 'category' | 'deleteOpen' | 'handleAction'> & {
  handleDeleteCategory: () => void;
};

function CategoryDeleteDesktop({
  deleteOpen,
  handleAction,
  category,
  handleDeleteCategory,
}: DeleteProps) {
  const handleClose = () => {
    handleAction(null);
  };

  return (
    <DialogForm
      open={deleteOpen}
      onClose={handleClose}
      onOpen={() => handleAction('delete')}
      title="Создать категорию"
      hasCloser
      maxWidth="xs"
    >
      <Box>
        <Typography variant="subtitle2">
          Вы уверены что хотите удалить категорию
          {' '}
          {category.name}
        </Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть это категорию
        </Typography>
        <BoxButtonStyle>
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="contained" size="large" onClick={handleDeleteCategory} color="error">
            Удалить
          </Button>
        </BoxButtonStyle>
      </Box>
    </DialogForm>
  );
}

function CategoryDeleteMobile({
  deleteOpen,
  handleAction,
  category,
  handleDeleteCategory,
}: DeleteProps) {
  const handleClose = () => {
    handleAction(null);
  };

  return (
    <BottomDrawer
      open={deleteOpen}
      onClose={handleClose}
      onOpen={() => handleAction('delete')}
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
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="contained" size="large" onClick={handleDeleteCategory}>
            Удалить
          </Button>
        </Box>
      </Box>
    </BottomDrawer>
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
