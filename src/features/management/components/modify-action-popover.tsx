import React from 'react';

import {
  Card, CardActionArea, Typography, CardContent, styled,
} from '@mui/material';

import { Iconify } from '~/components/Iconify';
import MenuPopover from '~/components/MenuPopover';

type ModifyActionPopoverProps={
    actionsOpen: boolean,
    setActionsOpen: (state: boolean) => void,
    setEditOpen: (state: boolean) => void,
    setDeleteOpen: (state: boolean) => void,
    anchorEl: Element | null,
}

export function ModifyActionPopover({
  actionsOpen,
  setActionsOpen,
  setEditOpen,
  setDeleteOpen,
  anchorEl,
}:ModifyActionPopoverProps) {
  return (
    <MenuPopover
      open={actionsOpen}
      onClose={() => setActionsOpen(false)}
      anchorEl={anchorEl}
    >
      <Card sx={{ boxShadow: 'none', mb: 2, width: 'auto' }}>
        <CardActionArea onClick={() => setEditOpen(true)}>
          <CardContentStyle>
            <Iconify icon="material-symbols:edit" sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2">
              Редактировать
            </Typography>
          </CardContentStyle>
        </CardActionArea>
      </Card>
      <Card sx={{ boxShadow: 'none' }}>
        <CardActionArea onClick={() => setDeleteOpen(true)}>
          <CardContentStyle>
            <Iconify icon="material-symbols:delete" sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2">
              Удалить
            </Typography>
          </CardContentStyle>
        </CardActionArea>
      </Card>
    </MenuPopover>
  );
}

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  width: 'auto',
}));
