import React from 'react';

import { Page } from '~/components/Page';
import { LoginPanel } from '~/features/auth';
import HomePageLayout from '~/layouts/misc';

export function LoginPage() {
  return (
    <HomePageLayout>
      <Page title="Login">
        <LoginPanel />
      </Page>
    </HomePageLayout>
  );
}
