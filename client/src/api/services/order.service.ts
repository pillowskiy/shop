import type { AxiosResponse } from 'axios'
import { $api } from '../api.interceptor'
import type {CreateOrder, Order, OrderItem} from '@/types/order.interface';

export default class OrderService {
  private static controller = 'orders';

  static async getOrders(): Promise<AxiosResponse<Order[]>> {
    return $api.get<Order[]>(`/${OrderService.controller}/`);
  }

  static async createOrder(data: CreateOrder): Promise<AxiosResponse<Order[]>> {
    return $api.post<Order[]>(`/${OrderService.controller}/`, data);
  }

  static async getOrderItems(orderId: number): Promise<AxiosResponse<OrderItem[]>> {
    return $api.get<OrderItem[]>(`/${OrderService.controller}/items/${orderId}`);
  }
}