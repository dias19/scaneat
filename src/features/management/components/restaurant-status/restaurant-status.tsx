import React from 'react';

import { Outlet } from 'react-router-dom';

import { ManagementLayoutNavbar } from '~/layouts/management';

import { MANAGEMENT_RESTAURANT_STATUS } from '../../constants';

export function RestaurantStatus() {
  return (
    <ManagementLayoutNavbar navbarOptions={MANAGEMENT_RESTAURANT_STATUS}>
      <Outlet />
    </ManagementLayoutNavbar>
  );
}
