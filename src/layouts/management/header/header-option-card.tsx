import React from 'react';

import {
  Card, CardActionArea, CardContent, styled, Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type OptionProps={
   option:{
     name: string,
    route: string,
   }
}
export function HeaderOptionCard({ option }: OptionProps) {
  const location = useLocation();
  const isActive = location.pathname === option.route;
  return (
    <Card
      sx={{
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
        borderBottom: isActive ? '1px solid' : null,
      }}
      elevation={0}
    >
      <CardActionArea component={Link} to={option.route}>
        <CardContentStyle>
          <Typography
            sx={{
              fontWeight: isActive ? 'bold' : 'regular',
              fontSize: '12px',
              color: isActive ? 'black' : 'grey.600',
            }}
          >
            {option.name}
          </Typography>
        </CardContentStyle>
      </CardActionArea>
    </Card>
  );
}
const CardContentStyle = styled(CardContent)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
