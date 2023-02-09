import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { PostPhotoResponse, PostPhotoRequest } from './type';

export const PHOTO_API_REDUCER_KEY = 'photoApi';
const photoApi = createApi({
  baseQuery,
  reducerPath: PHOTO_API_REDUCER_KEY,
  endpoints: (builder) => ({
    postPhoto: builder.mutation<PostPhotoResponse, PostPhotoRequest>({
      query: (body) => ({
        url: '/photo',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default photoApi;
