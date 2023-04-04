import { IUser } from "./user.interface";

export interface IUserState {
  email: string;
  isAdmin: boolean;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}