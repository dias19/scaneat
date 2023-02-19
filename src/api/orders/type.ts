import { Order, OrderStatus } from '~/features/orders';

export type GetChefOrdersRequest = {
  restaurantId: number;
  status: string;
};

export type GetChefOrdersResponse = Order[];

export type EditChefOrderResponse = void;

export interface EditChefOrderRequest {
  restaurantId: number;
  orderId: number;
  status: OrderStatus,
}
