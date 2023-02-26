import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantEmployeesList } from '~/features/employees';
import { ManagementStackLayout } from '~/layouts/management';

export function RestaurantDetailsEmployeesPage() {
  return (
    <ManagementStackLayout title="Рабочие">
      <Page title="Restaurant Employees">
        <RestaurantEmployeesList />
      </Page>
    </ManagementStackLayout>
  );
}
