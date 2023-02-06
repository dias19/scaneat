import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantProductList } from '~/features/management';

export function RestaurantMenuItemsPage() {
  return (
    <Page title="Menu Items">
      <RestaurantProductList />
    </Page>
  );
}
