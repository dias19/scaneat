import React from 'react';

import { Outlet } from 'react-router-dom';

import { ChefOrdersTopbar } from './orders-topbar';

export function ChefOrdersList() {
  return (
    <>
      <ChefOrdersTopbar />
      <Outlet />
    </>
  );
}
