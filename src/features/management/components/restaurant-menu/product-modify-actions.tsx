import React, { useState } from 'react';

import { useResponsive } from '~/hooks/useResponsive';

import { Product, RestarauntModifyActions } from '../../types';
import { ModifyActionBottomDrawer } from '../modify-action-bottom-drawer';
import { ModifyActionPopover } from '../modify-action-popover';
import { RestaurantProductDelete } from './product-delete';
import { RestaurantProductEdit } from './product-edit';

type EditDishProps = {
  open: boolean;
  onClose: VoidFunction,
  onOpen: VoidFunction,
  product: Product,
  anchorEl?: Element | null
};
export function RestaurantProductModifyActions({
  open, onOpen, onClose, product, anchorEl,
}: EditDishProps) {
  const [action, setAction] = useState<RestarauntModifyActions | null>(null);

  const handleAction = (modifyAction: RestarauntModifyActions) => {
    setAction(modifyAction);
  };

  const isDesktop = useResponsive('up', 'sm');
  return (
    <>
      { isDesktop && (
      <ModifyActionPopover
        open={open}
        handleAction={handleAction}
        onClose={onClose}
        anchorEl={anchorEl}
      />
      )}
      { !isDesktop && (
      <ModifyActionBottomDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        handleAction={handleAction}
        title={product.name}
      />
      )}
      <RestaurantProductDelete
        deleteOpen={action === 'delete'}
        handleAction={handleAction}
        title={product.name}
        productId={product.id}
      />
      <RestaurantProductEdit
        editOpen={action === 'edit'}
        handleAction={handleAction}
        title={product.name}
        product={product}
      />
    </>
  );
}
