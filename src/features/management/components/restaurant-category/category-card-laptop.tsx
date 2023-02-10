import React, { useState } from 'react';

import {
  Card, CardActionArea, Typography, Box, IconButton, CardContent, styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';
import { PATH_MANAGEMENT } from '~/routes/paths';

import { Category } from '../../types';
import { ModifyActionPopover } from '../modify-action-popover';
import { RestaurantCategoryDeleteLaptop } from './category-delete-laptop';
import { RestaurantCategoryEditLaptop } from './category-edit-laptop';

type CardMobileProps={
    category: Category
    restaurantId: number,
}

export function CategoryCardLaptop({ category, restaurantId }:CardMobileProps) {
  const [cardDisableRipple, setCardDisableRipple] = useState(false);

  const [actionsOpen, setActionsOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(
      PATH_MANAGEMENT
        .menuItems(restaurantId, category.id),
      { state: { categoryName: category.name } },
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
            <Typography>{category.name}</Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setCardDisableRipple(true);
                  setActionsOpen(true);
                  if (e.target instanceof Element) {
                    setAnchorEl(e.target);
                  }
                }}
              >
                <Iconify icon="material-symbols:more-vert" sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Box>
          </CardContentStyle>
        </CardActionArea>
      </Card>
      <ModifyActionPopover
        actionsOpen={actionsOpen}
        setActionsOpen={setActionsOpen}
        setEditOpen={setEditOpen}
        setDeleteOpen={setDeleteOpen}
        anchorEl={anchorEl}
      />
      <RestaurantCategoryEditLaptop
        editOpen={editOpen}
        category={category}
        setEditOpen={setEditOpen}
        setActionsOpen={setActionsOpen}
      />
      <RestaurantCategoryDeleteLaptop
        deleteOpen={deleteOpen}
        category={category}
        setDeleteOpen={setDeleteOpen}
        setActionsOpen={setActionsOpen}
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
