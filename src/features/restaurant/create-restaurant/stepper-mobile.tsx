import React from 'react';

import { Step, Box, Stepper } from '@mui/material';
import { toast } from 'react-toastify';
import styled from 'styled-components';

type StepperMobileProps={
    activeStep: number,
    setActiveStep: (page: number) => void
  }

export function StepperMobile({ activeStep, setActiveStep }:StepperMobileProps) {
  const steps = ['Ваши данные', 'Детали заведения', 'Подтверждение'];

  const handleStep = (step: number) => {
    if (activeStep > step) {
      setActiveStep(step);
    } else {
      toast.warning('Заполните форму чтобы пройти дальше');
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
              fontSize: 12,
              color: (activeStep === index) ? 'black' : 'grey.500',
            }}
            onClick={() => handleStep(index)}
          >
            {label}
          </Step>
          <Box
            sx={{
              height: '4px',
              borderRadius: '2px',
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
  display: 'flex',
  marginLeft: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const BoxStepperStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginRight: theme.spacing(2),
}));
