import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantStatusTabs } from '~/features/management';
import { ManagementLogoLayout } from '~/layouts/management';

export function RestaurantStatusPage() {
  return (
    <ManagementLogoLayout>
      <Page title="Статусы ресторанов">
        <RestaurantStatusTabs />
      </Page>
    </ManagementLogoLayout>
  );
}
