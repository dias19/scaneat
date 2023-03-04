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
import { useResponsive } from '~/hooks/useResponsive';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { Category, CategoryFormData } from '../../types';
import { NavigateBack } from '../navigate-back';
import { RestaurantCategoryAdd } from './category-add';
import { CategoryCard } from './category-card';

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

  const isDesktop = useResponsive('up', 'sm');

  const isShownDesktop = !isError && !isLoading && isDesktop;

  const isShownMobile = !isError && !isLoading && !isDesktop;

  const handleAdd = async (data:CategoryFormData) => {
    await addCategory({
      restaurantId,
      isActive: true,
      ...data,

    });
    setAddOpen(false);
  };

  const handleOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    setAddOpen(false);
  };

  return (
    <>
      <CircularLoader isLoading={isLoading} />
      {isShownMobile && (
      <CategoryListMobile
        categories={categories}
        addOpen={addOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        restaurantId={restaurantId}
        handleAdd={handleAdd}
      />
      )}

      {isShownDesktop && (
        <CategoryListDesktop
          categories={categories}
          addOpen={addOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          restaurantId={restaurantId}
          handleAdd={handleAdd}
        />
      )}
    </>
  );
}

type CategoryProps={
  categories: Category[],
  onClose: VoidFunction,
  onOpen: VoidFunction,
  addOpen: boolean,
  handleAdd: (data: CategoryFormData) => void,
  restaurantId: number,
}

function CategoryListDesktop({
  categories,
  onClose,
  onOpen,
  addOpen,
  handleAdd,
  restaurantId,
}:CategoryProps) {
  const isCategoriesEmpty = categories.length === 0;
  return (
    <Container>
      <NavigateBack />
      <Typography variant="h6" sx={{ mb: 3 }}>
        Категории меню
      </Typography>
      <Button variant="contained" size="large" onClick={onOpen}>
        Добавить Категорию
      </Button>
      <Box sx={{ mt: 3, width: 358 }}>
        {isCategoriesEmpty
        && (
        <Typography variant="h6">
          Нету созданных категорий
        </Typography>
        )}
        {categories.filter((category) => !category.isDeleted).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            restaurantId={restaurantId}
          />
        ))}
        <RestaurantCategoryAdd
          open={addOpen}
          onClose={onClose}
          onOpen={onOpen}
          handleAdd={handleAdd}
        />
      </Box>
    </Container>
  );
}

function CategoryListMobile(
  {
    categories,
    onClose,
    onOpen,
    addOpen,
    handleAdd,
    restaurantId,
  }:CategoryProps,
) {
  const isCategoriesEmpty = categories.length === 0;
  return (
    <BoxStyle>
      {isCategoriesEmpty
        && (
        <Typography variant="h6" align="center">
          Нету созданных категорий
        </Typography>
        )}
      {categories.filter((category) => !category.isDeleted).map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          restaurantId={restaurantId}
        />
      ))}
      <BoxButtonStyle>
        <Button variant="contained" size="large" onClick={onOpen}>
          Добавить Категорию
        </Button>
      </BoxButtonStyle>
      <RestaurantCategoryAdd
        open={addOpen}
        onClose={onClose}
        onOpen={onOpen}
        handleAdd={handleAdd}
      />
    </BoxStyle>
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
