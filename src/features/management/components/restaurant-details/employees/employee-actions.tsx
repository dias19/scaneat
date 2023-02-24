import React, { useState } from 'react';

import { useResponsive } from '~/hooks/useResponsive';

import { Employee, RestarauntModifyActions } from '../../../types';
import { ModifyActionBottomDrawer } from '../../modify-action-bottom-drawer';
import { ModifyActionPopover } from '../../modify-action-popover';
import { EmployeeDelete } from './employee-delete';
import { EmployeeEdit } from './employee-edit';

type Props={
  openActions: boolean,
  onCloseActions: VoidFunction,
  onOpenActions: VoidFunction,
  employee: Employee
  anchorEl: Element | null
}

export function EmployeeActions({
  openActions,
  onCloseActions,
  onOpenActions,
  employee,
  anchorEl,
}:Props) {
  const isDesktop = useResponsive('up', 'sm');

  const [action, setAction] = useState<RestarauntModifyActions | null>(null);

  const handleAction = (modifyAction: RestarauntModifyActions) => {
    setAction(modifyAction);
  };

  return (
    <>
      {
     !isDesktop && (
     <ModifyActionBottomDrawer
       open={openActions}
       onClose={onCloseActions}
       onOpen={onOpenActions}
       handleAction={handleAction}
       title={`${employee.name} ${employee.surname}`}
     />
     )
    }
      {
      isDesktop && (
        <ModifyActionPopover
          open={openActions}
          onClose={onCloseActions}
          handleAction={handleAction}
          anchorEl={anchorEl}
        />
      )
    }
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
