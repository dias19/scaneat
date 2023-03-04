import React, { useState } from 'react';

import {
  Box, Button, Container, styled, Typography,
} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

import employeeApi from '~/api/employee/api';
import { useResponsive } from '~/hooks/useResponsive';
import { BOTTOM_NAVIGATION } from '~/layouts/management/constants';

import { NavigateBack } from '../../management/components/navigate-back';
import { Employee } from '../type';
import { EmployeeAdd } from './employee-add';
import { EmployeeCard } from './employee-card';

interface LocationState {
  restaurantName: string;
}

export function RestaurantEmployeesList() {
  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const { data: employees = [] } = employeeApi.endpoints.getEmployees.useQuery({
    restaurantId,
  });

  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const location = useLocation();

  const { restaurantName } = location.state as LocationState;

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const isDesktop = useResponsive('up', 'sm');

  if (isDesktop) {
    return (
      <EmployeeListDesktop
        addOpen={addOpen}
        employees={employees}
        handleAddClose={handleAddClose}
        handleAddOpen={handleAddOpen}
        restaurantName={restaurantName}
      />
    );
  }
  return (
    <EmployeeListMobile
      addOpen={addOpen}
      employees={employees}
      handleAddClose={handleAddClose}
      handleAddOpen={handleAddOpen}
    />
  );
}

type EmployeeListMobileProps={
  employees: Employee[],
  addOpen: boolean,
  handleAddClose: VoidFunction,
  handleAddOpen: VoidFunction,
}

type EmployeeListDesktopProps=EmployeeListMobileProps & {
  restaurantName: string,
}

function EmployeeListMobile({
  employees,
  addOpen,
  handleAddClose,
  handleAddOpen,
}:EmployeeListMobileProps) {
  const isEmployeesListEmpty = employees.length === 0;
  return (
    <BoxStyle>
      {isEmployeesListEmpty && (
        <Typography variant="h6">
          Нету созданных работчиков
        </Typography>
      )}
      {employees.map((employee) => (
        <EmployeeCard
          employee={employee}
          key={`employee-${employee.id}-card`}
        />
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

function EmployeeListDesktop({
  employees,
  addOpen,
  handleAddClose,
  handleAddOpen,
  restaurantName,
}:EmployeeListDesktopProps) {
  const isEmployeesListEmpty = employees.length === 0;
  return (
    <Container>
      <NavigateBack />
      <Typography variant="h6" sx={{ mb: 3 }}>
        Рабочие ресторана
        {' '}
        {`${restaurantName}`}
      </Typography>
      <Button variant="contained" size="large" onClick={handleAddOpen}>
        Добавить рабочего
      </Button>
      <BoxEmployeeStyle>
        {isEmployeesListEmpty && (
        <Typography variant="h6">
          Нету созданных работчиков
        </Typography>
        )}
        {employees.map((employee) => (
          <EmployeeCard employee={employee} key={`employee-${employee.id}-card`} />
        ))}
      </BoxEmployeeStyle>
      <EmployeeAdd
        open={addOpen}
        onOpen={handleAddOpen}
        onClose={handleAddClose}
      />
    </Container>
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

const BoxEmployeeStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(1),
}));
