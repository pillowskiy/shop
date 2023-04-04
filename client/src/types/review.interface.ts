import { IUser } from "./user.interface";

export type ReviewCreateResponse = IReview & { user: IUser };
export type ReviewCreate = Pick<IReview, 'text' | 'rating'>;

export interface IReview {
  id: number;
  user: IUser;
  text: string;
  rating: number;
  createdAt: string;
};