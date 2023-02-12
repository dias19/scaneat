import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantCategories } from '~/features/management';
import { useResponsive } from '~/hooks/useResponsive';
import { ManagementStackLayout, ManagementLogoLayout } from '~/layouts/management';

export function RestaurantMenuPage() {
  const isLaptop = useResponsive('up', 'sm');
  return (
    <Page title="Restaurant Menu">
      {!isLaptop
     && (
     <ManagementStackLayout title="Меню">
       <RestaurantCategories />
     </ManagementStackLayout>
     )}

      {isLaptop
     && (
     <ManagementLogoLayout>
       <RestaurantCategories />
     </ManagementLogoLayout>
     )}
    </Page>
  );
}
