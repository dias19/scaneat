import React from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

import { Logo } from '~/assets/logo';
import { useResponsive } from '~/hooks/useResponsive';
import { PATH_AUTH } from '~/routes/paths';

import { HOME_NAVIGATION } from '../contants';

export function HomeHeader() {
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'sm');

  const { pathname } = useLocation();

  const isLoginActive = pathname !== PATH_AUTH.login;

  const navigateLogin = () => {
    navigate(PATH_AUTH.login);
  };
  return (
    <BoxContainerStyle>
      <BoxStyle>
        <Logo />
        {isDesktop
        && (
          <>
            {HOME_NAVIGATION.map((navigation) => (
              <TypographyStyle>
                <Link to={navigation.name} smooth duration={500}>
                  {navigation.label}
                </Link>
              </TypographyStyle>
            ))}
          </>
        )}
      </BoxStyle>
      {
        isLoginActive && (
        <Box>
          <Button
            variant="outlined"
            size="large"
            onClick={navigateLogin}
          >
            Войти
          </Button>
        </Box>
        )
      }
    </BoxContainerStyle>
  );
}

const TypographyStyle = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  fontSize: 16,
  color: theme.palette.grey[600],
  cursor: 'pointer',
}));

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
  },
}));

const BoxStyle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
});
