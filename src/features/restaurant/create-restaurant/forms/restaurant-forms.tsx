import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider } from '~/components/hook-form';
import { useResponsive } from '~/hooks/useResponsive';

import { ConfirmationForm } from './confirmation-form';
import { RestaurantDetailsForm } from './restaurant-details-form';
import { RestaurantOwnerForm } from './restaurant-owner-form';

const ownerSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

const restaurantSchema = yup.object({
  restaurantName: yup.string().required(),
  restaurantPhone: yup.string().required(),
  cityId: yup.number().required(),
  address: yup.string().required(),
  hasTakeAway: yup.boolean().required(),
  hasDelivery: yup.boolean().required(),
  photoId: yup.number().required(),
});

const defaultValues = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  restaurantName: '',
  restaurantPhone: '',
  cityId: 0,
  address: '',
  hasTakeAway: false,
  hasDelivery: false,
  photoId: 0,
};
const createRestaurantSchema = [ownerSchema, restaurantSchema];

type FormsProp={
    activeStep: number,
    setActiveStep: (page: any) => void
}

export function RestaurantForms({ activeStep, setActiveStep }:FormsProp) {
  const isLaptop = useResponsive('up', 'sm');

  const methods = useForm({
    resolver: yupResolver(createRestaurantSchema[activeStep]),
    mode: 'all',
    defaultValues,
  });

  const handleNext = () => {
    setActiveStep((previousStep:number) => previousStep + 1);
  };

  const handleBack = () => {
    setActiveStep((previousStep:number) => previousStep - 1);
  };

  return (
    <FormProvider
      methods={methods}
      sx={{
        backgroundColor: isLaptop ? 'grey.200' : 'white',
        height: !isLaptop ? '100%' : 'auto',
        width: isLaptop ? '383px' : 'auto',
      }}
    >
      {activeStep === 0
        && (
        <RestaurantOwnerForm
          handleNext={handleNext}
        />
        ) }
      {activeStep === 1 && (
      <RestaurantDetailsForm
        handleBack={handleBack}
        handleNext={handleNext}
      />
      )}
      {activeStep === 2
        && (
        <ConfirmationForm
          handleBack={handleBack}
        />
        )}
    </FormProvider>
  );
}
