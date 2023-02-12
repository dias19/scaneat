import React, { useState } from 'react';

import {
  Box, Card, CardActionArea, CardContent, IconButton, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';
import { useResponsive } from '~/hooks/useResponsive';
import { PATH_MANAGEMENT } from '~/routes/paths';

import { Category } from '../../types';
import { RestaurantCategoryModifyActions } from './category-modify-actions';

type CardMobileProps={
    category: Category,
    restaurantId: number,
}

export function CategoryCard({
  category,
  restaurantId,
}:CardMobileProps) {
  const [cardDisableRipple, setCardDisableRipple] = useState(false);

  const [actionsOpen, setActionsOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const navigate = useNavigate();

  const isLaptop = useResponsive('up', 'sm');

  const handleClick = (e : React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCardDisableRipple(true);
    if (isLaptop && e.target instanceof Element) setAnchorEl(e.target);
    setActionsOpen(true);
  };
  const handleNavigate = () => {
    navigate(
      PATH_MANAGEMENT
        .menuItems(restaurantId, category.id),
      { state: { category } },
    );
  };
  return (
    <>
      <Card key={category.name} sx={{ mb: 2 }}>
        <CardActionArea
          disableRipple={cardDisableRipple}
          onClick={handleNavigate}
        >
          <CardContentStyle>
            <Typography>
              {category.name}
              {' '}
              {`(${category.numberOfProducts})`}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <IconButton
                onClick={handleClick}
              >
                <Iconify icon="material-symbols:more-vert" sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Box>
          </CardContentStyle>
        </CardActionArea>
      </Card>
      <RestaurantCategoryModifyActions
        open={actionsOpen}
        setOpen={setActionsOpen}
        category={category}
        anchorEl={anchorEl}
      />
    </>
  );
}
const CardContentStyle = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  maxHeight: 56,
  display: 'flex',
  alignItems: 'center',
}));
