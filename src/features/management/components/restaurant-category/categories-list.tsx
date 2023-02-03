import React, { useState } from 'react';

import {
  Box,
  Button,
  styled,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import categoryApi from '~/api/category/api';
import { CircularLoader } from '~/components/Circular Loader';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { RestaurantCategoryAdd } from './category-add';
import { RestaurantCategoryCard } from './category-card';

export function RestaurantCategories() {
  const { id } = useParams();

  const [addOpen, setAddOpen] = useState(false);

  const skip = Number.isNaN(Number(id));

  const {
    data: categories = [], isLoading, isError,
  } = categoryApi.endpoints.getCategories.useQuery(Number(id), {
    skip,
  });

  return (
    <>
      <CircularLoader isLoading={isLoading} />
      {(!isError && !isLoading) && (
      <BoxStyle>
        {categories.filter((category) => !category.isDeleted).map((category) => (
          <RestaurantCategoryCard key={category.id} category={category} restaurantId={id} />
        ))}
        <BoxButtonStyle>
          <Button variant="contained" size="large" onClick={() => setAddOpen(true)}>
            Добавить Категорию
          </Button>
        </BoxButtonStyle>
        <RestaurantCategoryAdd open={addOpen} setOpen={setAddOpen} id={Number(id)} />
      </BoxStyle>
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
