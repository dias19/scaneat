import React from 'react';

import {
  Step, StepLabel, Stepper, styled, Typography,
} from '@mui/material';
import { toast } from 'react-toastify';

const steps = [
  {
    name: 'Данные владельца заведения',
    description: 'Персональные данные',
  },
  {
    name: 'Данные заведения',
    description: 'Детали ресторана',
  },
  {
    name: 'Подтверждение данных',
    description: 'Подтверждение данных',
  },
];

type StepperLaptopProps={
  activeStep: number,
  setActiveStep?: (page: number) => void
}

export function StepperLaptop({ activeStep, setActiveStep }: StepperLaptopProps) {
  const handleStep = (step: number) => {
    if (activeStep > step) {
      setActiveStep!(step);
    } else {
      toast.warning('Заполните форму чтобы пройти дальше');
    }
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <StepStyle
          key={step.name}
        >
          <StepLabel
            optional={
              <Typography variant="caption">{step.description}</Typography>
              }
            onClick={() => handleStep(index)}
          >
            <Typography color="primary.light">{step.name}</Typography>
          </StepLabel>
        </StepStyle>
      ))}
    </Stepper>
  );
}

const StepStyle = styled(Step)(({ theme }) => ({
  '& .MuiStepLabel-root .Mui-active': {
    color: theme.palette.success.main, // circle color (Active)
  },
  '& .MuiStepLabel-root .Mui-completed': {
    color: theme.palette.success.main, // circle color (COMPLETED)
  },
}));
