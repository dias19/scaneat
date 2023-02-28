import React from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

import { Logo } from '~/assets/logo';
import { useResponsive } from '~/hooks/useResponsive';
import { PATH_AUTH } from '~/routes/paths';

import { HOME_NAVIGATION } from '../contants';

export function HomeHeader() {
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'sm');

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
      <Box>
        <Button
          variant="outlined"
          size="large"
          onClick={navigateLogin}
        >
          Войти
        </Button>
      </Box>
    </BoxContainerStyle>
  );
}

const TypographyStyle = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(5),
  fontSize: 14,
  color: theme.palette.grey[600],
  cursor: 'pointer',
}));

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(4),
}));

const BoxStyle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
});
