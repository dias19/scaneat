import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';

import { CategoryFormData } from '../../types';
import { RestaurantCategoryForm } from './category-form';

type AddCategoryProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  handleAdd: (data:CategoryFormData) => void
};

export function RestaurantCategoryAdd({
  open, setOpen, handleAdd,
}: AddCategoryProps) {
  return (
    <BottomDrawerStyle
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
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
            setOpen={setOpen}
            onSubmit={handleAdd}
          />
        </Box>
      </Box>
    </BottomDrawerStyle>
  );
}
const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
