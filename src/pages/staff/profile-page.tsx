import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantStaffLayot } from '~/layouts/staff';

export function ProfilePage() {
  return (
    <RestaurantStaffLayot staffRole="chef">
      <Page title="Заказы">
        <div>profile</div>
      </Page>
    </RestaurantStaffLayot>
  );
}
