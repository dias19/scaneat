import React from 'react';

import { useParams } from 'react-router-dom';

import restaurantApi from '~/api/restaurant/api';
import { CircularLoader } from '~/components/Circular Loader';
import { Page } from '~/components/Page';
import { RestaurantDetails } from '~/features/management';
import { ManagementStackLayout } from '~/layouts/management';

export function RestaurantDetailsPage() {
  const { slug } = useParams();

  const skip = typeof (slug) === 'undefined';

  const { data: restaurant, isLoading, isError } = restaurantApi
    .endpoints.getRestaurant.useQuery(slug as string, {
      skip,
    });

  return (
    <Page title="Restaurant Details">
      <CircularLoader isLoading={isLoading} />
      {(!isLoading && !isError)
       && (
       <ManagementStackLayout title={restaurant?.name}>
         <RestaurantDetails />
       </ManagementStackLayout>
       )}
    </Page>
  );
}
