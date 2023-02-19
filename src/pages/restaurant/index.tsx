import React from 'react';

import { Route } from 'react-router-dom';

import { ProtectedRoute } from '~/components/protected-route';
import { lazyImport } from '~/utils/lazyImport';

const { CreateRestaurantPage } = lazyImport(
  () => import('./create-restaurant-page'),
  'CreateRestaurantPage',
);

const { RestaurantCreationSuccessPage } = lazyImport(
  () => import('./successful-creation-page'),
  'RestaurantCreationSuccessPage',
);

const { ChefListOrdersPage } = lazyImport(
  () => import('./chef/list-orders-page'),
  'ChefListOrdersPage',
);

export const RestaurantRoutes = [
  <Route
    path="create-restaurant"
    element={<CreateRestaurantPage />}
    key="create-restaurant"
  />,
  <Route
    path="creation-successful"
    element={<RestaurantCreationSuccessPage />}
    key="creation-succssful"
  />,
  <Route path=":restaurantId" key="chef-routes" element={<ProtectedRoute />}>
    <Route path="chef-orders" element={<ChefListOrdersPage />} key="chef-list-orders" />
    ,
  </Route>,
];
