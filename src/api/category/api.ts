import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithLogout } from '..';
import {
  GetCategoriesResponse,
  AddCategoryRequest,
  EditCategoryRequest,
  DeleteCategoryResponse,
  EditCategoryResponse,
  DeleteCategoryRequest,
} from './type';

export const CATEGORY_API_REDUCER_KEY = 'categoryApi';
const categoryApi = createApi({
  baseQuery: baseQueryWithLogout,
  reducerPath: CATEGORY_API_REDUCER_KEY,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, number>({
      query: (restaurantId) => `/restaurant/${restaurantId}/category`,
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Categories' as const, id })),
          { type: 'Categories', id: 'LIST' },
        ]
        : [{ type: 'Categories', id: 'LIST' }]),
    }),
    addCategory: builder.mutation<GetCategoriesResponse, AddCategoryRequest>({
      query: ({ restaurantId, ...body }) => ({
        url: `/restaurant/${restaurantId}/category`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    editCategory: builder.mutation < EditCategoryResponse, EditCategoryRequest>({
      query: ({ restaurantId, categoryId, ...body }) => ({
        url: `/restaurant/${restaurantId}/category/${categoryId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation <DeleteCategoryResponse, DeleteCategoryRequest>({
      query: ({ restaurantId, categoryId }) => ({
        url: `/restaurant/${restaurantId}/category/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
});
export default categoryApi;
