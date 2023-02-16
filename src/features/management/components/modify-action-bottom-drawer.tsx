import React from 'react';

import {
  Card, CardActionArea, Typography, Box, IconButton, Divider, styled, CardContent,
} from '@mui/material';

import { BottomDrawer } from '../../../components/bottom-drawer';
import { Iconify } from '../../../components/Iconify';

type BottomDrawerEditProps={
    open: boolean,
    setOpen: (state: boolean)=> void,
    setEditOpen: (state: boolean)=> void,
    setDeleteOpen: (state: boolean)=> void,
    title: string,
}

export function ModifyActionBottomDrawer({
  open, setOpen, setEditOpen, setDeleteOpen, title,
}:BottomDrawerEditProps) {
  const handleEdit = () => {
    setOpen(false);
    setEditOpen(true);
  };

  const handleDelete = () => {
    setOpen(false);
    setDeleteOpen(true);
  };

  return (
    <BottomDrawer
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={title}
      hasCloser
    >
      <Card sx={{ boxShadow: 'none', mb: 2 }}>
        <CardActionArea onClick={handleEdit}>
          <CardContentStyle>
            <Iconify icon="material-symbols:edit" sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2">
              Редактировать
            </Typography>
            <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
              <IconButton>
                <Iconify icon="material-symbols:chevron-right" sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Box>
          </CardContentStyle>
        </CardActionArea>
      </Card>
      <Divider />
      <Card sx={{ boxShadow: 'none', mt: 2 }}>
        <CardActionArea onClick={handleDelete}>
          <CardContentStyle>
            <Iconify icon="material-symbols:delete" sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2">
              Удалить
            </Typography>
            <Box display="flex" justifyContent="end" sx={{ flexGrow: 1 }}>
              <IconButton>
                <Iconify icon="material-symbols:chevron-right" sx={{ width: 24, height: 24 }} />
              </IconButton>
            </Box>
          </CardContentStyle>
        </CardActionArea>
      </Card>
    </BottomDrawer>
  );
}
const CardContentStyle = styled(CardContent)({
  padding: 0,
  display: 'flex',
  alignItems: 'center',
});
