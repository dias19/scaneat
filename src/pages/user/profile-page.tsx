import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantStaffLayout } from '~/layouts/staff';

export function ProfilePage() {
  return (
    <RestaurantStaffLayout staffRole="chef">
      <Page title="Профиль">
        <div>profile</div>
      </Page>
    </RestaurantStaffLayout>
  );
}
