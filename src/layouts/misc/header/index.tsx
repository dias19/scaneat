import React from 'react';

import {
  Box, Button, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Logo } from '~/assets/logo';
import { useResponsive } from '~/hooks/useResponsive';
import { PATH_AUTH } from '~/routes/paths';

import { HOME_NAVIGATION } from '../contants';

export default function HomeHeader() {
  const navigate = useNavigate();

  const isDesktop = useResponsive('up', 'sm');
  return (
    <BoxContainerStyle>
      <BoxStyle>
        <Logo />
        {isDesktop
        && (
          <>
            {HOME_NAVIGATION.map((navigation) => (
              <TypographyStyle
                onClick={() => navigate(navigation.route)}
              >
                {navigation.name}
              </TypographyStyle>
            ))}
          </>
        )}
      </BoxStyle>
      <Box>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate(PATH_AUTH.login)}
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
  color: 'grey.600',
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
