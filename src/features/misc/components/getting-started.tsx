import React from 'react';

import {
  Box, Typography, Button, styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { PATH_RESTAURANTS } from '~/routes/paths';

import main from '../../../assets/images/main.png';

export function GettingStarted() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(PATH_RESTAURANTS.createRestaurant);
  };

  return (
    <BoxContainerStyle>
      <Box>
        <TypographyHeadingStyle>
          QR-меню для вашего заведения
        </TypographyHeadingStyle>
        <TypographyBodyStyle>
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
      <BoxStyle>
        <ImageStyle
          src={main}
          alt="main"
        />
      </BoxStyle>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(10),
  marginBottom: theme.spacing(15),
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    gap: 0,
  },
}));

const TypographyHeadingStyle = styled(Typography)(({ theme }) => ({
  fontSize: 40,
  lineHeight: '52px',
  textAlign: 'center',
  overflow: 'hidden',
  color: theme.palette.common.black,
  [theme.breakpoints.up('sm')]: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: '64px',
    marginTop: theme.spacing(15),
    textAlign: 'left',
  },
}));

const TypographyBodyStyle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(3),
  fontSize: 18,
  lineHeight: '25px',
  textAlign: 'center',
  color: theme.palette.grey[600],
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
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
  height: 362,
  objectFit: 'cover',
  [theme.breakpoints.up('md')]: {
    height: 530,
    objectFit: 'contain',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: 410,
    top: 0,
    right: 0,
    margin: 'auto',
    bottom: 0,
    position: 'absolute',
  },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center',
  },
}));
