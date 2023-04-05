import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'
import { IStat } from '@/types';

export default class StatisticService {
  private static controller = 'statistics';

  static async getUserOrders(userId: number): Promise<AxiosResponse<IStat[]>> {
    return $api.get<IStat[]>(`/${StatisticService.controller}/${userId}`);
  }
}