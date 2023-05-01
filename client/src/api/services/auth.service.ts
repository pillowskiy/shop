import type { AuthResponse, LoginBody, RegisterBody } from '@/types';
import type { AxiosResponse } from 'axios';
import { $api } from '../api.interceptor';

export default class AuthService {
  private static controller = 'auth';

  static async login(data: LoginBody): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(`/${AuthService.controller}/login`, data);
  }
  static async logout(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(`/${AuthService.controller}/logout`);
  }
  static async register(data: RegisterBody): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(`/${AuthService.controller}/register`, data);
  }
  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>(`/${AuthService.controller}/refresh`);
  }
}