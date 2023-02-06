import React from 'react';

import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { BottomNavigation } from './bottom-navigation/bottom-navigation';
import { BOTTOM_NAVIGATION, HEADER } from './constants';
import { BackButtonHeader } from './header/header-with-back-buttom';
import { LogoHeader } from './header/header-with-logo';

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  paddingBottom: BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT,
  paddingTop: HEADER.HEADER_HEIGHT,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

type LayoutProps = {
    children?: React.ReactElement;
};

export function ManagementLogoLayout({ children }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100vh' }}>
      <LogoHeader />
      <MainStyle>{children || <Outlet />}</MainStyle>
      <BottomNavigation />
    </Box>
  );
}

type LayoutButtonProps ={
  children?: React.ReactElement;
  title?: string
}

export function ManagementStackLayout({ children, title }: LayoutButtonProps) {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100vh' }}>
      <BackButtonHeader title={title} />
      <MainStyle>{children || <Outlet />}</MainStyle>
      <BottomNavigation />
    </Box>
  );
}
