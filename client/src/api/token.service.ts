import type { AuthResponse } from '@types';
import Cookies from 'js-cookie';

export default class TokenService {
  static getAccessToken(): string {
    return Cookies.get('accessToken') || '';
  }
  static removeFromStorage(): void {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('accessToken');
  }
  static saveToStorage(data: AuthResponse): void {
    Cookies.set('accessToken', data.accessToken);
    Cookies.set('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  static getUserFromStorage(): AuthResponse['user'] {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}