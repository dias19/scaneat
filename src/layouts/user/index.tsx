import React from 'react';

import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { BOTTOM_NAVIGATION, HEADER } from '../management/constants';
import { LogoHeader } from '../management/header/header-with-logo';
import { BottomNavigationChef } from './bottom-navigation';

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  paddingBottom: BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT,
  backgroundColor: '#F4F6F8',
  height: '100vh',
  paddingTop: HEADER.HEADER_HEIGHT,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

type LayoutProps = {
    children?: React.ReactElement;
};

export function UserChefLayout({ children }:LayoutProps) {
  return (
    <>
      <LogoHeader />
      <MainStyle>{children || <Outlet />}</MainStyle>
      <BottomNavigationChef />
    </>
  );
}
