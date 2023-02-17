import React from 'react';

import { Page } from '~/components/Page';
import { OrderStatusTab } from '~/features/orders';
import { RestaurantStaffLayout } from '~/layouts/staff';

export function ChefListOrdersPage() {
  return (
    <RestaurantStaffLayout staffRole="chef">
      <Page title="Заказы">
        <OrderStatusTab />
      </Page>
    </RestaurantStaffLayout>
  );
}
