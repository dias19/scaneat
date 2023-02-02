import React from 'react';

import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { BottomNavigation } from './bottom-navigation/bottom-navigation';
import { BOTTOM_NAVIGATION, HEADER } from './constants';
import { HeaderWithBackButton } from './header/header-with-back-buttom';
import { HeaderWithLogo } from './header/header-with-logo';
import { HeaderWithNavbar } from './header/header-with-navbar';

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  paddingBottom: BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT,
  paddingTop: HEADER.HEADER_HEIGHT,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

type LayoutProps = {
    children?: React.ReactElement;
  };

export function ManagementLayoutLogo({ children }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100vh' }}>
      <HeaderWithLogo />
      <MainStyle>{children || <Outlet />}</MainStyle>
      <BottomNavigation />
    </Box>
  );
}

type LayoutButtonProps ={
  children?: React.ReactElement;
  title?: string
}
export function ManagementLayoutButton({ children, title }: LayoutButtonProps) {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100vh' }}>
      <HeaderWithBackButton title={title} />
      <MainStyle>{children || <Outlet />}</MainStyle>
      <BottomNavigation />
    </Box>
  );
}
type LayoutNavbarProps={
  children?: React.ReactElement;
  navbarOptions: {
    name: string,
    route: string,
  }[]
}
const MainLayoutStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  paddingBottom: BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));
export function ManagementLayoutNavbar({ children, navbarOptions }:LayoutNavbarProps) {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100vh' }}>
      <HeaderWithNavbar navbarOptions={navbarOptions} />
      <MainLayoutStyle>
        {' '}
        {children || <Outlet />}
      </MainLayoutStyle>
      <BottomNavigation />
    </Box>
  );
}
