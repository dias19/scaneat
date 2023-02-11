import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

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
  const isLaptop = useResponsive('up', 'sm');

  return (
    <>
      {
      !isLaptop
      && (
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
      )
    }
      {
      isLaptop
      && (
        <DialogForm
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
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
                setOpen={setOpen}
                onSubmit={handleAdd}
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
