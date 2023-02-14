import React from 'react';

import { Page } from '~/components/Page';
import { UserChefLayout } from '~/layouts/user';

export function ProfilePage() {
  return (
    <UserChefLayout>
      <Page title="Заказы">
        <div>profile</div>
      </Page>
    </UserChefLayout>
  );
}
