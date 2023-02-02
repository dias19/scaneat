import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { GetRestaurantsResponse, PostPhotoResponse, Restaurant } from './type';

export const RESTAURANT_REDUCER_KEY = 'restaurantApi';

const restaurantApi = createApi({
  reducerPath: RESTAURANT_REDUCER_KEY,
  baseQuery,
  tagTypes: ['Restaurants'],
  endpoints: (builder) => ({
    getRestaurants: builder.query<GetRestaurantsResponse, string>({
      query: (query) => `management/restaurant?${query}`,
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Restaurants' as const, id })),
          { type: 'Restaurants', id: 'Restaurants' },
        ]
        : [{ type: 'Restaurants', id: 'Restaurants' }]),
    }),
    postPhoto: builder.mutation<PostPhotoResponse, any>({
      query: (body) => ({
        url: '/photo',
        method: 'POST',
        body,
      }),
    }),
    getRestaurant: builder.query<Restaurant, string | undefined>({
      query: (restaurantSlug) => `/restaurant/${restaurantSlug}`,
    }),
    getRestaurantQR: builder.query<any, string | undefined>({
      query(restaurantSlug) {
        return {
          url: `/restaurant/${restaurantSlug}/qr`,
          responseHandler: async (response) => {
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
    verifyRestaurant: builder.mutation<Restaurant, number>({
      query: (restaurantId) => ({
        url: `/management/restaurant/requests/${restaurantId}/verify`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Restaurants', id: 'Restaurants' }],
    }),
    rejectRestaurant: builder.mutation<Restaurant, number>({
      query: (restaurantId) => ({
        url: `/management/restaurant/requests/${restaurantId}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Restaurants', id: 'Restaurants' }],
    }),
  }),
});
export default restaurantApi;
