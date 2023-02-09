import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import miscApi from '~/api/misc/api';

import { RestaurantForm } from './restaurant-details-form';

export function RestaurantDetailsConfirmation() {
  const methods = useFormContext<RestaurantForm>();

  const { watch } = methods;

  const restaurantData = watch('restaurant');

  const { data: cities = [] } = miscApi.endpoints.getCities.useQuery();

  const selectedCity = cities.find((city) => city.id === +restaurantData.cityId);

  const restaurantInformation = [
    {
      field: 'Название:',
      value: restaurantData.name,
    },
    {
      field: 'Телефон:',
      value: restaurantData.phone,
    },
    {
      field: 'Город:',
      value: selectedCity?.name,
    },
    {
      field: 'Адрес:',
      value: restaurantData.address,
    },
  ];
  return (
    <Stack spacing={0.5}>
      {restaurantInformation.map((information) => (
        <Box display="flex" key={information.value}>
          <Typography sx={{ flexGrow: 1 }} variant="body2">
            {information.field}
          </Typography>
          <Typography variant="body2">{information.value}</Typography>
        </Box>
      ))}
      <Box display="flex">
        <Typography sx={{ flexGrow: 1 }} variant="body2">
          Онлайн заказ:
        </Typography>
        <Typography variant="body2">
          {restaurantData.hasDelivery && 'Доставка'}
          {(restaurantData.hasDelivery && restaurantData.hasTakeAway) && ', '}
          {restaurantData.hasTakeAway && 'Самовывоз'}
        </Typography>
      </Box>
    </Stack>
  );
}
