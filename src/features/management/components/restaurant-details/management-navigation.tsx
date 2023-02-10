import React from 'react';

import {
  Box, Card, CardActionArea, CardContent, styled, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useResponsive } from '~/hooks/useResponsive';

import { MANAGEMENT_NAVIGATIONS } from '../../constants';

type NavigationProps={
  id?: number
}

export default function ManagementNavigation({ id }:NavigationProps) {
  const isLaptop = useResponsive('up', 'sm');
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
        Управление рестораном
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
        sx={{ width: isLaptop ? 358 : 'auto' }}
      >
        {MANAGEMENT_NAVIGATIONS.map((navigation) => (
          <Card key={navigation.name}>
            <CardActionArea to={navigation.route((id))} component={Link}>
              <CardContentStyle>
                {navigation.name}
              </CardContentStyle>
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
