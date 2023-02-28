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
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(PATH_RESTAURANTS.createRestaurant);
  };

  return (
    <BoxContainerStyle>
      <Box>
        <TypographyHeadingStyle
          align={!isDesktop ? 'center' : 'left'}
        >
          QR-меню для вашего заведения
        </TypographyHeadingStyle>
        <TypographyBodyStyle
          align={!isDesktop ? 'center' : 'left'}
        >
          Зарегистрируйте свое заведение и получите QR-меню мгновенно!
        </TypographyBodyStyle>
        <ButtonStyle
          variant="contained"
          size="large"
          onClick={handleNavigate}
        >
          Получить QR меню
        </ButtonStyle>
      </Box>
      <Box sx={{ alignSelf: 'center' }}>
        <ImageStyle
          src={main}
          alt="main"
        />
      </Box>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(15),
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginTop: theme.spacing(3),
    gap: 0,
  },
}));

const TypographyHeadingStyle = styled(Typography)(({ theme }) => ({
  fontSize: 40,
  lineHeight: '52px',
  [theme.breakpoints.up('sm')]: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: '64px',
    marginTop: theme.spacing(15),
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

const ImageStyle = styled('img')(({ theme }) => ({
  height: 530,
  maxWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    height: 362,
    objectFit: 'cover',

  },
}));
