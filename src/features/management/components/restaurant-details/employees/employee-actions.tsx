import React, { useState } from 'react';

import { Employee, RestarauntModifyActions } from '../../../types';
import { ModifyActionBottomDrawer } from '../../modify-action-bottom-drawer';
import { EmployeeDelete } from './employee-delete';
import { EmployeeEdit } from './employee-edit';

type Props={
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
}:Props) {
  const [action, setAction] = useState<RestarauntModifyActions | null>(null);

  const handleAction = (modifyAction: RestarauntModifyActions) => {
    setAction(modifyAction);
  };

  return (
    <>
      <ModifyActionBottomDrawer
        open={openActions}
        onClose={onCloseActions}
        onOpen={onOpenActions}
        handleAction={handleAction}
        title={`${employee.name} ${employee.surname}`}
      />
      <EmployeeDelete
        openDelete={action === 'delete'}
        handleAction={handleAction}
        employee={employee}
      />
      <EmployeeEdit
        openEdit={action === 'edit'}
        handleAction={handleAction}
        employee={employee}
      />
    </>
  );
}
