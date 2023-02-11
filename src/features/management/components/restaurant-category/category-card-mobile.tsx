import React, { useState } from 'react';

import {
  Box, Card, CardActionArea, CardContent, IconButton, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';
import { PATH_MANAGEMENT } from '~/routes/paths';

import { Category } from '../../types';
import { ModifyActionBottomDrawer } from '../modify-action-bottom-drawer';
import { RestaurantCategoryDeleteMobile } from './category-delete-mobile';
import { RestaurantCategoryEditMobile } from './category-edit-mobile';

type CardMobileProps={
    category: Category,
    restaurantId: number,
}

export function CategoryCardMobile({
  category,
  restaurantId,
}:CardMobileProps) {
  const [cardDisableRipple, setCardDisableRipple] = useState(false);

  const [actionsOpen, setActionsOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const navigate = useNavigate();

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
              {' ('}
              {category.numberOfProducts}
              )
            </Typography>
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
                }}
              >
                <Iconify icon="material-symbols:more-vert" sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Box>
          </CardContentStyle>
        </CardActionArea>
      </Card>
      <ModifyActionBottomDrawer
        open={actionsOpen}
        setOpen={setActionsOpen}
        setOpenDelete={setDeleteOpen}
        setOpenEdit={setEditOpen}
        title={category.name}
      />
      <RestaurantCategoryEditMobile
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        category={category}
      />
      <RestaurantCategoryDeleteMobile
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        category={category}
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
