import React, { useState } from 'react';

import {
  Box, Card, CardContent, Chip, IconButton, styled, Typography,
} from '@mui/material';

import { Iconify } from '~/components/Iconify';
import { Image } from '~/components/image';

import { Employee } from '../../../types';
import { EmployeeActions } from './employee-actions';

type EmployeeCardProps={
    employee: Employee
}

export function EmployeeCard({ employee }:EmployeeCardProps) {
  const [openActions, setOpenActions] = useState(false);

  const handleActionsOpen = () => {
    setOpenActions(true);
  };

  const handleActionsClose = () => {
    setOpenActions(false);
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContentStyle>
          <ImageStyle
            url={employee.photoUrl}
            alt="Employee"
          />
          <BoxStyle>
            <Box display="flex">
              <Typography variant="subtitle2">
                {`${employee.name} ${employee.surname}`}
              </Typography>
              <BoxButtonStyle>
                <IconButton sx={{ padding: 0 }} onClick={handleActionsOpen}>
                  <Iconify icon="material-symbols:more-vert" sx={{ width: 24, height: 24 }} />
                </IconButton>
              </BoxButtonStyle>
            </Box>
            <Typography variant="caption" color="grey.600" sx={{ mt: 1 }}>
              Телефон:
              {' '}
              {employee.phone}
            </Typography>
            <Typography variant="caption" color="grey.600">
              Почта:
              {' '}
              {employee.email}
            </Typography>
            <Box>
              <Chip
                label={employee.role}
                color="info"
              />
            </Box>
          </BoxStyle>
        </CardContentStyle>
      </Card>
      <EmployeeActions
        openActions={openActions}
        onCloseActions={handleActionsClose}
        onOpenActions={handleActionsOpen}
        employee={employee}
      />
    </>
  );
}

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

const ImageStyle = styled(Image)(({ theme }) => ({
  width: 96,
  height: 96,
  marginRight: theme.spacing(2),
}));

const BoxStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const BoxButtonStyle = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
});
