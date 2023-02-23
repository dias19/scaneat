import React from 'react';

import {
  Box, Card, CardActionArea, CardContent, styled, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useResponsive } from '~/hooks/useResponsive';

import { MANAGEMENT_NAVIGATIONS } from '../../constants';
import { ManagementDetailsNavigation } from '../../types';

type NavigationProps = {
  id?: number;
  restaurantName?: string;
};

export default function ManagementNavigation({ id, restaurantName }: NavigationProps) {
  const isDesktop = useResponsive('up', 'sm');

  const navigate = useNavigate();

  const handleNavigate = (navigation: ManagementDetailsNavigation) => {
    navigate(navigation.route(id), { state: { restaurantName } });
  };
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
        Управление рестораном
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
        sx={{ width: isDesktop ? 358 : 'auto' }}
      >
        {MANAGEMENT_NAVIGATIONS.map((navigation) => (
          <Card key={navigation.name}>
            <CardActionArea
              onClick={() => handleNavigate(navigation)}
            >
              <CardContentStyle>{navigation.name}</CardContentStyle>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
}
const CardContentStyle = styled(CardContent)({
  maxHeight: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
