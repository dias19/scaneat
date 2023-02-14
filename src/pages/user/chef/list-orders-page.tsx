import React from 'react';

import { Page } from '~/components/Page';
import { ChefOrdersList } from '~/features/users';
import { UserChefLayout } from '~/layouts/user';

export function ChefListOrdersPage() {
  return (
    <UserChefLayout>
      <Page title="Заказы">
        <ChefOrdersList />
      </Page>
    </UserChefLayout>
  );
}
