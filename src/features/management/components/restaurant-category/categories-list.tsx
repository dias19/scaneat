import React, { useState } from 'react';

import {
  Box,
  Button,
  styled,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { ManagementLayoutButton } from '~/layouts/management';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';
import { PATH_PAGE } from '~/routes/paths';

import { RestaurantCategoryAdd } from './category-add';
import { RestaurantCategoryCard } from './category-card';

export function RestaurantCategories() {
  const { id } = useParams();

  const [addOpen, setAddOpen] = useState(false);

  const navigate = useNavigate();

  const {
    data: categories = [],
    isLoading, isError,
  } = categoryApi.endpoints.getCategories.useQuery(Number(id));
  if (isError) {
    navigate(PATH_PAGE.page500);
  }
  return (
    <ManagementLayoutButton title="Menu">
      <Box sx={{ mt: 4, borderRadius: 1 }}>
        {categories.filter((category) => !category.isDeleted).map((category) => (
          <RestaurantCategoryCard key={category.id} category={category} restaurantId={id} />
        ))}
        <BoxStyle>
          <Button variant="contained" size="large" onClick={() => setAddOpen(true)}>
            Добавить Категорию
          </Button>
        </BoxStyle>
        <RestaurantCategoryAdd open={addOpen} setOpen={setAddOpen} id={Number(id)} />
      </Box>
    </ManagementLayoutButton>
  );
}
const BoxStyle = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: (BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT + 16),
});
