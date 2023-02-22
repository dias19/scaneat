import { OrderStatus } from '../type';

export function getNextStatus(status: string): OrderStatus {
  switch (status) {
    case 'pending':
      return 'processing';
    case 'processing':
      return 'ready';
    default:
      return 'pending';
  }
}
