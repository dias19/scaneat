import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantSettings } from '~/features/management';

export function RestaurantDetailsSettingsPage() {
  return (
    <Page title="Restaurant Settings">
      <RestaurantSettings />
    </Page>
  );
}
