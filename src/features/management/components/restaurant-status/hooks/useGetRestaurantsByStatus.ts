import restaurantApi from '~/api/restaurant/api';

import { RestaurantStatus } from '../../../types';

export function useGetRestaurantsByStatus(status: RestaurantStatus) {
  const {
    data: restaurants,
    isLoading,
    isError,
  } = restaurantApi.endpoints.getRestaurantsByStatus.useQuery({ status });
  return {
    restaurants,
    isLoading,
    isError,
  };
}
