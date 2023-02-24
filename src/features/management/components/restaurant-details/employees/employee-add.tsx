import React from 'react';

import { styled } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { EmployeeForm } from './employess-form';

type Props = {
  open: boolean;
  onOpen: VoidFunction,
  onClose: VoidFunction,
};

export function EmployeeAdd({ open, onOpen, onClose }: Props) {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <>
      {
      isDesktop
      && (
        <EmployeeAddDesktop
          onClose={onClose}
          onOpen={onOpen}
          open={open}
        />
      )
      }
      {
        !isDesktop && (
          <EmployeeAddMobile
            onClose={onClose}
            onOpen={onOpen}
            open={open}
          />
        )
      }
    </>
  );
}

function EmployeeAddDesktop({ open, onOpen, onClose }: Props) {
  return (
    <DialogForm
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      title="Добавить рабочего"
      hasCloser
    >
      <EmployeeForm
        buttonTitle="Добавить рабочего"
        onCloseForm={onClose}
      />
    </DialogForm>
  );
}

function EmployeeAddMobile({ open, onOpen, onClose }: Props) {
  return (
    <BottomDrawerStyle
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      title="Добавить рабочего"
      hasCloser
    >
      <EmployeeForm
        buttonTitle="Добавить"
        onCloseForm={onClose}
      />
    </BottomDrawerStyle>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
