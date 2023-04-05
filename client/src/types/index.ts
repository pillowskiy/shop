import type { IUser } from "./user.interface";

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export type ILogin = (Pick<IRegister, 'email'> | Pick<IRegister, 'username'>) & {
  password: string;
}

export interface IStat {
  name: string;
  value: number;
}