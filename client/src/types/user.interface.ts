import type { Product } from './product.interface';

export type UserUpdate = Partial<Omit<User, 'id'>> & {
  password?: string
}

export type FullestUser = User & Product[]

export interface User {
  id: number;
  email: string;
  name: string;
  avatarURL: string;
  phone?: string;
}
