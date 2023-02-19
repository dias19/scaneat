import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantEmployees } from '~/features/management';
import { ManagementStackLayout } from '~/layouts/management';

export function RestaurantDetailsEmployeesPage() {
  return (
    <ManagementStackLayout title="Рабочие">
      <Page title="Restaurant Employees">
        <RestaurantEmployees />
      </Page>
    </ManagementStackLayout>
  );
}
