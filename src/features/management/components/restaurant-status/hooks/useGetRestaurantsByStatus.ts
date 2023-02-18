import restaurantApi from '~/api/restaurant/api';

export function useGetRestaurantsByStatus(status: string) {
  const {
    data: restaurants,
    isLoading,
    isError,
  } = restaurantApi.endpoints.getRestaurantsByStatus.useQuery(status);
  return {
    restaurants,
    isLoading,
    isError,
  };
}
