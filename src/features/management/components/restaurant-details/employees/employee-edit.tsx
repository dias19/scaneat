import React from 'react';

import { styled } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';

import { Employee, RestarauntModifyActions } from '../../../types';
import { EmployeeForm } from './employess-form';

type Props = {
  openEdit: boolean;
 handleAction: (action: RestarauntModifyActions) => void,
  employee: Employee;
};

export function EmployeeEdit({
  openEdit, handleAction, employee,
}: Props) {
  const handleClose = () => {
    handleAction(null);
  };

  const handleOpen = () => {
    handleAction('edit');
  };
  return (
    <BottomDrawerStyle
      open={openEdit}
      onClose={handleClose}
      onOpen={handleOpen}
      hasCloser
      title="Редактировать рабочего"
    >
      <EmployeeForm
        buttonTitle="Редактировать"
        employee={employee}
        onCloseForm={handleClose}
      />
    </BottomDrawerStyle>
  );
}
const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
