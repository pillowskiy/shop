import { User } from "./user.interface";

export type ReviewCreateResponse = Review & { user: User };
export type ReviewCreate = Pick<Review, 'text' | 'rating'>;

export interface Review {
  id: number;
  user: User;
  text: string;
  rating: number;
  createdAt: string;
};