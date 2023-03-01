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
      <BoxStyle>
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
      </BoxStyle>
      <BoxImageStyle>
        <ImageStyle
          src={main}
          alt="main"
        />
      </BoxImageStyle>
    </BoxContainerStyle>
  );
}

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(5),
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(1),
  [theme.breakpoints.down(730)]: {
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
  [theme.breakpoints.up(730)]: {
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
  [theme.breakpoints.up(730)]: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: '28px',
  },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  width: 'auto',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  [theme.breakpoints.between('sm', 730)]: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const ImageStyle = styled('img')(({ theme }) => ({
  height: 530,
  objectFit: 'contain',
  width: '100%',
  [theme.breakpoints.between('sm', 730)]: {
    height: 420,
  },
  [theme.breakpoints.down('sm')]: {
    height: 362,
  },
}));

const BoxImageStyle = styled(Box)({
  alignSelf: 'center',
});

const BoxStyle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(730)]: {
    textAlign: 'center',
  },
}));
