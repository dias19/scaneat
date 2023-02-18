import React from 'react';

import {
  Box, styled,
} from '@mui/material';

import { BottomNavigationButtons } from
  '~/layouts/management/bottom-navigation/BottomNavigationButtons';

import { CHEF_NAVIGATION_ITEMS } from '../constants';

export function BottomNavigationChef() {
  return (
    <BoxStyle>
      {CHEF_NAVIGATION_ITEMS.map((button) => (
        <BottomNavigationButtons
          key={`bottom-navigation-button-${button.activeIcon}`}
          activeIcon={button.activeIcon}
          defaultIcon={button.defaultIcon}
          route={button.route}
        />
      ))}
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  position: 'fixed',
  height: 56,
  borderTop: '1px solid #E0E0E0',
  backgroundColor: 'white',
  zIndex: theme.zIndex.managementBottomNavigation,
  bottom: 0,
  left: 0,
  right: 0,
  marginBottom: 0,
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}));
