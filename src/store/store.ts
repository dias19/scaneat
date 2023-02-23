import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';

import authApi, { AUTH_API_REDUCER_KEY } from '~/api/auth/api';
import categoryApi, { CATEGORY_API_REDUCER_KEY } from '~/api/category/api';
import employeeApi, { EMPLOYEE_API_REDUCER_KEY } from '~/api/employee/api';
import miscApi, { MISC_API_REDUCER_KEY } from '~/api/misc/api';
import ordersApi, { ORDERS_API_REDUCER_KEY } from '~/api/orders/api';
import photoApi, { PHOTO_API_REDUCER_KEY } from '~/api/photo/api';
import productsApi, { PRODUCTS_API_REDUCER_KEY } from '~/api/products/api';
import restaurantApi, { RESTAURANT_REDUCER_KEY } from '~/api/restaurant/api';
import { authReducer, authSlice } from '~/features/auth';

import { RESET_STATE_ACTION_TYPE } from './actions/resetState';

const reducers = {
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [RESTAURANT_REDUCER_KEY]: restaurantApi.reducer,
  [authSlice.name]: authReducer,
  [CATEGORY_API_REDUCER_KEY]: categoryApi.reducer,
  [PRODUCTS_API_REDUCER_KEY]: productsApi.reducer,
  [PHOTO_API_REDUCER_KEY]: photoApi.reducer,
  [MISC_API_REDUCER_KEY]: miscApi.reducer,
  [ORDERS_API_REDUCER_KEY]: ordersApi.reducer,
  [EMPLOYEE_API_REDUCER_KEY]: employeeApi.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<AppState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    // eslint-disable-next-line no-param-reassign
    state = {} as AppState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(
    restaurantApi.middleware,
    authApi.middleware,
    categoryApi.middleware,
    productsApi.middleware,
    miscApi.middleware,
    photoApi.middleware,
    ordersApi.middleware,
    employeeApi.middleware,
  ),
});

export const persistor = persistStore(store);

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
