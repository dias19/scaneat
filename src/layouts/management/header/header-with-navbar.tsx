import React from 'react';

import {
  Box,
} from '@mui/material';

import { HEADER } from '../constants';
import { HeaderOptionCard } from './header-option-card';
import { HeaderWithLogo } from './header-with-logo';

type NavbarProps={
  navbarOptions: {
    name: string,
    route: string
  }[]
}
export function HeaderWithNavbar({ navbarOptions }:NavbarProps) {
  return (
    <>
      <HeaderWithLogo />
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${navbarOptions.length}, 1fr)`}
        sx={{
          marginTop: `${HEADER.HEADER_HEIGHT}px`,
        }}
      >
        {navbarOptions.map((option) => (
          <HeaderOptionCard option={option} />
        ))}
      </Box>
    </>
  );
}
