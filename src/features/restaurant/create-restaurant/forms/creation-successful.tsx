import React from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import { Image } from '~/components/image';
import { PATH_PAGE } from '~/routes/paths';

export function CreationSuccessful() {
  const url = 'products/ae424ada-f924-40e2-94e4-70b4f0f24ec4.jpeg';
  return (
    <BoxStyle>
      <Image
        url={url}
        alt="Спасибо"
        style={{
          height: 263,
          width: 263,
        }}
      />
      <Typography
        variant="h6"
        align="center"
        sx={{ mt: 2 }}
      >
        Ваша заявка принята, с вами в скоре свяжется наш менеджер
      </Typography>
      <Typography sx={{ mt: 2 }}>
        <Link
          to={PATH_PAGE.home}
          style={{ textDecoration: 'none' }}
        >
          Перейти в главную страницу
        </Link>
      </Typography>
    </BoxStyle>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up(768)]: {
    marginTop: theme.spacing(9),
  },
}));
