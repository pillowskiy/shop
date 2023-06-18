import type { CartItem } from './cart.interface';
import type { User } from './user.interface';
import type {Product} from "@/types/product.interface";
import {Payment} from "@types/payment.interface";
import {Shipping} from "@types/shipping.interface";
import {PromoCode} from "@types/promo-code.interface";

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: number;
  createdAt: string;
  updatedAt: string;

  payment: Payment;
  items: CartItem[];
  shipping: Shipping;
  promoCode: PromoCode;

  status: OrderStatus;
  userId: number;
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