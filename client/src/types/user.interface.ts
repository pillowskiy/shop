import { IProduct } from "./product.interface";

export type UserUpdate = Partial<Omit<IUser, 'id'>> & {
  password?: string
}

export type FullestUser = IUser & IProduct[]

export interface IUser {
  id: number;
  email: string;
  name: string;
  avatarURL: string;
  phone?: string;
}