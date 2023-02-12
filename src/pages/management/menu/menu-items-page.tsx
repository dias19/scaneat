import React from 'react';

import { useLocation } from 'react-router-dom';

import { Page } from '~/components/Page';
import {
  RestaurantProductsListMobile,
  RestaurantProductsListLaptop,
  Category,
} from '~/features/management';
import { useResponsive } from '~/hooks/useResponsive';
import { ManagementLogoLayout, ManagementStackLayout } from '~/layouts/management';

interface LocationState {
  category: Category;
}

export function RestaurantMenuItemsPage() {
  const location = useLocation();
  const isLaptop = useResponsive('up', 'sm');
  const { category } = location.state as LocationState;

  return (
    <Page title="Menu Items">
      {!isLaptop && (
        <ManagementStackLayout title={category.name}>
          <RestaurantProductsListMobile />
        </ManagementStackLayout>
      )}

      {isLaptop && (
        <ManagementLogoLayout>
          <RestaurantProductsListLaptop />
        </ManagementLogoLayout>
      )}
    </Page>
  );
}
