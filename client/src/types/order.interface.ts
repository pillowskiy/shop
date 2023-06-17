import type { CartItem } from './cart.interface';
import type { User } from './user.interface';
import type {Product} from "@/types/product.interface";

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  status: OrderStatus;
  user: User;
  items: CartItem[];
}

export interface CreateOrderData {
  items: CreateOrderItem[];
  shippingId: number;
  paymentId: number;
  promo?: string;
}

export type OrderDetailsValues = Pick<CreateOrderData, 'paymentId' | 'shippingId'>;

export interface CheckoutOrderContext extends CreateOrderData {
  updateDetails: (values: Partial<OrderDetailsValues>) => void;
  setItems: (values: CreateOrderItem[]) => void
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  price: number;
  product: Product;
  quantity: number;
}