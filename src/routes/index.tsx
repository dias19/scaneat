import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '~/components/protected-route';
import { AuthRoutes } from '~/pages/auth';
import { ManagementRoutes } from '~/pages/management';
import { MiscRoutes } from '~/pages/misc';
import { RestaurantRoutes } from '~/pages/restaurant';
import { lazyImport } from '~/utils/lazyImport';

const { Page404 } = lazyImport(() => import('~/pages/misc/Page404'), 'Page404');

export function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
      <Routes>
        {RestaurantRoutes}
        {MiscRoutes}
        {AuthRoutes}
        <Route path="/management" element={<ProtectedRoute />}>
          {ManagementRoutes}
        </Route>
        <Route path="*" element={<Page404 />} key="404" />
      </Routes>
    </BrowserRouter>
  );
}
