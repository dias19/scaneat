import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { CategoryFormData } from '../../types';
import { RestaurantCategoryForm } from './category-form';

type Props = {
  open: boolean;
  onClose: VoidFunction,
  onOpen: VoidFunction,
  handleAdd: (data:CategoryFormData) => void
};

export function RestaurantCategoryAdd({
  open, onClose, onOpen, handleAdd,
}: Props) {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <>
      {
      !isDesktop
      && (
        <CategoryAddMobile
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          handleAdd={handleAdd}
        />
      )
    }
      {
      isDesktop
      && (
        <CategoryAddDesktop
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          handleAdd={handleAdd}
        />
      )
    }
    </>
  );
}

function CategoryAddMobile({
  open,
  onClose,
  onOpen,
  handleAdd,
}:Props) {
  return (
    <BottomDrawerStyle
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      title="Создать категорию"
      hasCloser
    >
      <Box display="flex" flexDirection="column" height="100%">
        <Typography variant="subtitle2">Создайте категорию</Typography>
        <Typography variant="body2" color="grey.600">
          Укажите название категории
        </Typography>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <RestaurantCategoryForm
            buttonTitle="Создать"
            onCloseForm={onClose}
            onSubmit={handleAdd}
          />
        </Box>
      </Box>
    </BottomDrawerStyle>
  );
}

function CategoryAddDesktop({
  open,
  onClose,
  onOpen,
  handleAdd,
}:Props) {
  return (
    <DialogForm
      open={open}
      onClose={onClose}
      onOpen={onOpen}
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
            buttonTitle="Создать"
            onCloseForm={onClose}
            onSubmit={handleAdd}
          />
        </Box>
      </Box>
    </DialogForm>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
