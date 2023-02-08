import React from 'react';

import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { HEADER } from '../management/constants';
import { BackButtonHeader } from '../management/header/header-with-back-buttom';
import { LogoHeader } from '../management/header/header-with-logo';

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  paddingTop: HEADER.HEADER_HEIGHT,
  flexGrow: 1,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

type LayoutButtonProps ={
    children?: React.ReactElement;
    title?: string
}

export function StackLayout({ children, title }: LayoutButtonProps) {
  return (
    <BoxStyle>
      <BackButtonHeader title={title} />
      <MainStyle>
        {children || <Outlet />}
      </MainStyle>
    </BoxStyle>
  );
}

type LogoLayoutProps={
  children?: React.ReactElement;
}

export function LogoLayout({ children }:LogoLayoutProps) {
  return (
    <BoxStyle>
      <LogoHeader />
      <MainStyle>
        {children || <Outlet />}
      </MainStyle>
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});
