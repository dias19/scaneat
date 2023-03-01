import React from 'react';

import { Page } from '~/components/Page';
import { GuideSteps, GettingStarted, FAQ } from '~/features/misc';
import HomePageLayout from '~/layouts/misc';

export function HomePage() {
  return (
    <HomePageLayout>
      <Page title="Homepage">
        <GettingStarted />
        <GuideSteps />
        <FAQ />
      </Page>
    </HomePageLayout>
  );
}
