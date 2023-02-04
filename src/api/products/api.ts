import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithLogout } from '..';
import {
  GetProductsResponse,
  AddProductRequest,
  EditProductRequest,
  GetProductRequest,
  DeleteProductRequest,
  AddProductResponse,
} from './type';

export const PRODUCTS_API_REDUCER_KEY = 'productsApi';

const productsApi = createApi({
  baseQuery: baseQueryWithLogout,
  reducerPath: PRODUCTS_API_REDUCER_KEY,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductRequest>({
      query: ({
        restaurantId,
        categoryId,
      }) => `/restaurant/${restaurantId}/product?categoryId=${categoryId}`,
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Products' as const, id })),
          { type: 'Products', id: 'Products' },
        ]
        : [{ type: 'Products', id: 'Products' }]),
    }),
    addProduct: builder.mutation<AddProductResponse, AddProductRequest>({
      query: ({ restaurantId, ...body }) => ({
        url: `/restaurant/${restaurantId}/product`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'Products' }],
    }),
    editProduct: builder.mutation<GetProductsResponse, EditProductRequest>({
      query: ({ productId, restaurantId, ...body }) => ({
        url: `/restaurant/${restaurantId}/product/${productId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'Products' }],
    }),
    deleteProduct: builder.mutation<GetProductsResponse, DeleteProductRequest>({
      query: ({ restaurantId, productId }) => ({
        url: `/restaurant/${restaurantId}/product/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'Products' }],
    }),
  }),
});
export default productsApi;
