import React from 'react';

import { Stack, Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { OwnerForm } from './restaurant-owner-form';

export function OwnerDetailsConfirmation() {
  const methods = useFormContext<OwnerForm>();

  const { watch } = methods;

  const restaurantOwnerData = watch('restaurantOwner');

  const ownerInformation = [
    {
      field: 'Имя:',
      value: `${restaurantOwnerData.name} ${restaurantOwnerData.surname}`,
    },
    {
      field: 'Почта:',
      value: restaurantOwnerData.email,
    },
    {
      field: 'Номер телефона:',
      value: restaurantOwnerData.phone,
    },
  ];
  return (
    <Stack spacing={0.5}>
      {ownerInformation.map((information) => (
        <Box display="flex" key={information.value}>
          <Typography sx={{ flexGrow: 1 }} variant="body2">
            {information.field}
          </Typography>
          <Typography variant="body2">{information.value}</Typography>
        </Box>
      ))}
    </Stack>
  );
}
