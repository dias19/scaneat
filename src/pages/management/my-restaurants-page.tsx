import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantsList } from '~/features/management';
import { ManagementLogoLayout } from '~/layouts/management';

export function MyRestaurantsPage() {
  return (
    <ManagementLogoLayout>
      <Page title="My Restaurants">
        <RestaurantsList />
      </Page>
    </ManagementLogoLayout>
  );
}
