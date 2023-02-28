import React from 'react';

import {
  Box, Typography, Button, styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useResponsive } from '~/hooks/useResponsive';
import { PATH_RESTAURANTS } from '~/routes/paths';

import main from '../../../assets/images/main.png';

export function GettingStarted() {
  const isDesktop = useResponsive('up', 'sm');
  if (isDesktop) return <GettingStarterDesktop />;
  return (
    <GettingStarterMobile />
  );
}

function GettingStarterMobile() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 3 }}>
      <Box>
        <img
          src={main}
          alt="main"
          width="100%"
          height={362}
        />
      </Box>
      <TypographyHeadingStyle align="center">
        QR-меню для вашего заведения
      </TypographyHeadingStyle>
      <TypographyBodyStyle align="center">
        Зарегистрируйте свое заведение и получите QR-меню мгновенно!
      </TypographyBodyStyle>
      <ButtonStyle
        variant="contained"
        size="large"
        onClick={() => navigate(PATH_RESTAURANTS.createRestaurant)}
      >
        Получить QR меню
      </ButtonStyle>
    </Box>
  );
}

function GettingStarterDesktop() {
  const navigate = useNavigate();
  return (
    <BoxContainerStyle>
      <Box width={460}>
        <TypographyHeadingStyle>
          QR-меню для вашего заведения
        </TypographyHeadingStyle>
        <TypographyBodyStyle>
          Зарегистрируйте свое заведение и получите QR-меню мгновенно!
        </TypographyBodyStyle>
        <ButtonStyle
          variant="contained"
          size="large"
          onClick={() => navigate(PATH_RESTAURANTS.createRestaurant)}
        >
          Получить QR меню
        </ButtonStyle>
      </Box>
      <Box>
        <img
          src={main}
          alt="main"
          height={530}
        />
      </Box>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(1),
  justifyContent: 'space-between',
}));

const TypographyHeadingStyle = styled(Typography)(({ theme }) => ({
  fontSize: 40,
  lineHeight: '52px',
  [theme.breakpoints.up('sm')]: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: '64px',
    marginTop: theme.spacing(20),
  },
}));

const TypographyBodyStyle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(3),
  fontSize: 18,
  lineHeight: '25px',
  color: theme.palette.grey[600],
  [theme.breakpoints.up('sm')]: {
    fontSize: 20,
    lineHeight: '28px',
  },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    width: 'auto',
  },
}));
