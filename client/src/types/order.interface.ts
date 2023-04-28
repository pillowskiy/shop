import { CartItem } from './cart.interface';
import { User } from './user.interface';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: number;
  createdAt: string;

  status: OrderStatus;
  user: User;
  items: CartItem[];
}
