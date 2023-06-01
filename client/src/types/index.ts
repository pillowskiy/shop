import type { User } from './user.interface';
import type {Product} from "@/types/product.interface";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserInitialState {
  user: User | null;
  isLoading: boolean;
}

export interface CartInitialState {
  items: Product[];
}

export interface AuthResponse extends Tokens {
  user: User;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export type LoginBody = (Pick<RegisterBody, 'password'>) & {
  pseudonym: string;
}

export interface StatisticValue {
  name: string;
  value: string | number;
}

export type ApiValidationReject<T> = {
  errors: {
    [Key in keyof T]: string;
  }
}

export type ApiReject = {
  message: string;
}

export interface Pagination {
  page?: number;
  perPage?: number;
}