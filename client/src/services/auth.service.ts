import type { IAuthResponse } from '@/types'
import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'

export default class AuthService {
  private static controller = 'auth';

  static async login(
    identifier: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>(`/${AuthService.controller}/login`, { identifier, password });
  }
  static async registration(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>(`/${AuthService.controller}/registration`, { username, email, password });
  }
}