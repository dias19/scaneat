import React from 'react';

import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useResponsive } from '~/hooks/useResponsive';

import { BOTTOM_NAVIGATION, HEADER } from '../management/constants';
import { LogoHeader } from '../management/header/header-with-logo';
import { BottomNavigationChef } from './bottom-navigation';

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  paddingBottom: BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT,
  backgroundColor: '#F4F6F8',
  height: '100%',
  overflow: 'scroll',
  paddingTop: HEADER.HEADER_HEIGHT,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

type LayoutProps = {
  children?: React.ReactElement;
  staffRole: 'chef';
};

export function RestaurantStaffLayot({ children, staffRole }: LayoutProps) {
  const isLaptop = useResponsive('up', 'sm');

  const isChef = staffRole === 'chef';
  return (
    <>
      {!isLaptop && isChef && <LogoHeader />}
      <MainStyle>{children || <Outlet />}</MainStyle>
      {!isLaptop && isChef && <BottomNavigationChef />}
    </>
  );
}
