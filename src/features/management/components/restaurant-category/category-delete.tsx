import React from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Category } from '../../types';

type CategoryDeleteProps = {
  category: Category;
  deleteOpen: boolean;
  setDeleteOpen: (state: boolean) => void;
  setActionsOpen: (state: boolean) => void;
};

export function RestaurantCategoryDelete({
  category,
  deleteOpen,
  setDeleteOpen,
  setActionsOpen,
}: CategoryDeleteProps) {
  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const isLaptop = useResponsive('up', 'sm');

  const [deleteCategory] = categoryApi.endpoints.deleteCategory.useMutation();

  const handleDeleteCategory = async () => {
    await deleteCategory({
      restaurantId,
      categoryId: category.id,
    });
    setDeleteOpen(false);
    setActionsOpen(false);
  };

  return (
    <>
      {!isLaptop && (
        <CategoryDeleteMobile
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          category={category}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
      {isLaptop && (
        <CategoryDeleteLaptop
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          category={category}
          handleDeleteCategory={handleDeleteCategory}
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

type DeleteProps = Pick<CategoryDeleteProps, 'category' | 'deleteOpen' | 'setDeleteOpen'> & {
  handleDeleteCategory: () => void;
};

function CategoryDeleteLaptop({
  deleteOpen,
  setDeleteOpen,
  category,
  handleDeleteCategory,
}: DeleteProps) {
  const handleClose = () => {
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
  setDeleteOpen,
  category,
  handleDeleteCategory,
}: DeleteProps) {
  const handleClose = () => {
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
