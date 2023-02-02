import React from 'react';

import {
  Card, CardActionArea, Typography, Box, IconButton, Divider, styled, CardContent,
} from '@mui/material';

import { BottomDrawer } from './bottom-drawer';
import { Iconify } from './Iconify';

type BottomDrawerEditProps={
    open: boolean,
    setOpen: (state: boolean)=> void,
    setOpenEdit: (state: boolean)=> void,
    setOpenDelete: (state: boolean)=> void,
    title: string,
}
export function BottomDrawerEdit({
  open, setOpen, setOpenEdit, setOpenDelete, title,
}:BottomDrawerEditProps) {
  return (
    <BottomDrawer
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={title}
    >
      <Card sx={{ boxShadow: 'none', mb: 2 }}>
        <CardActionArea onClick={() => {
          setOpen(false);
          setOpenEdit(true);
        }}
        >
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
        <CardActionArea onClick={() => {
          setOpen(false);
          setOpenDelete(true);
        }}
        >
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
