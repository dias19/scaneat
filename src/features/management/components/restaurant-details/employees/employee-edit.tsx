import React from 'react';

import { styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import employeeApi from '~/api/employee/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Employee, EmployeeFormData, RestarauntModifyActions } from '../../../types';
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

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const handleOpen = () => {
    handleAction('edit');
  };

  const [editEmployee] = employeeApi.endpoints.editEmployee.useMutation();

  const handleEdit = async (data: EmployeeFormData) => {
    const { photoUrl, email, ...body } = data;
    try {
      await editEmployee({ restaurantId, staffId: employee.id, body });
      handleClose();
    } catch (e) {
      toast.error('Упс, вышла ошибочка');
    }
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
          handleEdit={handleEdit}
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
            handleEdit={handleEdit}
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
  handleEdit: (data: EmployeeFormData) => void,
}

function EmployeeEditMobile({
  handleClose,
  handleOpen,
  openEdit,
  employee,
  handleEdit,
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
        onSubmit={handleEdit}
      />
    </BottomDrawerStyle>
  );
}

function EmployeeEditDesktop({
  handleClose,
  handleOpen,
  openEdit,
  employee,
  handleEdit,
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
