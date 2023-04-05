import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'
import { IPayment } from '@/types/payment.interface';

export default class PaymentService {
  private static controller = 'orders';

  static async createPayment(amount: number): Promise<AxiosResponse<IPayment>> {
    return $api.post<IPayment>(`/${PaymentService.controller}`, { amount });
  }
}