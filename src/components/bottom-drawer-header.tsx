import React from 'react';

import { Box, Typography, IconButton } from '@mui/material';

import { Iconify } from './Iconify';

type BottomDrawerHeaderProps={
    title?:string,
    onClose:VoidFunction,
}
export function BottomDrawerHeader({ title, onClose }:BottomDrawerHeaderProps) {
  return (
    <Box display="flex" alignItems="center" sx={{ padding: 3 }}>
      <Typography variant="h5">{title}</Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={() => onClose()}>
          <Iconify icon="material-symbols:close" sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
