import React from 'react';

import { Page } from '~/components/Page';
import { CreateRestaurant } from '~/features/restaurant';
import { useResponsive } from '~/hooks/useResponsive';
import { LogoLayout, StackLayout } from '~/layouts/restaurant';

export function CreateRestaurantPage() {
  const isLaptop = useResponsive('up', 'sm');
  return (
    <>
      {
      isLaptop
      && (
        <LogoLayout>
          <Page title="Добавить ресторан">
            <CreateRestaurant />
          </Page>
        </LogoLayout>
      )
    }
      {
      !isLaptop
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
