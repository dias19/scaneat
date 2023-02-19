import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { ProfilePage } = lazyImport(() => import('./profile-page'), 'ProfilePage');

export const UserRoutes = [
  <Route path="profile" element={<ProfilePage />} key="profile" />,
];
