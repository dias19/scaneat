import ordersApi from '~/api/orders/api';

export function useGetOrders(status:string) {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = ordersApi.endpoints.getChefOrders.useQuery({ restaurantId: 12, status });
  return { orders, isLoading, isError };
}
