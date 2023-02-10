import React from 'react';

import { Box, Typography } from '@mui/material';

import { DialogForm } from '~/components/Dialog';

import { CategoryFormData } from '../../types';
import { RestaurantCategoryForm } from './category-form';

type AddRestaurantProps={
    open: boolean,
    setOpen: (state: boolean) => void,
    handleAdd: (data: CategoryFormData) => void,
}

export function RestaurantCategoryAddLaptop({
  setOpen, open, handleAdd,
}: AddRestaurantProps) {
  return (
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
  );
}
