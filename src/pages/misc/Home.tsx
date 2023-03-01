import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

import { Page } from '~/components/Page';
import { GuideSteps, GettingStarted, FAQ } from '~/features/misc';
import HomePageLayout from '~/layouts/misc';

export function HomePage() {
  const location = useLocation();

  const state = location.state as {name:string};

  useEffect(() => {
    if (state) {
      scroller.scrollTo(state.name, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
      // clears the state from history
      window.history.replaceState({}, document.title);
    }
  }, [state]);

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
