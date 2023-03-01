import React from 'react';

import { Box, styled } from '@mui/material';

import main from '../../../assets/images/detailsRestaurant.png';
import { LoginForm } from './login-form';

export function LoginPanel() {
  return (
    <BoxContainerStyle>
      <BoxStyle>
        <LoginForm />
      </BoxStyle>
      <Box sx={{ alignSelf: 'center' }}>
        <ImageStyle
          src={main}
          alt="details"
        />
      </Box>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  paddingTop: theme.spacing(10),
  gap: theme.spacing(6),
  [theme.breakpoints.down(670)]: {
    display: 'flex',
    flexDirection: 'column-reverse',
    paddingTop: theme.spacing(6),
    gap: theme.spacing(2),
  },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImageStyle = styled('img')(({ theme }) => ({
  height: 540,
  objectFit: 'contain',
  [theme.breakpoints.down('sm')]: {
    height: 358,
  },
  [theme.breakpoints.between(720, 950)]: {
    height: 430,
  },
  [theme.breakpoints.between(670, 720)]: {
    height: 380,
  },
}));
