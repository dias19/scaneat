import React, { useState } from 'react';

import { useResponsive } from '~/hooks/useResponsive';

import { Category } from '../../types';
import { ModifyActionBottomDrawer } from '../modify-action-bottom-drawer';
import { ModifyActionPopover } from '../modify-action-popover';
import { RestaurantCategoryDelete } from './category-delete';
import { RestaurantCategoryEdit } from './category-edit';

type EditDishProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  category: Category,
  anchorEl?: Element | null
};
export function RestaurantCategoryModifyActions({
  open, setOpen, category, anchorEl,
}: EditDishProps) {
  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const isLaptop = useResponsive('up', 'sm');
  return (
    <>
      {isLaptop && (
      <ModifyActionPopover
        open={open}
        setOpen={setOpen}
        setEditOpen={setEditOpen}
        setDeleteOpen={setDeleteOpen}
        anchorEl={anchorEl}
      />
      )}

      {!isLaptop && (
      <ModifyActionBottomDrawer
        open={open}
        setOpen={setOpen}
        setDeleteOpen={setDeleteOpen}
        setEditOpen={setEditOpen}
        title={category.name}
      />
      )}

      <RestaurantCategoryDelete
        category={category}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        setActionsOpen={setOpen}
      />

      <RestaurantCategoryEdit
        category={category}
        setEditOpen={setEditOpen}
        editOpen={editOpen}
        setActionsOpen={setOpen}
      />
    </>
  );
}
