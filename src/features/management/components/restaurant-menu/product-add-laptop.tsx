import React from 'react';

import { useParams } from 'react-router-dom';

import productsApi from '~/api/products/api';
import { DialogForm } from '~/components/Dialog';

import { ProductFormData } from '../../types';
import { RestaurantProductForm } from './product-form';

type ProductAddLaptop={
    open: boolean,
    setOpen: (state: boolean) => void,
}
export function RestaurantProductAddLaptop({
  open,
  setOpen,
}:ProductAddLaptop) {
  const [addProduct] = productsApi.endpoints.addProduct.useMutation();

  const parameters = useParams();

  const restaurantId = parseInt(parameters.restaurantId as string, 10);

  const categoryId = parseInt(parameters.categoryId as string, 10);

  const onSubmit = async (data: ProductFormData) => {
    const { photoUrl, ...productData } = data;

    await addProduct({
      restaurantId,
      categoryId,
      ...productData,
    });
    setOpen(false);
  };

  return (
    <DialogForm
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title="Добавить блюдо"
      hasCloser
    >
      <RestaurantProductForm
        onSubmit={onSubmit}
        setOpen={setOpen}
        buttonName="Создать"
      />
    </DialogForm>
  );
}
