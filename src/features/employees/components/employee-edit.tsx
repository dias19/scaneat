import React from 'react';

import { styled } from '@mui/material';
import { toast } from 'react-toastify';

import employeeApi from '~/api/employee/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { RestarauntModifyActions } from '../../management/types';
import { Employee } from '../type';
import { EmployeeForm, EmployeeFormData } from './employess-form';

type Props = {
  editOpen: boolean,
  setAction: (action: RestarauntModifyActions) => void;
  employee: Employee;
  restaurantId: number,
};

export function EmployeeEdit({
  editOpen, setAction, employee, restaurantId,
}: Props) {
  const [editEmployee] = employeeApi.endpoints.editEmployee.useMutation();

  const handleClose = () => {
    setAction(null);
  };

  const handleOpen = () => {
    setAction('edit');
  };

  const isDesktop = useResponsive('up', 'sm');

  const handleEditEmployee = async (data: EmployeeFormData) => {
    const { photoUrl, email, ...body } = data;
    try {
      await editEmployee({ restaurantId, staffId: employee.restaurantStaffId, ...body });
      setAction(null);
    } catch (e) {
      toast.error('Упс, вышла ошибочка');
    }
  };
  const commonProps = {
    handleClose,
    handleOpen,
    employee,
    handleEditEmployee,

  };

  return (
    <>
      <EmployeeEditDesktop
        editOpen={editOpen && isDesktop}
        {...commonProps}
      />

      <EmployeeEditMobile
        editOpen={editOpen && !isDesktop}
        {...commonProps}
      />
    </>
  );
}

type EmployeeEditProps = {
  handleClose: VoidFunction;
  handleOpen: VoidFunction;
  editOpen: boolean;
  employee: Employee;
  handleEditEmployee: (data: EmployeeFormData) => void;
};

function EmployeeEditMobile({
  handleClose,
  handleOpen,
  editOpen,
  employee,
  handleEditEmployee,
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
        onSubmit={handleEditEmployee}
      />
    </BottomDrawerStyle>
  );
}

function EmployeeEditDesktop({
  handleClose,
  handleOpen,
  editOpen,
  employee,
  handleEditEmployee,
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
        onSubmit={handleEditEmployee}
      />
    </DialogForm>
  );
}

const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(100% - ${theme.spacing(3)})`,
  },
}));
