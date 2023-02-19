import React from 'react';

import { styled } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';

import { Employee } from '../../../types';
import { EmployeeForm } from './employess-form';

type EmployeeEditProps = {
  openEdit: boolean;
  onCloseEdit: VoidFunction,
  onOpenEdit: VoidFunction,
  employee: Employee;
};

export function EmployeeEdit({
  openEdit, onCloseEdit, onOpenEdit, employee,
}: EmployeeEditProps) {
  return (
    <BottomDrawerStyle
      open={openEdit}
      onClose={onCloseEdit}
      onOpen={onOpenEdit}
      hasCloser
      title="Редактировать рабочего"
    >
      <EmployeeForm buttonTitle="Редактировать" employee={employee} />
    </BottomDrawerStyle>
  );
}
const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
