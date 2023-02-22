import React, { useState } from 'react';

import {
  Typography, Button, Box, styled, Container,
} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { CircularLoader } from '~/components/Circular Loader';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { Category } from '../../types';
import { NavigateBack } from '../navigate-back';
import { RestaurantProductAdd } from './product-add';
import { RestaurantProductCard } from './product-card';

interface LocationState {
    category: Category;
  }

export function RestaurantProductsListDesktop() {
  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const categoryId = parseInt(parameters.categoryId as string, 10);

  const location = useLocation();

  const { category } = location.state as LocationState;

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

  const isShownEmpty = !isError && !isLoading && isCategoryEmpty;

  const isShown = !isError && !isLoading && !isCategoryEmpty;

  const handleOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    setAddOpen(false);
  };

  return (
    <Container>
      <CircularLoader isLoading={isLoading} />
      <Box display="flex" flexDirection="column" sx={{ mt: 3 }}>
        <NavigateBack />
        {isShownEmpty && (
        <>
          <Typography>
            {category.name}
            {' '}
            {`(${category.numberOfProducts})`}
          </Typography>
          <Typography variant="h6" align="center">
            Нету созданных товаров
          </Typography>
          <BoxStyle>
            <Button variant="contained" size="large" onClick={() => setAddOpen(true)}>
              Добавить блюдо
            </Button>
          </BoxStyle>
          <RestaurantProductAdd
            open={addOpen}
            onClose={handleClose}
            onOpen={handleOpen}
          />
        </>
        )}

        {isShown && (
          <>
            <Typography variant="h6">
              {category.name}
              {' '}
              {`(${category.numberOfProducts})`}
            </Typography>
            <BoxStyle>
              <Button variant="contained" size="large" onClick={() => setAddOpen(true)}>
                Добавить блюдо
              </Button>
            </BoxStyle>
            <BoxProductsStyle>
              {products
                .filter((product) => !product.isDeleted)
                .map((product) => (
                  <RestaurantProductCard key={product.id} product={product} />
                ))}
              <RestaurantProductAdd
                open={addOpen}
                onClose={handleClose}
                onOpen={handleOpen}
              />
            </BoxProductsStyle>
          </>
        )}
      </Box>
    </Container>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  bottom: BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT + 16,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const BoxProductsStyle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(2),
  },
}));
