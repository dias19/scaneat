import React, { useState } from 'react';

import { useResponsive } from '~/hooks/useResponsive';

import { Category, RestarauntModifyActions } from '../../types';
import { ModifyActionBottomDrawer } from '../modify-action-bottom-drawer';
import { ModifyActionPopover } from '../modify-action-popover';
import { RestaurantCategoryDelete } from './category-delete';
import { RestaurantCategoryEdit } from './category-edit';

type Props = {
  open: boolean;
  onClose: VoidFunction,
  onOpen: VoidFunction,
  category: Category,
  anchorEl?: Element | null
};
export function RestaurantCategoryModifyActions({
  open, onClose, onOpen, category, anchorEl,
}: Props) {
  const [action, setAction] = useState<RestarauntModifyActions | null>(null);

  const handleAction = (modifyAction: RestarauntModifyActions) => {
    setAction(modifyAction);
  };

  const isDesktop = useResponsive('up', 'sm');
  return (
    <>
      {isDesktop && (
      <ModifyActionPopover
        open={open}
        onClose={onClose}
        handleAction={handleAction}
        anchorEl={anchorEl}
      />
      )}

      {!isDesktop && (
      <ModifyActionBottomDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        handleAction={handleAction}
        title={category.name}
      />
      )}

      <RestaurantCategoryDelete
        category={category}
        deleteOpen={action === 'delete'}
        handleAction={handleAction}
        onClose={onClose}
      />

      <RestaurantCategoryEdit
        category={category}
        handleAction={handleAction}
        editOpen={action === 'edit'}
        onClose={onClose}
      />
    </>
  );
}
