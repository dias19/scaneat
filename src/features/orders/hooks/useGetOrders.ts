import ordersApi from '~/api/orders/api';

export function useGetOrders(status:string, restaurantId: number) {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = ordersApi.endpoints.getChefOrders.useQuery({ restaurantId, status });
  return { orders, isLoading, isError };
}
