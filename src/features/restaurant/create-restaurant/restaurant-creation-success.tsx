import React from 'react';

import {
  Box, Container, styled,
} from '@mui/material';

import { useResponsive } from '~/hooks/useResponsive';

import { CreationSuccessful } from './forms/creation-successful';
import { StepperDesktop } from './stepper-desktop';

export function RestaurantCreationSuccess() {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <BoxContainerStyle>
      {
    isDesktop
      ? (
        <Container>
          <BoxDesktopStyle>
            <Box sx={{ height: '100%', marginTop: 9 }}>
              <StepperDesktop activeStep={3} />
            </Box>
            <Box sx={{ width: 400 }}>
              <CreationSuccessful />
            </Box>
          </BoxDesktopStyle>
        </Container>
      )
      : (
        <BoxMobileStyle>
          <CreationSuccessful />
        </BoxMobileStyle>
      )
      }
    </BoxContainerStyle>
  );
}
const BoxContainerStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up(768)]: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const BoxMobileStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '20%',
});

const BoxDesktopStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'self-start',
  marginTop: theme.spacing(6),
}));
