import React from 'react';

import { styled } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';

import { EmployeeForm } from './employess-form';

type EmployeeAddProps = {
  open: boolean;
  onOpen: VoidFunction,
  onClose: VoidFunction,
};

export function EmployeeAdd({ open, onOpen, onClose }: EmployeeAddProps) {
  return (
    <BottomDrawerStyle
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      title="Добавить рабочего"
      hasCloser
    >
      <EmployeeForm buttonTitle="Добавить" />
    </BottomDrawerStyle>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
