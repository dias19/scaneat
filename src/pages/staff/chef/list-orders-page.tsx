import React from 'react';

import { Page } from '~/components/Page';
import { OrderStatusTab } from '~/features/orders';
import { RestaurantStaffLayot } from '~/layouts/staff';

export function ChefListOrdersPage() {
  return (
    <RestaurantStaffLayot staffRole="chef">
      <Page title="Заказы">
        <OrderStatusTab />
      </Page>
    </RestaurantStaffLayot>
  );
}
