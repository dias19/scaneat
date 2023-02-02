import React, { useState } from 'react';

import {
  Box,
  Button,
  styled,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { ManagementLayoutButton } from '~/layouts/management';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { RestaurantCategoryAdd } from './category-add';
import { RestaurantCategoryCard } from './category-card';

export function RestaurantCategories() {
  const { id } = useParams();

  const [addOpen, setAddOpen] = useState(false);

  const skip = Number.isNaN(Number(id));

  const {
    data: categories = [],
  } = categoryApi.endpoints.getCategories.useQuery(Number(id), {
    skip,
  });

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
