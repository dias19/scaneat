import React from 'react';

import {
  Box, Card, CardActionArea, CardContent, styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { MANAGEMENT_NAVIGATIONS } from '../constants';

type NavigationProps={
  id?: number
}
export default function ManagementNavigation({ id }:NavigationProps) {
  return (
    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
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
  );
}
const CardContentStyle = styled(CardContent)({
  maxHeight: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

});
