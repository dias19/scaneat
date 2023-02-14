import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithLogout } from '..';
import {
  GetChefOrdersRequest,
  GetChefOrdersResponse,
  EditChefOrderRequest,
  EditChefOrderResponse,
} from './type';

export const ORDERS_API_REDUCER_KEY = 'ordersApi';

const ordersApi = createApi({
  baseQuery: baseQueryWithLogout,
  reducerPath: ORDERS_API_REDUCER_KEY,
  endpoints: (builder) => ({
    getChefOrders: builder.query<GetChefOrdersResponse, GetChefOrdersRequest>({
      query:
       ({ restaurantId, status }) => `/chef/restaurant/${restaurantId}/order?status=${status}`,
    }),
    editChefOrder: builder.mutation<EditChefOrderResponse, EditChefOrderRequest>({
      query: ({ restaurantId, orderId, body }) => ({
        url: `/chef/restaurant/${restaurantId}/order/${orderId}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export default ordersApi;
