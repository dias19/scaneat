import React from 'react';

import {
  Box, IconButton, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';

type HeaderProps={
    title?:string
}

export function BackButtonHeader({ title }:HeaderProps) {
  const navigate = useNavigate();
  return (
    <BoxStyle>
      <IconButton onClick={() => navigate(-1)}>
        <Iconify
          icon="material-symbols:chevron-left-rounded"
          sx={{ width: '24px', height: '24px' }}
        />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }} align="center">
        {title}
      </Typography>
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  backgroundColor: 'white',
  position: 'fixed',
  width: '100%',
  border: '1px',
  top: 0,
  zIndex: theme.zIndex.appBar,
  minHeight: 56,
}));
