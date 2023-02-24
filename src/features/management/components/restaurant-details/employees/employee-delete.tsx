import React from 'react';

import {
  Box, Typography, Button, styled,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import employeeApi from '~/api/employee/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { Employee, RestarauntModifyActions } from '../../../types';

type Props={
    openDelete: boolean,
    handleAction: (action: RestarauntModifyActions) => void,
    employee: Employee,
}

export function EmployeeDelete({
  openDelete, handleAction, employee,
}:Props) {
  const [deleteEmployee] = employeeApi.endpoints.deleteEmployee.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const isDesktop = useResponsive('up', 'sm');

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee({ restaurantId, staffId: employee.restaurantStaffId });
    } catch (e) {
      toast.error('Упс, вышла ошибочка');
    }
    handleAction(null);
  };

  const handleOpen = () => {
    handleAction('delete');
  };

  const handleClose = () => {
    handleAction(null);
  };
  return (
    <>
      {
      isDesktop && (
        <EmployeeDeleteDesktop
          openDelete={openDelete}
          handleClose={handleClose}
          handleOpen={handleOpen}
          employee={employee}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      )
      }
      {
        !isDesktop && (
          <EmployeeDeleteMobile
            openDelete={openDelete}
            handleClose={handleClose}
            handleOpen={handleOpen}
            employee={employee}
            handleDeleteEmployee={handleDeleteEmployee}
          />
        )
      }
    </>
  );
}

type EmployeeDeleteProps={
  openDelete: boolean,
  employee: Employee,
  handleDeleteEmployee: VoidFunction,
  handleClose: VoidFunction,
  handleOpen: VoidFunction,
}

function EmployeeDeleteMobile({
  openDelete,
  employee,
  handleDeleteEmployee,
  handleClose,
  handleOpen,
}:EmployeeDeleteProps) {
  return (
    <BottomDrawer
      open={openDelete}
      onClose={handleClose}
      onOpen={handleOpen}
      title={`${employee.name} ${employee.surname}`}
      hasCloser
    >
      <Box>
        <Typography variant="subtitle2">
          Вы уверены что хотите удалить рабочего
          {' '}
          {employee.name}
        </Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть этого рабочего
        </Typography>
        <BoxButtonStyle>
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="contained" color="error" size="large" onClick={handleDeleteEmployee}>
            Удалить
          </Button>
        </BoxButtonStyle>
      </Box>
    </BottomDrawer>
  );
}

function EmployeeDeleteDesktop({
  openDelete,
  employee,
  handleDeleteEmployee,
  handleClose,
  handleOpen,
}:EmployeeDeleteProps) {
  return (
    <DialogForm
      open={openDelete}
      onClose={handleClose}
      onOpen={handleOpen}
      title={`Удалить "${employee.name} ${employee.surname}"`}
      hasCloser
      maxWidth="xs"
    >
      <Box>
        <Typography variant="subtitle2">
          Вы уверены что хотите удалить рабочего
          {' '}
          {employee.name}
        </Typography>
        <Typography variant="caption" component="p" color="grey.600" sx={{ mb: 3 }}>
          После удалении вы не сможете вернуть это рабочего
        </Typography>
        <BoxButtonStyle>
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="contained" size="large" onClick={handleDeleteEmployee} color="error">
            Удалить
          </Button>
        </BoxButtonStyle>
      </Box>
    </DialogForm>
  );
}

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
}));
