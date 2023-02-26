import React, { useState } from 'react';

import { useResponsive } from '~/hooks/useResponsive';

import { ModifyActionBottomDrawer } from '../../management/components/modify-action-bottom-drawer';
import { ModifyActionPopover } from '../../management/components/modify-action-popover';
import { RestarauntModifyActions } from '../../management/types';
import { Employee } from '../type';
import { EmployeeActions } from './employee-actions';

type Props={
  openActions: boolean,
  onCloseActions: VoidFunction,
  onOpenActions: VoidFunction,
  employee: Employee
  anchorEl: Element | null
}

export function EmployeeModifyActions({
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
      <EmployeeActions
        handleAction={handleAction}
        employee={employee}
        action={action}
      />
    </>
  );
}
