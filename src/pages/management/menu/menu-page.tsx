import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantCategories } from '~/features/management';

export function RestaurantMenuPage() {
  return (
    <Page title="Restaurant Menu">
      <RestaurantCategories />
    </Page>
  );
}
