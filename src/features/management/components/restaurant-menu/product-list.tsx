import React, { useState } from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { ManagementLayoutButton } from '~/layouts/management';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { RestaurantProductAdd } from './product-add';
import { RestaurantProductCard } from './product-card';

export function RestaurantProductList() {
  const { restaurantId, categoryId } = useParams();

  const { category } = useParams();

  const [addDish, setAddDish] = useState(false);

  const { data: products = [] } = productsApi.endpoints.getProducts.useQuery(Number(categoryId));

  const isCategoryEmpty = products.length === 0;
  return (
    <ManagementLayoutButton title={category}>
      <>
        {isCategoryEmpty && (
          <Typography variant="h6" align="center">
            Нету созданных товаров
          </Typography>
        )}
        {!isCategoryEmpty && (
          <Box sx={{ mt: 3 }}>
            {products.filter((product) => !product.isDeleted).map((product) => (
              <RestaurantProductCard key={product.id} product={product} />
            ))}
            <BoxStyle>
              <Button variant="contained" size="large" onClick={() => setAddDish(true)}>
                Добавить блюдо
              </Button>
            </BoxStyle>
            <RestaurantProductAdd open={addDish} setOpen={setAddDish} category={category} />
          </Box>
        )}
      </>
    </ManagementLayoutButton>
  );
}
const BoxStyle = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT + 16,
});
