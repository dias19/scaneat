import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { ProfilePage } = lazyImport(() => import('./profile-page'), 'ProfilePage');

const { ChefListOrdersPage } = lazyImport(
  () => import('./chef/list-orders-page'),
  'ChefListOrdersPage',
);

const { ChefOrderPending } = lazyImport(() => import('~/features/users'), 'ChefOrderPending');

const { ChefOrderInProcess } = lazyImport(() => import('~/features/users'), 'ChefOrderInProcess');

const { ChefOrderDone } = lazyImport(() => import('~/features/users'), 'ChefOrderDone');

export const UserRoutes = [
  <Route path="profile" element={<ProfilePage />} key="profile" />,
  <Route path="chef" key="chef-routes">
    <Route path="orders" element={<ChefListOrdersPage />} key="chef-list-orders">
      <Route index element={<ChefOrderPending />} key="chef-list-pending" />
      ,
      <Route path="processing" element={<ChefOrderInProcess />} key="chef-list-in-process" />
      ,
      <Route path="done" element={<ChefOrderDone />} key="chef-list-done" />
      ,
    </Route>
  </Route>,
];
