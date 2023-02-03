import React, { useState } from 'react';

import {
  Box, Card, CardContent, IconButton, styled, Typography,
} from '@mui/material';

import { Iconify } from '~/components/Iconify';
import { API_THUMBNAIL } from '~/config';

import { ProductData } from '../../types';
import { RestaurantProductActions } from './product-actions';

type ItemCardProps = {
  product: ProductData
};

export function RestaurantProductCard({ product }: ItemCardProps) {
  const [isMoreActive, setActiveMore] = useState(false);

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContentStyle>
          <ImageStyle src={API_THUMBNAIL + product.originalUrl} alt="Something" />
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <IconButton onClick={() => setActiveMore(true)}>
                <Iconify
                  icon="material-symbols:more-vert"
                  sx={{ width: 24, height: 24, color: 'grey.700' }}
                />
              </IconButton>
            </Box>
            <Typography variant="caption" component="p" color="grey.600">
              {product.description}
            </Typography>
            <Typography variant="body2" component="p">
              {product.price}
            </Typography>
          </Box>
        </CardContentStyle>
      </Card>
      <RestaurantProductActions
        open={isMoreActive}
        setOpen={setActiveMore}
        product={product}
      />
    </>
  );
}

const ImageStyle = styled('img')(({ theme }) => ({
  width: 96,
  height: 96,
  borderRadius: 8,
  marginRight: theme.spacing(2),
}));

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));
