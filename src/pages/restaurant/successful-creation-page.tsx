import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantCreationSuccess } from '~/features/restaurant';
import { LogoLayout } from '~/layouts/restaurant';

export function RestaurantCreationSuccessPage() {
  return (
    <LogoLayout>
      <Page title="Успешное создание">
        <RestaurantCreationSuccess />
      </Page>
    </LogoLayout>
  );
}
