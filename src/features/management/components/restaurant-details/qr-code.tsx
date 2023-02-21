import React from 'react';

import {
  Card, CardActionArea, Box, Typography, styled, CardContent,
} from '@mui/material';

import restaurantApi from '~/api/restaurant/api';
import { useResponsive } from '~/hooks/useResponsive';

type QrCodeProps={
  restaurantId: number
}

export function QrCodeRestaurant({ restaurantId }:QrCodeProps) {
  const isLaptop = useResponsive('up', 'sm');

  const [trigger] = restaurantApi.endpoints.getRestaurantQR.useLazyQuery();

  return (
    <Card sx={{ mt: 3, width: isLaptop ? 358 : 'auto' }}>
      <CardActionArea onClick={() => trigger(restaurantId)}>
        <CardContentStyle>
          <ImageStyle
          // eslint-disable-next-line max-len
            src="https://www.unitag.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftemplate_classic.746b0922.png&w=3840&q=75"
            alt="QrCode"
            loading="lazy"
          />
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Нажмите на QR для того чтобы скачать
            </Typography>
            <Typography variant="caption" color="grey.600" component="p">
              Распечатайте скачанный QR в своем заведении
            </Typography>
          </Box>
        </CardContentStyle>
      </CardActionArea>
    </Card>
  );
}

const ImageStyle = styled('img')(({ theme }) => ({
  borderRadius: theme.spacing(1),
  border: '1px solid black',
  width: 96,
  height: 96,
  marginRight: theme.spacing(2),
}));

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  width: '100%',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
}));
