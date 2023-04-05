import { ICartItem } from './cart.interface';
import { IUser } from './user.interface';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface IOrder {
  id: number;
  createdAt: string;

  status: OrderStatus;
  user: IUser;
  items: ICartItem[];
}