import React from 'react';

import { styled } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { RestarauntModifyActions } from '../../management/types';
import { Employee } from '../type';
import { EmployeeForm, EmployeeFormData } from './employess-form';

type Props = {
  editOpen: boolean,
  handleAction: (action: RestarauntModifyActions) => void;
  employee: Employee;
  handleEdit: (data: EmployeeFormData) => void;
};

export function EmployeeEdit({
  editOpen, handleAction, employee, handleEdit,
}: Props) {
  const handleClose = () => {
    handleAction(null);
  };

  const handleOpen = () => {
    handleAction('edit');
  };

  const isDesktop = useResponsive('up', 'sm');

  if (isDesktop) {
    return (
      <EmployeeEditDesktop
        editOpen={editOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
        employee={employee}
        handleEdit={handleEdit}
      />
    );
  }

  return (
    <EmployeeEditMobile
      editOpen={editOpen}
      handleClose={handleClose}
      handleOpen={handleOpen}
      employee={employee}
      handleEdit={handleEdit}
    />
  );
}

type EmployeeEditProps = {
  handleClose: VoidFunction;
  handleOpen: VoidFunction;
  editOpen: boolean;
  employee: Employee;
  handleEdit: (data: EmployeeFormData) => void;
};

function EmployeeEditMobile({
  handleClose,
  handleOpen,
  editOpen,
  employee,
  handleEdit,
}: EmployeeEditProps) {
  return (
    <BottomDrawerStyle
      open={editOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      hasCloser
      title="Редактировать рабочего"
    >
      <EmployeeForm
        buttonTitle="Редактировать"
        employee={employee}
        onCloseForm={handleClose}
        onSubmit={handleEdit}
      />
    </BottomDrawerStyle>
  );
}

function EmployeeEditDesktop({
  handleClose,
  handleOpen,
  editOpen,
  employee,
  handleEdit,
}: EmployeeEditProps) {
  return (
    <DialogForm
      open={editOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      title="Редактировать рабочего"
      hasCloser
    >
      <EmployeeForm
        buttonTitle="Редактировать"
        employee={employee}
        onCloseForm={handleClose}
        onSubmit={handleEdit}
      />
    </DialogForm>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
