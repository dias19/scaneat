import React from 'react';

import {
  Box, Typography, Button, styled,
} from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';

import { Employee } from '../../../types';

type EmployeeDeleteProps={
    openDelete: boolean,
    onOpenDelete: VoidFunction,
    onCloseDelete: VoidFunction,
    employee: Employee,
}

export function EmployeeDelete({
  openDelete, onCloseDelete, onOpenDelete, employee,
}:EmployeeDeleteProps) {
  const handleDeleteEmployee = () => {
    onCloseDelete();
  };

  return (
    <BottomDrawer
      open={openDelete}
      onClose={onCloseDelete}
      onOpen={onOpenDelete}
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
          <Button variant="outlined" sx={{ mr: 1 }} size="large" onClick={onCloseDelete}>
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

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
}));
