import React from 'react';

import { Route } from 'react-router-dom';

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

const { RestaurantStatusDeclined } = lazyImport(
  () => import('~/features/management/components/restaurant-status/restaurant-status-declined'),
  'RestaurantStatusDeclined',
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
  <Route path="/management/profile" element={<ManagerProfilePage />} key="profile" />,
  <Route path="/management/add" element={<AddRestaurantPage />} key="add" />,
  <Route path="/management/restaurants" element={<MyRestaurantsPage />} key="restaurants" />,
  <Route
    path="/management/restaurants/:slug"
    element={<RestaurantDetailsPage />}
    key="restaurant-details"
  />,
  <Route
    path="/management/restaurants/:id/menu"
    element={<RestaurantMenuPage />}
    key="restaurant-menu"
  />,
  <Route
    path="/management/restaurants/:slug/orders"
    element={<RestaurantDetailsOrdersPage />}
    key="restaurant-orders"
  />,
  <Route
    path="/management/restaurants/:slug/employees"
    element={<RestaurantDetailsEmployeesPage />}
    key="restaurant-employees"
  />,
  <Route
    path="/management/restaurants/:slug/settings"
    element={<RestaurantDetailsSettingsPage />}
    key="restaurant-details"
  />,
  <Route
    path="/management/restaurants/:restaurantId/menu/:category/:categoryId"
    element={<RestaurantMenuItemsPage />}
    key="restaurant-menu-items"
  />,

  <Route
    path="/management/restaurants/status"
    element={<RestaurantStatusPage />}
    key="restaurants-status"
  >
    <Route index element={<RestaurantStatusPending />} />
    ,
    <Route path="accepted" element={<RestaurantStatusAccepted />} />
    ,
    <Route path="declined" element={<RestaurantStatusDeclined />} />

  </Route>,
];
