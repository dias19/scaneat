import React from 'react';

import { Route } from 'react-router-dom';

import { ManagementLogoLayout, ManagementStackLayout } from '~/layouts/management';
import { lazyImport } from '~/utils/lazyImport';

const { ManagerProfilePage } = lazyImport(
  () => import('./manager-profile-page'),
  'ManagerProfilePage',
);
const { AddRestaurantPage } = lazyImport(
  () => import('./add-restaurant-page'),
  'AddRestaurantPage',
);
const { MyRestaurantsPage } = lazyImport(
  () => import('./my-restaurants-page'),
  'MyRestaurantsPage',
);
const { RestaurantDetailsPage } = lazyImport(
  () => import('./restaurant-details/details-page'),
  'RestaurantDetailsPage',
);
const { RestaurantMenuPage } = lazyImport(() => import('./menu/menu-page'), 'RestaurantMenuPage');
const { RestaurantDetailsOrdersPage } = lazyImport(
  () => import('./restaurant-details/orders-page'),
  'RestaurantDetailsOrdersPage',
);
const { RestaurantDetailsEmployeesPage } = lazyImport(
  () => import('./restaurant-details/employees-page'),
  'RestaurantDetailsEmployeesPage',
);
const { RestaurantDetailsSettingsPage } = lazyImport(
  () => import('./restaurant-details/settings-page'),
  'RestaurantDetailsSettingsPage',
);
const { RestaurantMenuItemsPage } = lazyImport(
  () => import('./menu/menu-items-page'),
  'RestaurantMenuItemsPage',
);

const { RestaurantStatusPage } = lazyImport(
  () => import('./restaurant-status-page'),
  'RestaurantStatusPage',
);

const { RestaurantStatusRejected } = lazyImport(
  () => import('~/features/management/components/restaurant-status/restaurant-status-rejected'),
  'RestaurantStatusRejected',
);
const { RestaurantStatusAccepted } = lazyImport(
  () => import('~/features/management/components/restaurant-status/restaurant-status-accepted'),
  'RestaurantStatusAccepted',
);
const { RestaurantStatusPending } = lazyImport(
  () => import('~/features/management/components/restaurant-status/restaurant-status-pending'),
  'RestaurantStatusPending',
);
export const ManagementRoutes = [

  <Route path="profile" element={<ManagerProfilePage />} key="profile" />,

  <Route path="add" element={<AddRestaurantPage />} key="add" />,

  <Route path="restaurants" element={<MyRestaurantsPage />} key="restaurants" />,

  <Route
    path="restaurants/:slug"
    element={<RestaurantDetailsPage />}
    key="restaurant-details"
  />,
  <Route element={<ManagementStackLayout title="Меню" />} key="restaurant-menu">
    <Route
      path="restaurants/:restaurantId/menu"
      element={<RestaurantMenuPage />}
      key="restaurant-menu"
    />
  </Route>,
  <Route element={<ManagementStackLayout title="Заказы" />} key="restaurant-menu">
    <Route
      path="restaurants/:slug/orders"
      element={<RestaurantDetailsOrdersPage />}
      key="restaurant-orders"
    />
  </Route>,
  <Route element={<ManagementStackLayout title="Работники" />} key="restaurant-menu">
    <Route
      path="restaurants/:slug/employees"
      element={<RestaurantDetailsEmployeesPage />}
      key="restaurant-employees"
    />
  </Route>,
  <Route element={<ManagementStackLayout title="Работники" />} key="restaurant-menu">
    <Route
      path="restaurants/:slug/settings"
      element={<RestaurantDetailsSettingsPage />}
      key="restaurant-details"
    />
  </Route>,

  <Route
    path="restaurants/:restaurantId/menu/:categoryId"
    element={<RestaurantMenuItemsPage />}
    key="restaurant-menu-items"
  />,

  <Route element={<ManagementLogoLayout />} key="logo-layout">
    <Route
      path="restaurants/status"
      element={<RestaurantStatusPage />}
      key="restaurants-status"
    >
      <Route index element={<RestaurantStatusPending />} key="restaurants-status-pending" />
      ,
      <Route
        path="accepted"
        element={<RestaurantStatusAccepted />}
        key="restaurants-status-accepted"
      />
      ,
      <Route
        path="declined"
        element={<RestaurantStatusRejected />}
        key="restaurants-status-rejected"
      />

    </Route>
    ,
  </Route>,
];
