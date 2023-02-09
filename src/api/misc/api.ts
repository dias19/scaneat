import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { GetCitiesResponse } from './type';

export const MISC_API_REDUCER_KEY = 'miscApi';

const miscApi = createApi({
  baseQuery,
  reducerPath: MISC_API_REDUCER_KEY,
  endpoints: (builder) => ({
    getCities: builder.query<GetCitiesResponse, void>({
      query: () => '/city',
    }),
  }),
});

export default miscApi;
