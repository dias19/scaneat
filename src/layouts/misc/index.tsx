import React from 'react';

import { Box, Container, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import HomeHeader from './header';

type Props={
    children?: React.ReactElement;
  }

export default function HomePageLayout({ children }:Props) {
  return (
    <BoxStyle>
      <HomeHeader />
      <MainStyle>
        {children || <Outlet />}
      </MainStyle>
    </BoxStyle>
  );
}
const BoxStyle = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const MainStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(4),
  },
}));
