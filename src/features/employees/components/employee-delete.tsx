import React from 'react';

import {
  Box, Typography, Button, styled,
} from '@mui/material';
import { toast } from 'react-toastify';

import employeeApi from '~/api/employee/api';
import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { RestarauntModifyActions } from '../../management/types';
import { Employee } from '../type';

type Props={
    deleteOpen: boolean,
    setAction: (action: RestarauntModifyActions) => void,
    employee: Employee,
    restaurantId: number,
}

export function EmployeeDelete({
  deleteOpen, setAction, employee, restaurantId,
}:Props) {
  const handleOpen = () => {
    setAction('delete');
  };

  const handleClose = () => {
    setAction(null);
  };
  const [deleteEmployee] = employeeApi.endpoints.deleteEmployee.useMutation();

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee({ restaurantId, staffId: employee.restaurantStaffId });
    } catch (e) {
      toast.error('Упс, вышла ошибочка');
    }
    setAction(null);
  };
  const isDesktop = useResponsive('up', 'sm');

  const commonProps = {
    handleClose,
    handleOpen,
    employee,
    handleDeleteEmployee,
  };
  return (
    <>
      <EmployeeDeleteDesktop
        deleteOpen={deleteOpen && isDesktop}
        {...commonProps}
      />
      <EmployeeDeleteMobile
        deleteOpen={deleteOpen && !isDesktop}
        {...commonProps}
      />
    </>
  );
}

type EmployeeDeleteProps=Pick<Props, 'employee' | 'deleteOpen'> & {
  handleClose: VoidFunction,
  handleOpen: VoidFunction,
  handleDeleteEmployee: VoidFunction,
}

function EmployeeDeleteMobile({
  deleteOpen,
  employee,
  handleDeleteEmployee,
  handleClose,
  handleOpen,
}:EmployeeDeleteProps) {
  return (
    <BottomDrawer
      open={deleteOpen}
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
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={handleDeleteEmployee}
          >
            Удалить
          </Button>
        </BoxButtonStyle>
      </Box>
    </BottomDrawer>
  );
}

function EmployeeDeleteDesktop({
  deleteOpen,
  employee,
  handleDeleteEmployee,
  handleClose,
  handleOpen,
}:EmployeeDeleteProps) {
  return (
    <DialogForm
      open={deleteOpen}
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
