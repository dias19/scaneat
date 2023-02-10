import React from 'react';

import {
  Box, Container, styled,
} from '@mui/material';

import { useResponsive } from '~/hooks/useResponsive';

import { RestaurantForms } from './forms/restaurant-forms';
import { StepperLaptop } from './stepper-laptop';
import { StepperMobile } from './stepper-mobile';

export function CreateRestaurant() {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const isLaptop = useResponsive('up', 'sm');
  return (
    <BoxContainerStyle>
      {
          isLaptop
            ? (
              <Container>
                <BoxLaptopStyle>
                  <Box sx={{ height: '100%', marginTop: 8 }}>
                    <StepperLaptop activeStep={activeStep} setActiveStep={setActiveStep} />
                  </Box>
                  <RestaurantForms activeStep={activeStep} setActiveStep={setActiveStep} />
                </BoxLaptopStyle>
              </Container>
            )

            : (
              <BoxMobileStyle>
                <StepperMobile activeStep={activeStep} setActiveStep={setActiveStep} />
                <BoxFormStyle>
                  <RestaurantForms activeStep={activeStep} setActiveStep={setActiveStep} />
                </BoxFormStyle>
              </BoxMobileStyle>
            )

            }
    </BoxContainerStyle>
  );
}

const BoxFormStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  paddingTop: theme.spacing(2),
}));

const BoxMobileStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: 1,
});

const BoxContainerStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const BoxLaptopStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'self-start',
  marginTop: theme.spacing(6),
}));
