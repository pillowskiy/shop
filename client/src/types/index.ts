import type { User } from './user.interface';

export enum TokenTypes {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface InitialState {
  user: User | null;
  isLoading: boolean;
}

export interface Auth {
  email: string;
  password: string;
}

export interface AuthResponse extends Tokens {
  user: User;
}

export interface Register {
  username: string;
  email: string;
  password: string;
}

export type Login = (Pick<Register, 'email'> | Pick<Register, 'username'>) & {
  password: string;
}

export interface Stat {
  name: string;
  value: number;
}