import React, { useState } from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { CircularLoader } from '~/components/Circular Loader';
import { ManagementStackLayout } from '~/layouts/management';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { RestaurantProductAdd } from './product-add';
import { RestaurantProductCard } from './product-card';

interface LocationState {
  categoryName: string;
}

export function RestaurantProductList() {
  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const categoryId = parseInt(parameters.categoryId as string, 10);

  const location = useLocation();

  const { categoryName } = location.state as LocationState;

  const [addDish, setAddDish] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
  } = productsApi.endpoints.getProducts.useQuery({
    restaurantId,
    categoryId,
  });

  const isCategoryEmpty = products.length === 0;
  return (
    <>
      <CircularLoader isLoading={isLoading} />
      {!isError && !isLoading && (
        <ManagementStackLayout title={categoryName}>
          <>
            {isCategoryEmpty && (
              <Typography variant="h6" align="center">
                Нету созданных товаров
              </Typography>
            )}

            {!isCategoryEmpty && (
              <Box sx={{ mt: 3 }}>
                {products
                  .filter((product) => !product.isDeleted)
                  .map((product) => (
                    <RestaurantProductCard key={product.id} product={product} />
                  ))}
                <BoxStyle>
                  <Button variant="contained" size="large" onClick={() => setAddDish(true)}>
                    Добавить блюдо
                  </Button>
                </BoxStyle>
                <RestaurantProductAdd open={addDish} setOpen={setAddDish} category={categoryName} />
              </Box>
            )}
          </>
        </ManagementStackLayout>
      )}
    </>
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
