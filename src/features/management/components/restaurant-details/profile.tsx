import React from 'react';

import { Box, Typography, Button } from '@mui/material';

import { Image } from '~/components/image';
import { Restaurant } from '~/features/restaurant';

type ProfileProps={
    restaurant?: Restaurant
}
export default function Profile({ restaurant }:ProfileProps) {
  return (
    <Box display="flex" flexDirection="row">
      <Image
        url={restaurant?.originalUrl}
        alt={restaurant?.name}
        style={{
          height: 96,
          width: 96,
          marginRight: 16,
          borderRadius: 48,
        }}
      />
      <Box display="flex" flexDirection="column">
        <Typography variant="h6">{restaurant?.name}</Typography>
        <Typography variant="caption" component="p" sx={{ color: 'grey.600' }}>
          {restaurant?.address}
        </Typography>
        <Button
          sx={{
            mt: 1, px: 3, bgcolor: 'black',
          }}
          variant="contained"
          size="small"
        >
          Редактировать
        </Button>
      </Box>
    </Box>
  );
}
