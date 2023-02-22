import React, { useState } from 'react';

import {
  Typography, Button, Box, styled,
} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { CircularLoader } from '~/components/Circular Loader';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { RestaurantProductAdd } from './product-add';
import { RestaurantProductCard } from './product-card';

interface LocationState {
    categoryName: string;
  }

export function RestaurantProductsListMobile() {
  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const categoryId = parseInt(parameters.categoryId as string, 10);

  const location = useLocation();

  const { categoryName } = location.state as LocationState;

  const [addOpen, setAddOpen] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
  } = productsApi.endpoints.getProducts.useQuery({
    restaurantId,
    categoryId,
  });

  const isCategoryEmpty = products.length === 0;

  const isShown = !isError && !isLoading && !isCategoryEmpty;

  const isShownEmpty = !isError && !isLoading && isCategoryEmpty;

  const handleOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    setAddOpen(false);
  };

  return (
    <>
      <CircularLoader isLoading={isLoading} />
      {isShownEmpty && (
        <>
          <Typography variant="h6" align="center">
            Нету созданных товаров
          </Typography>
          <BoxStyle>
            <Button variant="contained" size="large" onClick={handleOpen}>
              Добавить блюдо
            </Button>
          </BoxStyle>
          <RestaurantProductAdd
            open={addOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            category={categoryName}
          />
        </>
      )}
      {isShown && (
        <BoxProductsStyle sx={{ mt: 3, mr: 2, ml: 2 }}>
          {products
            .filter((product) => !product.isDeleted)
            .map((product) => (
              <RestaurantProductCard key={product.id} product={product} />
            ))}
          <BoxStyle>
            <Button variant="contained" size="large" onClick={handleOpen}>
              Добавить блюдо
            </Button>
          </BoxStyle>
          <RestaurantProductAdd
            open={addOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            category={categoryName}
          />
        </BoxProductsStyle>
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

const BoxProductsStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(2),
  },
}));
