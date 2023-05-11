import type { AuthResponse } from "@types";
import {getFromLocalStorage} from "@lib/utils";

export default class TokenService {
  static getToken(): string {
    return getFromLocalStorage('token') || '';
  }
  static setToken(data: AuthResponse): void {
    return localStorage.setItem('token', data.accessToken);
  }
  static deleteToken(): void {
    return localStorage.removeItem('token');
  }
}