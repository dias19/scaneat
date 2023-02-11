import React, { useState } from 'react';

import {
  Box, Card, CardContent, IconButton, styled, Typography,
} from '@mui/material';

import { Iconify } from '~/components/Iconify';
import { Image } from '~/components/image';
import { useResponsive } from '~/hooks/useResponsive';

import { Product } from '../../types';
import { RestaurantProductModifyActions } from './product-modify-actions';

type ItemCardProps = {
  product: Product
};

export function RestaurantProductCard({ product }: ItemCardProps) {
  const [isMoreActive, setActiveMore] = useState(false);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const isLaptop = useResponsive('up', 'sm');

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isLaptop && e.target instanceof Element) setAnchorEl(e.target);
    setActiveMore(true);
  };
  return (
    <>
      <CardStyle>
        <CardContentStyle>
          <ImageStyle
            url={product.originalUrl}
            alt={product.name}
            style={{
              height: 96,
              width: 96,
              marginRight: 16,
            }}
          />
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography
                variant="h6"
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                }}
              >
                {product.name}

              </Typography>
              <IconButton onClick={handleClick}>
                <Iconify
                  icon="material-symbols:more-vert"
                  sx={{ width: 24, height: 24, color: 'grey.700' }}
                />
              </IconButton>
            </Box>
            <Typography
              variant="caption"
              component="p"
              color="grey.600"
              sx={{
                flexGrow: 1,
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {product.description}
            </Typography>
            <Typography variant="body2" component="p">
              {product.price}
            </Typography>
          </Box>
        </CardContentStyle>
      </CardStyle>
      <RestaurantProductModifyActions
        open={isMoreActive}
        setOpen={setActiveMore}
        product={product}
        anchorEl={isLaptop ? anchorEl : null}
      />
    </>
  );
}

const ImageStyle = styled(Image)({
  width: 96,
  height: 96,
});

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
  },
}));
