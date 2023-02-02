import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { GetCategoriesResponse, AddCategoryRequest, PatchCategoryRequest } from './type';

export const CATEGORY_API_REDUCER_KEY = 'categoryApi';
const categoryApi = createApi({
  baseQuery,
  reducerPath: CATEGORY_API_REDUCER_KEY,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, number | undefined>({
      query: (restaurantId) => `/management/restaurant/${restaurantId}/category`,
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Categories' as const, id })),
          { type: 'Categories', id: 'LIST' },
        ]
        : [{ type: 'Categories', id: 'LIST' }]),
    }),
    addCategory: builder.mutation<GetCategoriesResponse, AddCategoryRequest>({
      query: ({ restaurantId, body }) => ({
        url: `/management/category/${restaurantId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    editCategory: builder.mutation < GetCategoriesResponse, PatchCategoryRequest>({
      query: ({ categoryId, body }) => ({
        url: `/management/category/${categoryId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation <GetCategoriesResponse, number>({
      query: (categoryId) => ({
        url: `/management/category/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
});
export default categoryApi;
