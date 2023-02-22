import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithLogout } from '..';
import {
  GetRestaurantsResponse,
  GetRestaurantResponse,
  GetRestaurantRequest,
  VerifyRestaurantResponse,
  RejectRestaurantResponse,
  VerifyRestaurantRequest,
  RejectRestaurantRequest,
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  GetRestaurantsByStatusRequest,
} from './type';

export const RESTAURANT_REDUCER_KEY = 'restaurantApi';

const restaurantApi = createApi({
  reducerPath: RESTAURANT_REDUCER_KEY,
  baseQuery: baseQueryWithLogout,
  tagTypes: ['Restaurants'],
  endpoints: (builder) => ({
    getRestaurants: builder.query<GetRestaurantsResponse, void>({
      query: () => '/restaurant',
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Restaurants' as const, id })),
          { type: 'Restaurants', id: 'Restaurants' },
        ]
        : [{ type: 'Restaurants', id: 'Restaurants' }]),
    }),
    getRestaurant: builder.query<GetRestaurantResponse, GetRestaurantRequest>({
      query: (restaurantSlug) => `/restaurant/${restaurantSlug}`,
    }),
    getRestaurantsByStatus: builder.query<GetRestaurantsResponse, GetRestaurantsByStatusRequest>({
      query: ({ status }) => `/restaurant?status=${status}`,
    }),
    getRestaurantQR: builder.query<any, number>({
      query(restaurantId) {
        return {
          url: `/restaurant/${restaurantId}/qr`,
          responseHandler: async (response: any) => {
            if (response.status === 200) {
              const hiddenElement = document.createElement('a');
              const url = window.URL || window.webkitURL;
              const blobData = url.createObjectURL(await response.blob());
              hiddenElement.href = blobData;
              hiddenElement.download = 'qrcode';
              hiddenElement.click();
            }
            return { data: null };
          },
        };
      },
    }),
    verifyRestaurant: builder.mutation<VerifyRestaurantResponse, VerifyRestaurantRequest>({
      query: (restaurantId) => ({
        url: `/restaurant/${restaurantId}/verify`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Restaurants', id: 'Restaurants' }],
    }),
    rejectRestaurant: builder.mutation<RejectRestaurantResponse, RejectRestaurantRequest>({
      query: (restaurantId) => ({
        url: `/restaurant/${restaurantId}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Restaurants', id: 'Restaurants' }],
    }),
    createRestaurant: builder.mutation<CreateRestaurantResponse, CreateRestaurantRequest>({
      query: (body) => ({
        url: '/restaurant',
        method: 'POST',
        body,
      }),
    }),
  }),
});
export default restaurantApi;
