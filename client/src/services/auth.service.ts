import type { IAuthResponse, ILogin, IRegister } from '@/types'
import type { AxiosResponse } from 'axios'
import { $api } from '../api/api.interceptor'
import Cookies from 'js-cookie';
import { IUser } from '@/types/user.interface';

export default class AuthService {
  private static controller = 'auth';

  static getAccessToken(): string {
    return Cookies.get('accessToken') || '';
  }
  static removeFromStorage(): void {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('accessToken');
  }
  static saveToStorage(data: IAuthResponse): void {
    Cookies.set('accessToken', data.accessToken);
    Cookies.set('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  static getUserFromStorage(): IUser {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  static async login(data: ILogin): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>(`/${AuthService.controller}/login`, { ...data });
  }
  static async registration(data: IRegister): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>(`/${AuthService.controller}/registration`, { ...data });
  }
  static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>(`/${AuthService.controller}/refresh`);
  }
}