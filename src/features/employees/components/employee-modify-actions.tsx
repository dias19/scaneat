import React, { useState } from 'react';

import { useResponsive } from '~/hooks/useResponsive';

import { ModifyActionBottomDrawer } from '../../management/components/modify-action-bottom-drawer';
import { ModifyActionPopover } from '../../management/components/modify-action-popover';
import { RestarauntModifyActions } from '../../management/types';
import { Employee } from '../type';
import { EmployeeAction } from './employee-action';

type Props={
  open: boolean,
  onClose: VoidFunction,
  onOpen: VoidFunction,
  employee: Employee
  anchorEl: Element | null
}

export function EmployeeModifyActions({
  open,
  onClose,
  onOpen,
  employee,
  anchorEl,
}:Props) {
  const isDesktop = useResponsive('up', 'sm');

  const [action, setAction] = useState<RestarauntModifyActions | null>(null);

  const handleAction = (modifyAction: RestarauntModifyActions) => {
    setAction(modifyAction);
  };

  const commonProps = {
    open,
    onClose,
    handleAction,

  };
  return (
    <>
      {
     !isDesktop && (
     <ModifyActionBottomDrawer
       onOpen={onOpen}
       {...commonProps}
       title={`${employee.name} ${employee.surname}`}
     />
     )
    }
      {
      isDesktop && (
        <ModifyActionPopover
          {...commonProps}
          anchorEl={anchorEl}
        />
      )
    }
      <EmployeeAction
        setAction={handleAction}
        employee={employee}
        action={action}
      />
    </>
  );
}
