import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { CreateRestaurantPage } = lazyImport(
  () => import('./create-restaurant-page'),
  'CreateRestaurantPage',
);

const { RestaurantCreationSuccessPage } = lazyImport(
  () => import('./successful-creation-page'),
  'RestaurantCreationSuccessPage',
);
export const RestaurantRoutes = [
  <Route
    path="/create-restaurant"
    element={<CreateRestaurantPage />}
    key="create-restaurant"
  />,
  <Route
    path="/creation-successful"
    element={<RestaurantCreationSuccessPage />}
    key="creation-succssful"
  />,
];
