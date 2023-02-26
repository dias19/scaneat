import React from 'react';

import { useParams } from 'react-router-dom';

import { RestarauntModifyActions } from '~/features/management';

import { Employee } from '../type';
import { EmployeeDelete } from './employee-delete';
import { EmployeeEdit } from './employee-edit';

type Props={
action: string | null,
 setAction: (action: RestarauntModifyActions) => void,
  employee: Employee;
}

export function EmployeeAction({
  setAction,
  employee,
  action,
}:Props) {
  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const commonProps = {
    employee,
    restaurantId,
    setAction,
  };

  return (
    <>
      <EmployeeEdit
        editOpen={action === 'edit'}
        {...commonProps}
      />
      <EmployeeDelete
        deleteOpen={action === 'delete'}
        {...commonProps}
      />
    </>
  );
}
