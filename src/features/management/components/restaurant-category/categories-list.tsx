import React, { useState } from 'react';

import {
  Box,
  Button,
  Container,
  styled,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { CircularLoader } from '~/components/Circular Loader';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { CategoryFormData } from '../../types';
import { NavigateBack } from '../navigate-back';
import { RestaurantCategoryAdd } from './category-add';
import { RestaurantCategoryCard } from './category-card';
import { RestaurantCategoryForm } from './category-form';

export function RestaurantCategories() {
  const parameters = useParams();

  const [addCategory] = categoryApi.endpoints.addCategory.useMutation();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const [addOpen, setAddOpen] = useState(false);

  const skip = !restaurantId;

  const {
    data: categories = [], isLoading, isError,
  } = categoryApi.endpoints.getCategories.useQuery(Number(restaurantId), {
    skip,
  });
  const isLaptop = useResponsive('up', 'sm');

  const handleAdd = async (data:CategoryFormData) => {
    await addCategory({
      restaurantId,
      isActive: true,
      ...data,

    });
    setAddOpen(false);
  };

  return (
    <>
      <CircularLoader isLoading={isLoading} />
      {(!isError && !isLoading && !isLaptop) && (
      <BoxStyle>
        {categories.filter((category) => !category.isDeleted).map((category) => (
          <RestaurantCategoryCard
            key={category.id}
            category={category}
            restaurantId={restaurantId}
          />
        ))}
        <BoxButtonStyle>
          <Button variant="contained" size="large" onClick={() => setAddOpen(true)}>
            Добавить Категорию
          </Button>
        </BoxButtonStyle>
        <RestaurantCategoryAdd
          open={addOpen}
          setOpen={setAddOpen}
          handleAdd={handleAdd}
        />
      </BoxStyle>
      )}
      {(!isError && !isLoading && isLaptop) && (
        <Container sx={{ mt: 3 }}>
          <NavigateBack />
          <Typography variant="h6" sx={{ mb: 3 }}>
            Категории меню
          </Typography>
          <Button variant="contained" size="large" onClick={() => setAddOpen(true)}>
            Добавить Категорию
          </Button>
          <Box sx={{ mt: 3, width: 358 }}>
            {categories.filter((category) => !category.isDeleted).map((category) => (
              <RestaurantCategoryCard
                key={category.id}
                category={category}
                restaurantId={restaurantId}
              />
            ))}
            <DialogForm
              open={addOpen}
              onClose={() => setAddOpen(false)}
              onOpen={() => setAddOpen(true)}
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
                    setOpen={setAddOpen}
                    onSubmit={handleAdd}
                  />
                </Box>
              </Box>
            </DialogForm>
          </Box>
        </Container>
      )}
    </>
  );
}
const BoxButtonStyle = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: (BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT + 16),
});

const BoxStyle = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(1),
}));
