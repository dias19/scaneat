import React from 'react';

import {
  Step, StepLabel, Stepper, Typography,
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
        <Step
          key={step.name}
          sx={{
            '& .MuiStepLabel-root .Mui-active': {
              color: 'success.main', // circle color (COMPLETED)
            },
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'success.main', // circle color (COMPLETED)
            },
          }}
        >
          <StepLabel
            optional={
              <Typography variant="caption">{step.description}</Typography>
              }
            onClick={() => handleStep(index)}
          >
            <Typography color="primary.light">{step.name}</Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
