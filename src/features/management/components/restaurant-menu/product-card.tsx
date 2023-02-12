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
    if (isLaptop) setAnchorEl(e.target as Element);
    setActiveMore(true);
  };
  return (
    <>
      <CardStyle>
        <CardContentStyle>
          <ImageStyle
            url={product.originalUrl}
            alt={product.name}
          />
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ justifyContent: 'space-between' }}
            >
              <TypographyOneLineStyle
                variant="h6"
              >
                {product.name}

              </TypographyOneLineStyle>
              <IconButton onClick={handleClick} sx={{ padding: 0 }}>
                <Iconify
                  icon="material-symbols:more-vert"
                  sx={{ width: 24, height: 24, color: 'grey.700' }}
                />
              </IconButton>
            </Box>
            <TypographyOneLineStyle
              variant="caption"
              component="p"
              sx={{
                WebkitLineClamp: 2,
                marginTop: 1.5,
              }}
            >
              {product.description}
            </TypographyOneLineStyle>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
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

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
    width: 'auto',
  },
}));

const TypographyOneLineStyle = styled(Typography)({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
}) as typeof Typography;

const ImageStyle = styled(Image)(({ theme }) => ({
  height: 96,
  width: 96,
  marginRight: theme.spacing(2),
  flexShrink: 0,
}));
