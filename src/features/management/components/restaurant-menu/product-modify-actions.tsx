import React, { useState } from 'react';

import { useResponsive } from '~/hooks/useResponsive';

import { Product } from '../../types';
import { ModifyActionBottomDrawer } from '../modify-action-bottom-drawer';
import { ModifyActionPopover } from '../modify-action-popover';
import { RestaurantProductDelete } from './product-delete';
import { RestaurantProductEdit } from './product-edit';

type EditDishProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  product: Product,
  anchorEl?: Element | null
};
export function RestaurantProductModifyActions({
  open, setOpen, product, anchorEl,
}: EditDishProps) {
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);

  const [openEditProduct, setOpenEditProduct] = useState(false);

  const isLaptop = useResponsive('up', 'sm');
  return (
    <>
      {
      isLaptop
        && (
          <ModifyActionPopover
            open={open}
            setOpen={setOpen}
            setOpenEdit={setOpenEditProduct}
            setOpenDelete={setOpenDeleteProduct}
            anchorEl={anchorEl}
          />
        )
}
      {
      !isLaptop
       && (
       <ModifyActionBottomDrawer
         open={open}
         setOpen={setOpen}
         setOpenDelete={setOpenDeleteProduct}
         setOpenEdit={setOpenEditProduct}
         title={product.name}
       />
       )
        }
      <RestaurantProductDelete
        openDeleteProduct={openDeleteProduct}
        onCloseDeleteProduct={() => setOpenDeleteProduct(false)}
        onOpenDeleteProduct={() => setOpenDeleteProduct(true)}
        title={product.name}
        productId={product.id}
      />
      <RestaurantProductEdit
        openEditDish={openEditProduct}
        onCloseEditDish={() => setOpenEditProduct(false)}
        onOpenEditDish={() => setOpenEditProduct(true)}
        title={product.name}
        product={product}
      />
    </>
  );
}
