import React, { useState } from 'react';

import { Employee } from '../../../types';
import { ModifyActionBottomDrawer } from '../../modify-action-bottom-drawer';
import { EmployeeDelete } from './employee-delete';
import { EmployeeEdit } from './employee-edit';

type EmployeeActionsProps={
  openActions: boolean,
  onCloseActions: VoidFunction,
  onOpenActions: VoidFunction,
  employee: Employee
}

export function EmployeeActions({
  openActions,
  onCloseActions,
  onOpenActions,
  employee,
}:EmployeeActionsProps) {
  const [openDelete, setOpenDelete] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <ModifyActionBottomDrawer
        open={openActions}
        onClose={onCloseActions}
        onOpen={onOpenActions}
        onOpenDelete={handleOpenDelete}
        onOpenEdit={handleOpenEdit}
        title={`${employee.name} ${employee.surname}`}
      />
      <EmployeeDelete
        openDelete={openDelete}
        onCloseDelete={handleCloseDelete}
        onOpenDelete={handleOpenDelete}
        employee={employee}
      />
      <EmployeeEdit
        openEdit={openEdit}
        onOpenEdit={handleOpenEdit}
        onCloseEdit={handleCloseEdit}
        employee={employee}
      />
    </>
  );
}
