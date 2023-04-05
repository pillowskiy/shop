import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'
import { IOrder } from '@/types/order.interface';

export default class OrderService {
  private static controller = 'orders';

  static async getUserOrders(userId: number): Promise<AxiosResponse<IOrder[]>> {
    return $api.get<IOrder[]>(`/${OrderService.controller}/${userId}`);
  }
}