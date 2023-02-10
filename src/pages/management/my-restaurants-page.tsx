import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantsList } from '~/features/management';
import { ManagementLogoLayout } from '~/layouts/management';

export function MyRestaurantsPage() {
  return (
    <Page title="My Restaurants">
      <ManagementLogoLayout>
        <RestaurantsList />
      </ManagementLogoLayout>
    </Page>
  );
}
