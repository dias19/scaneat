import React from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import employeeApi from '~/api/employee/api';
import { RestarauntModifyActions } from '~/features/management';

import { Employee } from '../type';
import { EmployeeDelete } from './employee-delete';
import { EmployeeEdit } from './employee-edit';
import { EmployeeFormData } from './employess-form';

type Props={
action: string | null,
 handleAction: (action: RestarauntModifyActions) => void,
  employee: Employee;
}

export function EmployeeActions({
  handleAction,
  employee,
  action,
}:Props) {
  const [deleteEmployee] = employeeApi.endpoints.deleteEmployee.useMutation();

  const [editEmployee] = employeeApi.endpoints.editEmployee.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee({ restaurantId, staffId: employee.restaurantStaffId });
    } catch (e) {
      toast.error('Упс, вышла ошибочка');
    }
    handleAction(null);
  };

  const handleEditEmployee = async (data: EmployeeFormData) => {
    const { photoUrl, email, ...body } = data;
    try {
      await editEmployee({ restaurantId, staffId: employee.restaurantStaffId, ...body });
      handleAction(null);
    } catch (e) {
      toast.error('Упс, вышла ошибочка');
    }
  };
  if (action === 'edit') {
    return (
      <EmployeeEdit
        editOpen
        handleAction={handleAction}
        employee={employee}
        handleEdit={handleEditEmployee}
      />
    );
  }
  return (
    <EmployeeDelete
      deleteOpen={action === 'delete'}
      handleAction={handleAction}
      employee={employee}
      handleDelete={handleDeleteEmployee}
    />
  );
}
