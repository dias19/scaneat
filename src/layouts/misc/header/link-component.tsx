import React from 'react';

import { styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import { PATH_PAGE } from '~/routes/paths';

type Props={
    navigation: {label: string, name:string},
    isLoginPage: boolean,
}

export default function LinkComponent({ navigation, isLoginPage }:Props) {
  if (isLoginPage) {
    return (
      <RouterLinkStyle
        to={PATH_PAGE.home}
        state={{ name: navigation.name }}
      >
        {navigation.label}
      </RouterLinkStyle>
    );
  }
  return (
    <ScrollLink
      to={navigation.name}
      smooth
      duration={500}
    >
      {navigation.label}
    </ScrollLink>
  );
}

const RouterLinkStyle = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.grey[600],
}));
