import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { ProfilePage } = lazyImport(() => import('./profile-page'), 'ProfilePage');

const { ChefListOrdersPage } = lazyImport(
  () => import('./chef/list-orders-page'),
  'ChefListOrdersPage',
);

export const UserRoutes = [
  <Route path="profile" element={<ProfilePage />} key="profile" />,
  <Route path="chef" key="chef-routes">
    <Route path="orders" element={<ChefListOrdersPage />} key="chef-list-orders" />
    ,
  </Route>,
];
