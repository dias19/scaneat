import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantCategories } from '~/features/management';
import { useResponsive } from '~/hooks/useResponsive';
import { ManagementStackLayout, ManagementLogoLayout } from '~/layouts/management';

export function RestaurantMenuPage() {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <Page title="Restaurant Menu">
      {!isDesktop
     && (
     <ManagementStackLayout title="Меню">
       <RestaurantCategories />
     </ManagementStackLayout>
     )}

      {isDesktop
     && (
     <ManagementLogoLayout>
       <RestaurantCategories />
     </ManagementLogoLayout>
     )}
    </Page>
  );
}
