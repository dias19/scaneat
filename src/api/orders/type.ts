import { Order } from '~/features/users';

export type GetChefOrdersRequest = {
  restaurantId: number;
  status: string;
};

export type GetChefOrdersResponse = Order[];

export type EditChefOrderResponse = void;

export interface EditChefOrderRequest {
  restaurantId: number;
  orderId: number;
  body: {
    status: 'idle' | 'canceled' | 'pending' | 'processing' | 'ready' | 'on_delivery' | 'completed';
  };
}
