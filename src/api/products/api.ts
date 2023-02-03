import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithLogout } from '..';
import { GetProductsResponse, AddProductRequest, EditProductRequest } from './type';

export const PRODUCTS_API_REDUCER_KEY = 'productsApi';

const productsApi = createApi({
  baseQuery: baseQueryWithLogout,
  reducerPath: PRODUCTS_API_REDUCER_KEY,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, number>({
      query: (categoryId) => `/management/category/${categoryId}/product`,
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Products' as const, id })),
          { type: 'Products', id: 'Products' },
        ]
        : [{ type: 'Products', id: 'Products' }]),
    }),
    addProduct: builder.mutation<GetProductsResponse, AddProductRequest>({
      query: ({ restaurantId, categoryId, ...body }) => ({
        url: `/management/product/${restaurantId}/${categoryId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'Products' }],
    }),
    editProduct: builder.mutation<GetProductsResponse, EditProductRequest>({
      query: ({ productId, ...body }) => ({
        url: `/management/product/${productId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'Products' }],
    }),
    deleteProduct: builder.mutation<GetProductsResponse, number>({
      query: (productId) => ({
        url: `/management/product/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'Products' }],
    }),
  }),
});
export default productsApi;
