import React from 'react';

import { Page } from '~/components/Page';
import { GuideSteps, GettingStarted } from '~/features/misc';
import HomePageLayout from '~/layouts/misc';

export function HomePage() {
  return (
    <HomePageLayout>
      <Page title="Homepage">
        <GettingStarted />
        <GuideSteps />
      </Page>
    </HomePageLayout>
  );
}
