import React from 'react';

import { Route } from 'react-router-dom';

import { ManagementStackLayout } from '~/layouts/management';
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

export const ManagementRoutes = [

  <Route path="profile" element={<ManagerProfilePage />} key="profile" />,

  <Route path="add" element={<AddRestaurantPage />} key="add" />,

  <Route path="restaurants" element={<MyRestaurantsPage />} key="restaurants" />,

  <Route
    path="restaurants/:slug"
    element={<RestaurantDetailsPage />}
    key="restaurant-details"
  />,
  <Route
    path="restaurants/:restaurantId/menu"
    element={<RestaurantMenuPage />}
    key="restaurant-menu"
  />,

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

  <Route
    path="restaurants/status"
    element={<RestaurantStatusPage />}
    key="restaurants-status"
  />,

];
