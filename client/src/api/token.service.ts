import { type AuthResponse, TokenTypes } from '@types';
import Cookies from 'js-cookie';

export default class TokenService {
  static getAccessToken(): string {
    return Cookies.get(TokenTypes.ACCESS_TOKEN) || '';
  }
  static removeFromStorage(): void {
    Cookies.remove(TokenTypes.ACCESS_TOKEN);
    // TEMP
    Cookies.remove(TokenTypes.REFRESH_TOKEN);
    localStorage.removeItem('accessToken');
  }
  static saveToStorage(data: AuthResponse): void {
    Cookies.set(TokenTypes.ACCESS_TOKEN, data.accessToken);
    // TEMP
    Cookies.set(TokenTypes.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  static getUserFromStorage(): AuthResponse['user'] {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}