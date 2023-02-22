import React from 'react';

import { Page } from '~/components/Page';
import { CreateRestaurant } from '~/features/restaurant';
import { useResponsive } from '~/hooks/useResponsive';
import { LogoLayout, StackLayout } from '~/layouts/restaurant';

export function CreateRestaurantPage() {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <>
      {
      isDesktop
      && (
        <LogoLayout>
          <Page title="Добавить ресторан">
            <CreateRestaurant />
          </Page>
        </LogoLayout>
      )
    }
      {
      !isDesktop
      && (
        <StackLayout title="Добавить ресторан">
          <Page title="Добавить ресторан">
            <CreateRestaurant />
          </Page>
        </StackLayout>
      )
    }
    </>
  );
}
