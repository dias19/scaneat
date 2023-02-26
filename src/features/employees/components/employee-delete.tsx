import React from 'react';

import {
  Box, Typography, Button, styled,
} from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { useResponsive } from '~/hooks/useResponsive';

import { RestarauntModifyActions } from '../../management/types';
import { Employee } from '../type';

type Props={
    deleteOpen: boolean,
    handleAction: (action: RestarauntModifyActions) => void,
    employee: Employee,
    handleDelete: VoidFunction,
}

export function EmployeeDelete({
  deleteOpen, handleAction, employee, handleDelete,
}:Props) {
  const handleOpen = () => {
    handleAction('delete');
  };

  const handleClose = () => {
    handleAction(null);
  };
  const isDesktop = useResponsive('up', 'sm');

  if (isDesktop) {
    return (
      <EmployeeDeleteDesktop
        deleteOpen={deleteOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
        employee={employee}
        handleDelete={handleDelete}
      />
    );
  }
  return (
    <EmployeeDeleteMobile
      deleteOpen={deleteOpen}
      handleClose={handleClose}
      handleOpen={handleOpen}
      employee={employee}
      handleDelete={handleDelete}
    />
  );
}

type EmployeeDeleteProps=Pick<Props, 'employee' | 'deleteOpen' | 'handleDelete'> & {
  handleClose: VoidFunction,
  handleOpen: VoidFunction,
}

function EmployeeDeleteMobile({
  deleteOpen,
  employee,
  handleDelete,
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
            onClick={handleDelete}
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
  handleDelete,
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
          <Button variant="contained" size="large" onClick={handleDelete} color="error">
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
