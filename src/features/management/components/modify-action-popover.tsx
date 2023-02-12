import React from 'react';

import {
  Card, CardActionArea, Typography, CardContent, styled,
} from '@mui/material';

import { Iconify } from '~/components/Iconify';
import MenuPopover from '~/components/MenuPopover';

type ModifyActionPopoverProps={
    open: boolean,
    setOpen: (state: boolean) => void,
    setOpenEdit: (state: boolean) => void,
   setOpenDelete: (state: boolean) => void,
    anchorEl?: Element | null,
}

export function ModifyActionPopover({
  open,
  setOpen,
  setOpenEdit,
  setOpenDelete,
  anchorEl,
}:ModifyActionPopoverProps) {
  return (
    <MenuPopover
      open={open}
      onClose={() => setOpen(false)}
      anchorEl={anchorEl}
    >
      <Card sx={{ boxShadow: 'none', mb: 2, width: 'auto' }}>
        <CardActionArea onClick={() => {
          setOpenEdit(true);
          setOpen(false);
        }}
        >
          <CardContentStyle>
            <Iconify icon="material-symbols:edit" sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2">
              Редактировать
            </Typography>
          </CardContentStyle>
        </CardActionArea>
      </Card>
      <Card sx={{ boxShadow: 'none' }}>
        <CardActionArea onClick={() => {
          setOpenDelete(true);
          setOpen(false);
        }}
        >
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
