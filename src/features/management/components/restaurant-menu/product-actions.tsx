import React, { useState } from 'react';

import { BottomDrawerEdit } from '~/components/bottom-drawer-edit';

import { ProductData } from '../../types';
import { RestaurantProductDelete } from './product-delete';
import { RestaurantProductEdit } from './product-edit';

type EditDishProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  product: ProductData
};
export function RestaurantProductActions({
  open, setOpen, product,
}: EditDishProps) {
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);

  const [openEditProduct, setOpenEditProduct] = useState(false);

  return (
    <>
      <BottomDrawerEdit
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
        id={product.id}
      />
      <RestaurantProductEdit
        openEditDish={openEditProduct}
        onCloseEditDish={() => setOpenEditProduct(false)}
        onOpenEditDish={() => setOpenEditProduct(true)}
        title={product.name}
        product={product}
        id={product.id}
      />
    </>
  );
}
