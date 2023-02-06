import React from 'react';

import { Page } from '~/components/Page';
import { LoginForm } from '~/features/auth';

export function LoginPage() {
  return (
    <Page title="Login">
      <LoginForm />
    </Page>
  );
}
