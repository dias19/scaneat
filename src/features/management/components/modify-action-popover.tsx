import React from 'react';

import {
  Card, CardActionArea, Typography, CardContent, styled,
} from '@mui/material';

import { Iconify } from '~/components/Iconify';
import MenuPopover from '~/components/MenuPopover';

type ModifyActionPopoverProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  setEditOpen: (state: boolean) => void;
  setDeleteOpen: (state: boolean) => void;
  anchorEl?: Element | null;
};

export function ModifyActionPopover({
  open,
  setOpen,
  setEditOpen,
  setDeleteOpen,
  anchorEl,
}: ModifyActionPopoverProps) {
  const handleEdit = () => {
    setEditOpen(true);
    setOpen(false);
  };

  const handleDelete = () => {
    setDeleteOpen(true);
    setOpen(false);
  };
  return (
    <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorEl}>
      <Card sx={{ boxShadow: 'none', mb: 2, width: 'auto' }}>
        <CardActionArea
          onClick={handleEdit}
        >
          <CardContentStyle>
            <Iconify icon="material-symbols:edit" sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2">Редактировать</Typography>
          </CardContentStyle>
        </CardActionArea>
      </Card>
      <Card sx={{ boxShadow: 'none' }}>
        <CardActionArea
          onClick={handleDelete}
        >
          <CardContentStyle>
            <Iconify icon="material-symbols:delete" sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2">Удалить</Typography>
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
