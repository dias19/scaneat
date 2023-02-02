import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithLogout } from '..';
import {
  GetRestaurantsResponse,
  PostPhotoResponse,
  GetRestaurantResponse,
  GetRestaurantsRequest,
  GetRestaurantRequest,
  PostPhotoRequest,
  VerifyRestaurantResponse,
  RejectRestaurantResponse,
  VerifyRestaurantRequest,
  RejectRestaurantRequest,
} from './type';

export const RESTAURANT_REDUCER_KEY = 'restaurantApi';

const restaurantApi = createApi({
  reducerPath: RESTAURANT_REDUCER_KEY,
  baseQuery: baseQueryWithLogout,
  tagTypes: ['Restaurants'],
  endpoints: (builder) => ({
    getRestaurants: builder.query<GetRestaurantsResponse, GetRestaurantsRequest>({
      query: (query) => `management/restaurant?${query}`,
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Restaurants' as const, id })),
          { type: 'Restaurants', id: 'Restaurants' },
        ]
        : [{ type: 'Restaurants', id: 'Restaurants' }]),
    }),
    postPhoto: builder.mutation<PostPhotoResponse, PostPhotoRequest>({
      query: (body) => ({
        url: '/photo',
        method: 'POST',
        body,
      }),
    }),
    getRestaurant: builder.query<GetRestaurantResponse, GetRestaurantRequest>({
      query: (restaurantSlug) => `/restaurant/${restaurantSlug}`,
    }),
    getRestaurantQR: builder.query<Buffer, string>({
      query(restaurantSlug) {
        return {
          url: `/restaurant/${restaurantSlug}/qr`,
          transformResponse: async (response: any) => {
            const hiddenElement = document.createElement('a');
            const url = window.URL || window.webkitURL;
            const blobData = url.createObjectURL(await response.blob());
            hiddenElement.href = blobData;
            hiddenElement.download = 'qrcode';
            hiddenElement.click();
            return { data: null };
          },
        };
      },
    }),
    verifyRestaurant: builder.mutation<VerifyRestaurantResponse, VerifyRestaurantRequest>({
      query: (restaurantId) => ({
        url: `/management/restaurant/requests/${restaurantId}/verify`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Restaurants', id: 'Restaurants' }],
    }),
    rejectRestaurant: builder.mutation<RejectRestaurantResponse, RejectRestaurantRequest>({
      query: (restaurantId) => ({
        url: `/management/restaurant/requests/${restaurantId}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Restaurants', id: 'Restaurants' }],
    }),
  }),
});
export default restaurantApi;
