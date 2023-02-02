import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantsList } from '~/features/management';

export function MyRestaurantsPage() {
  return (
    <Page title="My Restaurants">
      <RestaurantsList />
    </Page>
  );
}
