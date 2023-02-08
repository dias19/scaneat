import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import restaurantApi from '~/api/restaurant/api';

const initialState = {
  photoId: 0,
  photoUrl: '',
  photoUploaded: false,
};

export const photoSlice = createSlice({
  name: 'photoSlice',
  initialState,
  reducers: {
    resetPhoto: (state) => {
      state.photoId = 0;
      state.photoUrl = '';
      state.photoUploaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      restaurantApi.endpoints.postPhoto.matchFulfilled,
      (state, { payload }) => {
        state.photoId = payload.id;
        state.photoUrl = payload.originalUrl;
        state.photoUploaded = true;
      },
    );
  },
});

export const { resetPhoto } = photoSlice.actions;

export const photoReducer = persistReducer(
  {
    key: 'rtk:photo',
    storage,
    whitelist: ['photoId', 'photoUrl'],
  },
  photoSlice.reducer,
);
