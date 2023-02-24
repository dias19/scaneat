import React from 'react';

import { styled } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

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

  const isDesktop = useResponsive('up', 'sm');
  return (
    <>
      {
      isDesktop && (
        <EmployeeEditDesktop
          openEdit={openEdit}
          handleClose={handleClose}
          handleOpen={handleOpen}
          employee={employee}
        />
      )
      }
      {
        !isDesktop && (
          <EmployeeEditMobile
            openEdit={openEdit}
            handleClose={handleClose}
            handleOpen={handleOpen}
            employee={employee}
          />
        )
      }
    </>
  );
}

type EmployeeEditProps={
  handleClose: VoidFunction,
  handleOpen: VoidFunction,
  openEdit: boolean,
  employee: Employee
}

function EmployeeEditMobile({
  handleClose,
  handleOpen,
  openEdit,
  employee,
}:EmployeeEditProps) {
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

function EmployeeEditDesktop({
  handleClose,
  handleOpen,
  openEdit,
  employee,
}:EmployeeEditProps) {
  return (
    <DialogForm
      open={openEdit}
      onClose={handleClose}
      onOpen={handleOpen}
      title="Редактировать рабочего"
      hasCloser
    >
      <EmployeeForm
        buttonTitle="Редактировать"
        employee={employee}
        onCloseForm={handleClose}
      />
    </DialogForm>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
