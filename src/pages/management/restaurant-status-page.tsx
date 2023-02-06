import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantStatus } from '~/features/management';

export function RestaurantStatusPage() {
  return (
    <Page title="Статусы ресторанов">
      <RestaurantStatus />
    </Page>
  );
}
