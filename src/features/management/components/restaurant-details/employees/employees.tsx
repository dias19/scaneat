import React, { useState } from 'react';

import { Box, Button, styled } from '@mui/material';

import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { EmployeeAdd } from './employee-add';
import { EmployeeCard } from './employee-card';

export function RestaurantEmployees() {
  const employees = [
    {
      name: 'Андрей',
      surname: 'sre',
      email: 'dias@nu.edu.kz',
      phone: '877788123',
      role: 'cheff',
      photoUrl: 'products/5576ed5b-13c9-4c9e-94f4-892e5bdac77f.jpeg',
      photoId: 1,
    },
    {
      name: 'gg 123',
      surname: '1',
      email: 'dias@nur.lz',
      phone: '87787881723',
      role: 'manager',
      photoUrl: 'products/5576ed5b-13c9-4c9e-94f4-892e5bdac77f.jpeg',
      photoId: 2,
    },
  ];

  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  return (
    <BoxStyle>
      {employees.map((employee) => (
        <EmployeeCard employee={employee} key={employee.name} />
      ))}
      <BoxButtonStyle>
        <Button
          variant="contained"
          size="large"
          onClick={handleAddOpen}
        >
          Добавить рабочего
        </Button>
      </BoxButtonStyle>
      <EmployeeAdd
        open={addOpen}
        onOpen={handleAddOpen}
        onClose={handleAddClose}
      />
    </BoxStyle>
  );
}

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: `calc(${BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT}px + ${theme.spacing(2)})`,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));
