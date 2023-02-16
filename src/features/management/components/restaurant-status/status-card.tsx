import React from 'react';

import {
  Card, CardContent, Box, Typography, Button, styled,
} from '@mui/material';

import { Image } from '~/components/image';
import { Restaurant } from '~/features/restaurant';

type StatusCardProps = {
  restaurant: Restaurant;
  hasButton?: boolean;
  hasButtons?: boolean;
  verifyRestaurant?: (id: number) => void;
  rejectRestaurant?: (id: number) => void;
};
export function StatusCard({
  restaurant, hasButton, hasButtons, verifyRestaurant, rejectRestaurant,
}: StatusCardProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Card>
        <CardContentStyle>
          <Box display="flex">
            <ImageStyle url={restaurant.originalUrl} alt={restaurant.name} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{restaurant.name}</Typography>
              <Typography variant="caption" color="grey.600" component="p">
                {restaurant.address}
              </Typography>
            </Box>
          </Box>
          {hasButtons
        && (
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} sx={{ mt: 1.5 }}>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ boxShadow: 'none' }}
            onClick={async () => {
              await rejectRestaurant?.(restaurant.id);
            }}
          >
            Отклонить
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={async () => {
              await verifyRestaurant?.(restaurant.id);
            }}
          >
            Подтвердить
          </Button>
        </Box>
        )}
          {
            hasButton
            && (
            <Button
              variant="contained"
              onClick={() => verifyRestaurant?.(restaurant.id)}
              sx={{
                mt: 1.5,
                boxShadow: 'none',

              }}
            >
              Принять
            </Button>
            )
        }
        </CardContentStyle>
      </Card>
    </Box>
  );
}
const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '&:last-child': {
    padding: theme.spacing(1.5),
  },
}));

const ImageStyle = styled(Image)(({ theme }) => ({
  marginRight: theme.spacing(2),
  width: 60,
  height: 60,
}));
