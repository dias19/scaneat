import React from 'react';

import {
  Box, styled, SwipeableDrawer, SwipeableDrawerProps,
} from '@mui/material';

import { BottomDrawerHeader } from './bottom-drawer-header';

type Props = Omit<SwipeableDrawerProps, 'onOpen'> & {
  children?: React.ReactNode;
  onClose?: VoidFunction;
  onOpen?: VoidFunction;
  title?: string
};

export function BottomDrawer({
  children, onClose, onOpen, title, ...drawerProps
}: Props) {
  const handleOnOpen = () => {
    onOpen?.();
  };

  return (
    <DrawerStyle {...drawerProps} onClose={onClose} onOpen={handleOnOpen} anchor="bottom">
      <BottomDrawerHeader title={title} onClose={onClose} />
      <ContentStyle>{children}</ContentStyle>
    </DrawerStyle>
  );
}

const DrawerStyle = styled(SwipeableDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(3),
  },
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  flex: 1,
}));
