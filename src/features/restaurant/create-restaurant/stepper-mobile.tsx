import React from 'react';

import {
  Step, Box, Stepper, Typography,
} from '@mui/material';
import styled from 'styled-components';

type StepperMobileProps={
    activeStep: number,
    setActiveStep: (page: number) => void
  }

export function StepperMobile({ activeStep, setActiveStep }:StepperMobileProps) {
  const steps = ['Ваши данные', 'Заведения', 'Подтверждение'];

  const handleStep = (step: number) => {
    if (activeStep > step) {
      setActiveStep(step);
    }
  };

  return (
    <StepperStyle
      activeStep={activeStep}
      orientation="horizontal"
    >
      {steps.map((label, index) => (
        <BoxStepperStyle
          key={label}
        >
          <Step
            sx={{
              padding: 1,
              width: '100%',
            }}
            onClick={() => handleStep(index)}
          >
            <Typography
              align="center"
              sx={{
                color: (activeStep === index) ? 'black' : 'grey.500',
              }}
              variant="caption"
              component="p"
            >
              {label}
            </Typography>
          </Step>
          <Box
            sx={{
              height: '4px',
              borderRadius: '2px',
              width: '100%',
              bgcolor: (activeStep === index) ? 'black' : 'grey.400',
            }}
          />
        </BoxStepperStyle>
      ))}
    </StepperStyle>
  );
}

const StepperStyle = styled(Stepper)(({ theme }) => ({
  '.MuiStepConnector-horizontal': {
    display: 'none',
  },
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
  gap: theme.spacing(2),
  width: '100%',
}));

const BoxStepperStyle = styled(Box)({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  overflow: 'hidden',
});
