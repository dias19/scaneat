import React from 'react';

import {
  Box,
  styled,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { NAVIGATION_BUTTONS } from '../constants';

export function ManagementTopbarNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <BoxStyle>
      {
        NAVIGATION_BUTTONS.slice(0).reverse().map((button) => (
          <Typography
            key={button.route}
            sx={{
              mr: 2,
              cursor: 'pointer',
              color: (pathname === button.route) ? 'black' : 'grey.600',
            }}
            variant="body2"
            onClick={() => navigate(button.route)}
          >
            {button.name}
          </Typography>
        ))
    }
    </BoxStyle>
  );
}
const BoxStyle = styled(Box)(({ theme }) => (
  {
    display: 'flex',
    marginLeft: theme.spacing(5),
  }
));
