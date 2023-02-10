import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider } from '~/components/hook-form';
import { useResponsive } from '~/hooks/useResponsive';

import { RestaurantCreationConfirmation } from './restaurant-creation-confirmation';
import { RestaurantDetailsForm, RestaurantForm } from './restaurant-details-form';
import { RestaurantOwnerForm, OwnerForm } from './restaurant-owner-form';

export type CreateRestaurantForm = OwnerForm & RestaurantForm;

const schema = yup.object().shape({
  restaurantOwner: yup.object().shape({
    name: yup.string().required('Введите свое имя'),
    surname: yup.string().required('Введите свою фамилию'),
    email: yup.string().email('Укажите правильную почту').required('Введите почту'),
    phone: yup.string().required('Введите свой номер телефона'),
  }),
  restaurant: yup.object().shape({
    name: yup.string().required('Введите название ресторана'),
    phone: yup.string().required('Введите номер телефона ресторана'),
    cityId: yup.number().required('Выберите город'),
    address: yup.string().required('Введите адрес ресторана'),
    hasTakeAway: yup.boolean().required(),
    hasDelivery: yup.boolean().required(),
    photoId: yup.number().required(),
    photoUrl: yup.string().required(),
  }),
});

const defaultValues = {
  restaurantOwner: {
    name: '',
    surname: '',
    email: '',
    phone: '',
  },
  restaurant: {
    name: '',
    phone: '',
    address: '',
    hasTakeAway: false,
    hasDelivery: false,
    photoUrl: '',
  },
};

type FormsProp={
    activeStep: number,
    setActiveStep: (page: any) => void
}

export function RestaurantForms({ activeStep, setActiveStep }:FormsProp) {
  const isLaptop = useResponsive('up', 'sm');

  const methods = useForm<CreateRestaurantForm>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const { trigger } = methods;

  const handleNext = async (schemaName: 'restaurantOwner' | 'restaurant') => {
    const isValid = await methods.trigger(schemaName);
    if (isValid) setActiveStep((previousStep:number) => previousStep + 1);
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
        width: isLaptop ? '383px' : '100%',
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
        <RestaurantCreationConfirmation
          handleBack={handleBack}
        />
        )}
    </FormProvider>
  );
}
