import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithLogout } from '..';
import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
  DeleteEmployeeResponse,
  EditEmployeeRequest,
  EditEmployeeResponse,
  GetEmployeeRequest,
  GetEmployeeResponse,
  DeleteEmployeeRequest,
} from './type';

export const EMPLOYEE_API_REDUCER_KEY = 'employeeApi';

const employeeApi = createApi({
  baseQuery: baseQueryWithLogout,
  reducerPath: EMPLOYEE_API_REDUCER_KEY,
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getEmployees: builder.query<GetEmployeeResponse, GetEmployeeRequest>({
      query: ({ restaurantId }) => `/restaurant/${restaurantId}/staff`,
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Employees' as const, id })),
          { type: 'Employees', id: 'Employees' },
        ]
        : [{ type: 'Employees', id: 'Employees' }]),
    }),
    createEmployee: builder.mutation<CreateEmployeeResponse, CreateEmployeeRequest>({
      query: ({ restaurantId, body }) => ({
        url: `/restaurant/${restaurantId}/staff`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Employees', id: 'Employees' }],
    }),
    editEmployee: builder.mutation<EditEmployeeResponse, EditEmployeeRequest>({
      query: ({ restaurantId, staffId, body }) => ({
        url: `/restaurant/${restaurantId}/staff/${staffId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Employees', id: 'Employees' }],
    }),
    deleteEmployee: builder.mutation<DeleteEmployeeResponse, DeleteEmployeeRequest>({
      query: ({ restaurantId, staffId }) => ({
        url: `/restaurant/${restaurantId}/staff/${staffId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Employees', id: 'Employees' }],
    }),
  }),
});

export default employeeApi;
