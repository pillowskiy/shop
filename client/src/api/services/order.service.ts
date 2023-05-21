import type { AxiosResponse } from 'axios'
import { $api } from '../api.interceptor'
import { Order } from '@/types/order.interface';

export default class OrderService {
  private static controller = 'orders';

  static async getOrders(): Promise<AxiosResponse<Order[]>> {
    return $api.get<Order[]>(`/${OrderService.controller}/`);
  }
}