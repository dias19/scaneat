import React from 'react';

import { Box, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';

export function NavigateBack() {
  const navigate = useNavigate();
  return (
    <BoxStyle onClick={() => navigate(-1)}>
      <Iconify
        icon="material-symbols:chevron-left-rounded"
        width={24}
        height={24}
        color="grey.500"
      />
      <Typography color="grey.500" variant="body2">
        Назад
      </Typography>
    </BoxStyle>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  cursor: 'default',
}));
