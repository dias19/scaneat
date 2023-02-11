import React, { useState } from 'react';

import { Product } from '../../types';
import { ModifyActionBottomDrawer } from '../modify-action-bottom-drawer';
import { RestaurantProductDelete } from './product-delete';
import { RestaurantProductEdit } from './product-edit';

type EditDishProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  product: Product
};
export function RestaurantProductActions({
  open, setOpen, product,
}: EditDishProps) {
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);

  const [openEditProduct, setOpenEditProduct] = useState(false);

  return (
    <>
      <ModifyActionBottomDrawer
        open={open}
        setOpen={setOpen}
        setOpenDelete={setOpenDeleteProduct}
        setOpenEdit={setOpenEditProduct}
        title={product.name}
      />
      <RestaurantProductDelete
        openDeleteDish={openDeleteProduct}
        onCloseDeleteDish={() => setOpenDeleteProduct(false)}
        onOpenDeleteDish={() => setOpenDeleteProduct(true)}
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
